import React from "react"
import { Bar } from "react-chartjs-2";

//css   
import "./Results.css";
import { Chart } from "react-charts";
import Dropdown from "react-bootstrap/Dropdown";

import PricesStockChart from "../components/PricesStockChart";

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
        let stockList = ["GOOG", "AMZN", "MFST", "AAPL", "TSLA"];
        result.forEach(element =>{
            let tempMap = new Map();
            for (var i = 0; i < stockList.length; i ++){
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
        console.log('printing results:');
        console.log(result);
        console.log('printing date map:');
        console.log(dateMap);
    }

    async fetchData(leadName="stocks", keywords="", pn=""){
        let url = new URL(`http://127.0.0.1:8000/api/${leadName}/`);
        if(keywords){ //if keywords is not an empty string
            url.searchParams.append("keywords", keywords);
        }
        if(pn){ //if pn is not an empty string
            url.searchParams.append("pn", pn);
        }
        console.log(url.href);
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

    async componentDidMount(){
        // this.getDataForGraph();
        let DOW = await this.fetchPriceData('DOW');
        let NASDAQ = await this.fetchPriceData('NASDAQ');
        let SP500 = await this.fetchPriceData('S&P500');

        this.setState({
            dowPrices: DOW,
            nasdaqPrices: NASDAQ,
            sp500Prices: SP500,
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
                <div class="grid-container">
                    <div class="card1">
                        <h2>some box with stuff in it</h2>
                        <PricesStockChart dow={this.state.dowPrices} nasdaq={this.state.nasdaqPrices} sp500={this.state.sp500Prices}/>
                        <hr/>
                    </div>
                    <div class="card2"></div>
                    <div class="card3"></div>
                    <div class="card4">
                        <h2>Some other stats</h2>
                        <table>


                            <tr className="poop">
                                <td>Total Stock Emails</td>

                            </tr>
                            <tr className="positive">
                                <td>Positive Stock Emails</td>

                            </tr>
                            <tr className="negative">
                                <td>Negative Stock Emails</td>

                            </tr>
                            <tr>
                                <td>Ratio:</td>

                            </tr>

                        </table>
                    </div>
                    <div class="card5">

                    </div>

                    <div class="card6"></div>
                    <div class="card7"></div>
                    <div className="card8">
                        <h2>Stonks</h2>
                        <Dropdown class = "dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    this.setState({stock1: !this.state.stock1, stock2 : false, stock3 : false,
                                        stock4 : false, stock5 : false})
                                }}>{this.state.stock1 ? 'Hide' : 'Show'}>stock 1</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({stock1: false, stock2 : !this.state.stock2, stock3 : false,
                                        stock4 : false, stock5 : false})
                                }}>{this.state.stock2 ? 'Hide' : 'Show'}>stock 2</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({stock1: false, stock2 : false, stock3 : !this.state.stock3,
                                        stock4 : false, stock5 : false})
                                }}>{this.state.stock3 ? 'Hide' : 'Show'}>stock 3</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({stock1: false, stock2 : false, stock3 : false,
                                        stock4 : !this.state.stock4, stock5 : false})
                                }}>{this.state.stock4 ? 'Hide' : 'Show'}>stock 4</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.setState({stock1: false, stock2 : false, stock3 : false,
                                        stock4 : false, stock5 : !this.state.stock5})
                                }}>{this.state.stock5 ? 'Hide' : 'Show'}>stock 5</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {
                            this.state.stock1 ? <div class="stock1">
                                <h2>Stock1</h2>
                            </div> : null
                        }
                        {
                            this.state.stock2 ? <div class="stock1">
                                <h2>Stock2</h2>
                            </div> : null
                        }
                        {
                            this.state.stock3 ? <div class="stock1">
                                <h2>Stock3</h2>
                            </div> : null
                        }
                        {
                            this.state.stock4 ? <div class="stock1">
                                <h2>Stock4</h2>
                            </div> : null
                        }
                        {
                            this.state.stock5 ? <div class="stock1">
                                <h2>Stock5</h2>
                            </div> : null
                        }
                    </div>
                    <a className="back" href="/">Back</a>
                    <a className="usecase"> Consumer Sentiment (doesn't work) </a>
                </div>
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