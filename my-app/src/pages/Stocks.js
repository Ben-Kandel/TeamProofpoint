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
            dowPrices: [],
            nasdaqPrices: [],
            sp500Prices: [],
            aapl: [],
            goog: [],
            amzn: [],
            tsla: [],
            msft: [],

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
        let dateMap = new Map(); // Map(Stock Symbol, Map(Date, Map(P or N, count)))
        let stockList = ["GOOG", "AMZN", "MSFT", "AAPL", "TSLA"];
        result.forEach(element =>{
            let tempMap = new Map();

            for (let i = 0; i < stockList.length; i ++){
                if (element.subject === stockList[i]){ //Make sure we are adding to the right stock dict.
                    if (dateMap.get(element.subject)) { //If stock exists already.
                        if (dateMap.get(element.subject).get(element.date)) { //If Date exists
                            if (dateMap.get(element.subject.get(element.date.get(element.P_N)))) { //If sentiment record of that date exists.
                                dateMap.get(element.subject.get(element.date.set(element.P_N,
                                    dateMap.get(element.date.get(element.P_N) + element.volume))));
                            } else {
                                dateMap.get(element.subject.get(element.date.set(element.P_N, element.volume)));
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

        //--------------------------------Matt code (untested) -----------------
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
        let applePrices = await this.fetchPriceData("AAPL");
        temp = await this.getStockVolume("AMZN", dateMap);
        let amazonEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let amazonPrices = await this.fetchPriceData("AMZN");
        temp = await this.getStockVolume("GOOG", dateMap);
        let googleEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let googlePrices = await this.fetchPriceData("GOOG");
        temp = await this.getStockVolume("MSFT", dateMap);
        let microsoftEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let microsoftPrices = await this.fetchPriceData("MSFT");
        temp = await this.getStockVolume("TSLA", dateMap);
        let teslaEmails = temp[0];
        totalEmails += temp[1];
        negativeEmails += temp[2];
        positiveEmails += temp[3];
        let teslaPrices = await this.fetchPriceData("TSLA");
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
            emailCount : totalEmails,
            negativeTotal : negativeEmails,
            positiveTotal : positiveEmails,
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
                        <h2>some box with stuff in it</h2>
                        <PricesStockChart dow={this.state.dowPrices} nasdaq={this.state.nasdaqPrices} sp500={this.state.sp500Prices}/>
                        <hr/>
                    </div>
                    <div class="card2"></div>
                    <div class="card3"></div>
                    <div class="card4Stocks">
                        <h2>Some other stats</h2>
                        <table>


                            <tr className="poop">
                                <td>Total Stock Emails: {this.state.emailCount} </td>



                            </tr>
                            <tr className="positive">
                                <td>Positive Stock Emails : {this.state.negativeEmails}</td>

                            </tr>
                            <tr className="negative">
                                <td>Negative Stock Emails : {this.state.positiveEmails }</td>

                            </tr>
                            <tr>
                                <td>Ratio: {this.state.positiveEmails}/{this.state.negativeEmails}</td>

                            </tr>

                        </table>
                    </div>
                    <div class="card5Stock">
                        <h2>Stonks</h2>
                        <Dropdown class="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Stocks
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: !this.state.stock1, stock2: false, stock3: false,
                                        stock4: false, stock5: false
                                    })
                                }}>{this.state.stock1 ? 'Hide' : 'Show'} &nbsp; AAPL</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: !this.state.stock2, stock3: false,
                                        stock4: false, stock5: false
                                    })
                                }}>{this.state.stock2 ? 'Hide' : 'Show'}&nbsp; AMZN</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: !this.state.stock3,
                                        stock4: false, stock5: false
                                    })
                                }}>{this.state.stock3 ? 'Hide' : 'Show'}&nbsp; GOOG</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: false,
                                        stock4: !this.state.stock4, stock5: false
                                    })
                                }}>{this.state.stock4 ? 'Hide' : 'Show'}&nbsp; MSFT</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({
                                        stock1: false, stock2: false, stock3: false,
                                        stock4: false, stock5: !this.state.stock5
                                    })
                                }}>{this.state.stock5 ? 'Hide' : 'Show'}&nbsp; TSLA</Dropdown.Item>
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
                                <h2>Tesla</h2>
                                <div class = "volumeData">
                                    <IndivStockEmailsChart data={this.state.tsla.emailData}/>
                                </div>
                                <div class = "priceData">
                                    <IndivStockPricesChart data={this.state.tsla.priceData}/>
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