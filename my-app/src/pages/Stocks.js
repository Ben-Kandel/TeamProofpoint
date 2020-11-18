import React from "react"
import { Bar } from "react-chartjs-2";

//css
import "./Stocks.css";
import { Chart } from "react-charts";
import Dropdown from "react-bootstrap/Dropdown";

import PricesStockChart from "../components/PricesStockChart";
import { IndivStockEmailsChart, IndivStockPricesChart } from "../components/IndivStockChart";

class Model extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stock1: false,
            stock2: false,
            stock3: false,
            stock4: false,
            stock5: false,
            stock6: false,
            stock7: false,
            stock8: false,
            dowPrices: [],
            nasdaqPrices: [],
            sp500Prices: [],
            aapl: {},
            goog: {},
            amzn: {},
            tsla: {},
            msft: {},
            positiveTotal: 0,
            negativeTotal: 0,
        };

        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }
    async getStockGraphData(leadName){ //We want tables of individual stocks. Do not aggregate any dates.
        const result = await this.fetchData(leadName); //Change this to actual stock table/view name
        let PositiveDateMap = new Map();
        let NegativeDateMap = new Map();
        result.forEach(element =>{
            if (element.P_N === "POSITIVE"){
                if (PositiveDateMap.get(element.date)){
                    PositiveDateMap.set(element.date, PositiveDateMap.get(element.date) + 1); //Increment by one
                }
                else{
                    PositiveDateMap.set(element.date, 1);
                }
            }
            else if (element.P_N ==="NEGATIVE"){
                if (NegativeDateMap.get(element.date)){
                    NegativeDateMap.set(element.date, NegativeDateMap.get(element.date) + 1); //Increment by one
                }
                else{
                    NegativeDateMap.set(element.date,1);
                }
            }
        });
        let DateMap = []; //Return master array of {positive, negative};
        DateMap.push(PositiveDateMap, NegativeDateMap);
        return DateMap;
    }

    async getDataForGraph(){
        const result = await this.fetchData("stocks");
        let dateMap = new Map(); // Map(Stock Symbol, Map(Date, Map(P or N, count)))  add "NASDAQ", "SP" later
        let stockList = ["GOOG", "AMZN", "MSFT", "AAPL", "HD", "DOW"];
        result.forEach(element =>{
            let tempMap = new Map();

            for (let i = 0; i < stockList.length; i ++){
                if (element.subject === stockList[i]){ //Make sure we are adding to the right stock dict.
                    if (dateMap.get(element.subject)) { //If stock exists already.
                        if (dateMap.get(element.subject).get(element.date)) { //If Date exists
                                console.log(dateMap.get(element.subject).get(element.date), "hhhhhhh");
                            if (dateMap.get(element.subject).get(element.date).get(element.P_N)) { //If sentiment record of that date exists.
                                console.log(element.P_N)
                                dateMap.get(element.subject).get(element.date).set(element.P_N,
                                    dateMap.get(element.date).get(element.P_N) + element.volume);
                            } else {

                                dateMap.get(element.subject).get(element.date).set(element.P_N, element.volume);
                            }
                        }
                        else{ //Date does not exist, add a map there.
                            dateMap.get(element.subject).set(element.date, new Map());
                            dateMap.get(element.subject).get(element.date).set(element.P_N, element.volume);
                        }

                    }
                    else{ //if stock does not exist
                       dateMap.set(element.subject, new Map());
                       dateMap.get(element.subject).set(element.date, new Map());
                       dateMap.get(element.subject).get(element.date).set(element.P_N, element.volume);
                    }
                }
            }
        });

        return dateMap;
    }

    async fetchData(leadName="stocks", keywords="", pn=""){
        let url = new URL(`http://127.0.0.1:8000/api/${leadName}/`);
        if(keywords){ //if keywords is not an empty string
            url.searchParams.append("keywords", keywords);
        }
        if(pn){ //if pn is not an empty string
            url.searchParams.append("pn", pn);
        }
        // console.log(url.href);
        const response = await fetch(url.href, this.requestOptions); //wait for the promise to resolve
        const json = await response.json(); //we have to wait when converting this to json
        return json; //return it
    }

    async fetchPriceData(indexName=""){
        let url = new URL(`http://127.0.0.1:8000/api/prices/`);
        if(indexName){
            url.searchParams.append('name', indexName);
        }
        const response = await fetch(url.href, this.requestOptions);
        const json = await response.json();
        return json;
    }
    //-----------------------Matt code (untested)--------------------
    async getStockVolume(name, dateMap){
        let result = [];
        let totalEmails = 0;
        let positiveEmails = 0;
        let negativeEmails = 0;
        console.log(name, 'afsfjaofjaiofjioasfjasdiofjasdiofjo');
        (dateMap.get(name)).forEach(function(values, key2){ //Key2 are dates

            if ((dateMap.get(name)).get(key2).get("NEGATIVE")) {
                let emails = [key2, (dateMap.get(name)).get(key2).get("NEGATIVE")];
                result.push(emails);
                totalEmails += emails[1];
                negativeEmails += emails[1];
            }
            else if ((dateMap.get(name)).get(key2).get("POSITIVE")){
                let emails = [key2, (dateMap.get(name)).get(key2).get("POSITIVE")];
                result.push(emails);
                totalEmails += emails[1];
                positiveEmails += emails[1];
            }
        });
        return [result, totalEmails, negativeEmails, positiveEmails];
    }



    //----------------------------------------------------------------
    async componentDidMount(){

        let DOW = await this.fetchPriceData('DOW');
        let NASDAQ = await this.fetchPriceData('NASDAQ');
        let SP500 = await this.fetchPriceData('S&P500');

        //--------------------------------Matt code (TESTED) -----------------
        //Map(Stock Symbol, Map(Date, Map(P or N, count)))

        let totalEmails = 0;
        let negativeEmails = 0;
        let positiveEmails = 0;

        let dateMap = await this.getDataForGraph();
        let temp = await this.getStockVolume("AAPL", dateMap);
        let appleEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let appleE = [temp[2], temp[3]];
        let applePrices = await this.fetchPriceData("AAPL");
        temp = await this.getStockVolume("AMZN", dateMap);
        let amazonEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let amazonE = [temp[2], temp[3]];
        let amazonPrices = await this.fetchPriceData("AMZN");
        temp = await this.getStockVolume("GOOG", dateMap);
        let googleEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let googleE = [temp[2], temp[3]];
        let googlePrices = await this.fetchPriceData("GOOG");
        temp = await this.getStockVolume("MSFT", dateMap);
        let microsoftEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let microsoftE = [temp[2], temp[3]];
        let microsoftPrices = await this.fetchPriceData("MSFT");
        temp = await this.getStockVolume("HD", dateMap);
        let teslaEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let teslaE = [temp[2], temp[3]];
        let teslaPrices = await this.fetchPriceData("HD");
        temp = await this.getStockVolume("DOW", dateMap);
        let dowEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails +=temp[3];
        // temp = await this.getStockVolume("NASDAQ", dateMap);
        // let nasdaqEmails = temp[0];
        // totalEmails += temp[1];
        // negativeEmails += temp[2];
        // positiveEmails +=temp[3];
        // temp = await this.getStockVolume("SP", dateMap);
        // let spEmails = temp[0];
        // totalEmails += temp[1];
        // negativeEmails += temp[2];
        // positiveEmails +=temp[3];
        //-----------------------------------------------------------------------
        this.setState({
            dowPrices: DOW,
            nasdaqPrices: NASDAQ,
            sp500Prices: SP500,

            aapl : {emailData: appleEmails, priceData: applePrices},
            amzn : {emailData: amazonEmails, priceData: amazonPrices},
            goog : {emailData: googleEmails, priceData: googlePrices},
            msft : {emailData: microsoftEmails, priceData: microsoftPrices},
            tsla : {emailData: teslaEmails, priceData: teslaPrices},
            dow : dowEmails,
            nasdaq : [],
            sp : [],
            emailCount : totalEmails,
            negativeTotal : negativeEmails,
            positiveTotal : positiveEmails,
            aaplStats : appleE,
            amznStats : amazonE,
            msftStats : microsoftE,
            tslaStats : teslaE,
            googStats : googleE,
        });
    }

    render(){
        return(
            <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <title>Results Page</title>
                <script src="welcome.js"></script>
                <script src = "jquery-3.3.1.js"></script>
            </head>
            <body>

                <div id = "header">
                    <h1>Stock Market</h1>
                </div>
                <div class="grid-containerStock">
                    <div class="card1Stocks">
                        <h2>Index Fund Statistics</h2>
                        <PricesStockChart dow={this.state.dowPrices} nasdaq={this.state.nasdaqPrices} sp500={this.state.sp500Prices}/>
                        <hr/>
                    </div>
                    <div class="card2"></div>
                    <div class="card3"></div>
                    <div class="card4Stocks">
                        <h2>Email Statistics</h2>
                        <table>


                            <tr className="line-title">
                                <td>Total Stock Emails: {this.state.emailCount} </td>



                            </tr>
                            <tr className="positive">
                                <td>Positive Stock Emails: {this.state.positiveTotal}</td>

                            </tr>
                            <tr className="negative">
                                <td>Negative Stock Emails: {this.state.negativeTotal}</td>

                            </tr>
                            <tr>
                                <td>Ratio: {(this.state.positiveTotal / this.state.negativeTotal).toFixed(3)}</td>

                            </tr>
                            <div>&nbsp;</div>
                            <tr>
                            {
                                this.state.stock1 ? <div className="stockstats">
                                <tr className="line-title"><td>Total AAPL Emails: {this.state.aaplStats[0] + this.state.aaplStats[1]}</td></tr>
                                <tr className="positive"><td>Positive AAPL Emails: {this.state.aaplStats[1]}</td></tr>
                                <tr className="negative"><td>Negative AAPL Emails: {this.state.aaplStats[0]}</td></tr>
                                    <tr><td>Ratio: {(this.state.aaplStats[1] / this.state.aaplStats[0]).toFixed(3)}</td></tr>
                                </div> : null
                            }
                            </tr>
                            <tr>
                                {
                                    this.state.stock2 ? <div className="stockstats">
                                        <tr className="line-title"><td>Total AMZN Emails: {this.state.amznStats[0] + this.state.amznStats[1]}</td></tr>
                                        <tr className="positive"><td>Positive AMZN Emails: {this.state.amznStats[1]}</td></tr>
                                        <tr className="negative"><td>Negative AMZN Emails: {this.state.amznStats[0]}</td></tr>
                                        <tr><td>Ratio: {(this.state.amznStats[1] / this.state.amznStats[0]).toFixed(3)}</td></tr>
                                    </div> : null
                                }
                            </tr>
                            <tr>
                                {
                                    this.state.stock3 ? <div className="stockstats">
                                        <tr className="line-title"><td>Total GOOG Emails: {this.state.googStats[0] + this.state.googStats[1]}</td></tr>
                                        <tr className="positive"><td>Positive GOOG Emails: {this.state.googStats[1]}</td></tr>
                                        <tr className="negative"><td>Negative GOOG Emails: {this.state.googStats[0]}</td></tr>
                                        <tr><td>Ratio: {(this.state.googStats[1] / this.state.googStats[0]).toFixed(3)}</td></tr>

                                    </div> : null
                                }
                            </tr>
                            <tr>
                                {
                                    this.state.stock4 ? <div className="stockstats">
                                        <tr className="line-title"><td>Total MSFT Emails: {this.state.msftStats[0] + this.state.msftStats[1]}</td></tr>
                                        <tr className="positive"><td>Positive MSFT Emails: {this.state.msftStats[1]}</td></tr>
                                        <tr className="negative"><td>Negative MSFT Emails: {this.state.msftStats[0]}</td></tr>
                                        <tr><td>Ratio: {(this.state.msftStats[1] / this.state.msftStats[0]).toFixed(3)}</td></tr>
                                    </div> : null
                                }
                            </tr>
                            <tr>
                                {
                                    this.state.stock5 ? <div className="stockstats">
                                        <tr className="line-title"><td>Total HD Emails:   {this.state.tslaStats[0] + this.state.tslaStats[1]}</td></tr>
                                        <tr className="positive"><td>Positive HD Emails:   {this.state.tslaStats[1]}</td></tr>
                                        <tr className="negative"><td>Negative HD Emails:   {this.state.tslaStats[0]}</td></tr>
                                        <tr><td>Ratio: {(this.state.tslaStats[1] / this.state.tslaStats[0]).toFixed(3)}</td></tr>
                                    </div> : null
                                }
                            </tr>

                        </table>
                    </div>
                    <div class="card5Stock">
                        <h2>Individual Stocks</h2>
                        <Dropdown class="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Stocks
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: !this.state.stock1, stock2: false, stock3: false,
                                        stock4: false, stock5: false, stock6: false, stock7: false, stock8: false
                                    })
                                }}>{this.state.stock1 ? 'Hide' : 'Show'} &nbsp; AAPL</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: !this.state.stock2, stock3: false,
                                        stock4: false, stock5: false, stock6: false, stock7: false, stock8: false
                                    })
                                }}>{this.state.stock2 ? 'Hide' : 'Show'}&nbsp; AMZN</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: !this.state.stock3,
                                        stock4: false, stock5: false, stock6: false, stock7: false, stock8: false
                                    })
                                }}>{this.state.stock3 ? 'Hide' : 'Show'}&nbsp; GOOG</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: false,
                                        stock4: !this.state.stock4, stock5: false, stock6: false, stock7: false, stock8: false
                                    })
                                }}>{this.state.stock4 ? 'Hide' : 'Show'}&nbsp; MSFT</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: false,
                                        stock4: false, stock5: !this.state.stock5, stock6: false, stock7: false, stock8: false
                                    })
                                }}>{this.state.stock5 ? 'Hide' : 'Show'}&nbsp; HD</Dropdown.Item>

                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: false,
                                        stock4: false, stock5: false, stock6: !this.state.stock6, stock7: false, stock8: false
                                    })
                                }}>{this.state.stock6 ? 'Hide' : 'Show'}&nbsp; DOW</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: false,
                                        stock4: false, stock5: false, stock6: !this.state.stock6, stock7: false, stock8: false
                                    })
                                }}>{this.state.stock7 ? 'Hide' : 'Show'}&nbsp; S&P</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: false,
                                        stock4: false, stock5: !this.state.stock5, stock6: false, stock7: false, stock8: false
                                    })
                                }}>{this.state.stock8 ? 'Hide' : 'Show'}&nbsp; NASDAQ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {
                            this.state.stock1 ? <div className="stock1">
                                <h2>Apple</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.aapl.emailData}/>
                                </div>
                                <div class = "priceData">
                                    <IndivStockPricesChart data={this.state.aapl.priceData}/>
                                </div>
                            </div> : null
                        }
                        {
                            this.state.stock2 ? <div className="stock1">
                                <h2>Amazon</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.amzn.emailData}/>
                                </div>
                                <div class = "priceData">
                                    <IndivStockPricesChart data={this.state.amzn.priceData}/>
                                </div>
                            </div> : null
                        }
                        {
                            this.state.stock3 ? <div className="stock1">
                                <h2>Google</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.goog.emailData}/>
                                </div>
                                <div class = "priceData">
                                    <IndivStockPricesChart data={this.state.goog.priceData}/>
                                </div>
                            </div> : null
                        }
                        {
                            this.state.stock4 ? <div className="stock1">
                                <h2>Microsoft</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.msft.emailData}/>
                                </div>
                                <div class = "priceData">
                                    <IndivStockPricesChart data={this.state.msft.priceData}/>
                                </div>
                            </div> : null
                        }
                        {
                            this.state.stock5 ? <div className="stock1">
                                <h2>Home Depot</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.tsla.emailData}/>
                                </div>
                                <div class = "priceData">
                                    <IndivStockPricesChart data={this.state.tsla.priceData}/>
                                </div>
                            </div> : null
                        }
                        {
                            this.state.stock6 ? <div className="stock1">
                                <h2>DOW</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.dow}/>
                                </div>
                            </div> : null
                        }
                        {
                            this.state.stock7 ? <div className="stock1">
                                <h2>NASDAQ</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.nasdaq}/>
                                </div>
                            </div> : null
                        }
                        {
                            this.state.stock7 ? <div className="stock1">
                                <h2>S&P500</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.sp}/>
                                </div>
                            </div> : null
                        }
                    </div>

                    <div class="card6"></div>
                    <div class="card7"></div>
                    <div className="card8temp">

                    </div>
                    <div class = "card9Stock">



                    </div>


                </div>

            <a className="back" href="/">Back</a>
            </body>

            </html>
        );
    }
}

export default class Stocks extends React.Component{
    render(){
        return(
            <div id="stuff">
                <Model/>
            </div>
        );
    }
}

function SomeChart(props){

    const data = React.useMemo(
        () => [
          {
            label: "Positive Trump Emails",
            data: props.pt,
            color: "red",
          },
          {
            label: "Negative Trump Emails",
            data: props.nt,
            color: "red",
          },
          {
            label: "Positive Biden Emails",
            data: props.pb,
            color: "blue",
          },
          {
            label: "Negative Biden Emails",
            data: props.nb,
            color: "blue",
          },
          {
              label: "fake",
              data: [[new Date(2020, 8, 15), 21]],
              color: "rgba(1,1,1,0)",
          }
        ],
        [props.pt, props.nt]
    );

    const axes = React.useMemo(
    () => [
        { primary: true, type: "time", position: "bottom"},
        { type: "linear", position: "left"}
    ],
    []
    );

    return(
        <div class="be-normal" style={{
            width: "600px",
            height: "400px"
        }}>
            <Chart data={data} axes={axes} tooltip/>
        </div>
    )
}