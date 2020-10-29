import React from "react"
import { Bar } from "react-chartjs-2";

//css   
import "./Results.css";
import MyChart from "../components/MyChart";
import { Chart } from "react-charts";
import ResizableBox from "../components/ResizableBox";

class Model extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            trumpEmails: 0,
            bidenEmails: 0,
            posTrumpEmails: 0,
            negTrumpEmails: 0,
            posBidenEmails: 0,
            negBidenEmails: 0,
            negativeBidenDates: [],
            positiveBidenDates: [],
            negativeTrumpDates: [],
            positiveTrumpDates: []
        };

        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    async fetchData(leadName="consumers", keywords="", pn=""){
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

    async getDataForGraph(){
        const result = await this.fetchData("consumers");
        let dateMap = new Map();
        result.forEach(element => {
            let tempMap = new Map();
            if (element.keywords === "Biden"){
                if (element.pn === "Positive"){
                    if (dateMap.get("BP")){

                        if (dateMap.get("BP").get(element.date)){ //Biden Positive, checking if date exists
                            dateMap.get("BP").set(element.date, dateMap.get("BP").get(element.date) + 1); //increment
                        }
                        else{ //Biden Positive, if the date does not exist in the nested dictionary
                            dateMap.get("BP").set(element.date, 1);
                        }

                    }
                    else{
                        dateMap.set("BP", tempMap); //This means we are adding the first positive biden entry
                        dateMap.get("BP").set(element.date, 1); //initialize one at the date
                    }

                }
                
                else if (element.pn === "Negative"){
                    if (dateMap.get("BN")){ //if Biden negative exists in the dictionary
                        if (dateMap.get("BN").get(element.date)){ //Biden Negative, check if date exists
                            dateMap.get("BN").set(element.date, dateMap.get("BN").get(element.date) + 1); //increment
                        }
                        else{ //if Biden negative, if the date does not exist in nested dictionary
                            dateMap.get("BN").set(element.date, 1);
                        }
                    }
                    else{
                        dateMap.set("BN", tempMap); //add a empty dictionary as key, first negative biden entry
                        dateMap.get("BN").set(element.date, 1); //initialize one at date
                    }

                }
            }
            else if (element.keywords === "Trump"){
                if (element.pn === "Positive"){
                    if (dateMap.get("TP")){ //If Trump positive exists in the dictionary
                        if (dateMap.get("TP").get(element.date)){ //Trump Positive, check if date exists
                            dateMap.get("TP").set(element.date, dateMap.get("TP").get(element.date) + 1); //increment
                        }
                        else{ //If Trump positive, if date does not exist in the nested dictionary
                            dateMap.get("TP").set(element.date, 1);
                        }
                    }
                    else{
                        dateMap.set("TP", tempMap); //Add a empty dictionary as key, first positive trump entry
                        dateMap.get("TP").set(element.date, 1); //initialize one at date
                    }

                }
                
                else if (element.pn === "Negative"){
                    if (dateMap.get("TN")){ //If Trump negative exists in the dictionary
                        if (dateMap.get("TN").get(element.date)){ //Trump Negative, check if date exists
                            dateMap.get("TN").set(element.date, dateMap.get("TN").get(element.date) + 1); //increment
                        }
                        else { //If Trump negative, if date does not exist in nested dictionary
                            dateMap.get("TN").set(element.date, 1);
                        }
                    }
                    else{
                        dateMap.set("TN", tempMap); //Add a empty dictionary as key, first negative trump entry
                        dateMap.get("TN").set(element.date, 1); //initialize one at date
                    }
                }
            }
        });
        let bidenP = [];
        let bidenN = [];
        let trumpP = [];
        let trumpN = [];
        dateMap.forEach((value, key) => {
            value.forEach((incremented, dates) =>{
                if (key === "BP"){
                    let date = new Date(dates);
                    bidenP.push([date, incremented]);
                }
                else if (key === "BN"){
                    let date = new Date(dates);
                    bidenN.push([date, -1 * incremented]);
                }
                else if (key === "TP"){
                    let date = new Date(dates);
                    trumpP.push([date, incremented]);
                }
                else if (key === "TN"){
                    console.log("hello");
                    let date = new Date(dates);
                    trumpN.push([date, -1 * incremented]);
                }
            })
        })

        //making sure the dates are in the right order for the graph
        bidenP = bidenP.sort((a, b) => a[0] - b[0]);
        bidenN = bidenN.sort((a, b) => a[0] - b[0]);
        trumpP = trumpP.sort((a, b) => a[0] - b[0]);
        trumpN = trumpN.sort((a, b) => a[0] - b[0]);
        return [bidenP, bidenN, trumpP, trumpN] //just put them all in a list and return  
    }

    async componentDidMount(){
        //remember that fetchData returns the actual json, we can call .length on it to get how many results there were
        //we have to wrap some extra () around it to call .length
        const trumpPositive = (await this.fetchData("consumers", "Trump", "Positive")).length;
        const trumpNegative = (await this.fetchData("consumers", "Trump", "Negative")).length;
        const bidenPositive = (await this.fetchData("consumers", "Biden", "Positive")).length;
        const bidenNegative = (await this.fetchData("consumers", "Biden", "Negative")).length;
        //this.getDataForGraph() returns a list [] with 4 values
        const [ negBidenDates, posBidenDates, negTrumpDates, posTrumpDates ] = await this.getDataForGraph();
        this.setState({
            trumpEmails: trumpPositive + trumpNegative,
            bidenEmails: bidenPositive + bidenNegative,
            posTrumpEmails: trumpPositive,
            negTrumpEmails: trumpNegative,
            posBidenEmails: bidenPositive,
            negBidenEmails: bidenNegative,
            negativeBidenDates: negBidenDates,
            positiveBidenDates: posBidenDates,
            negativeTrumpDates: negTrumpDates,
            positiveTrumpDates: posTrumpDates,
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
                    <h1>United States Presidential Election, 2020</h1>
                </div>
                <div class="grid-container">
                    <div class="card1">
                        <h2>Emails Collected Each Day</h2>
                        <hr/>
                        <SomeChart class ="chart" pt={this.state.positiveTrumpDates} nt={this.state.negativeTrumpDates} pb={this.state.positiveBidenDates} nb={this.state.negativeBidenDates}/>
                    </div>
                    <div class="card2"></div>
                    <div class="card3"></div>
                    <div class="card4">
                        <h2>Email Totals</h2>
                        <hr/>
                        <table>
                            <tr class="pp">
                                <td>Total Emails</td>
                                <td>{this.state.bidenEmails + this.state.trumpEmails}</td>
                            </tr>
                            
                            <tr class="poop">
                                <td>Trump Emails</td>
                                <td>{this.state.trumpEmails}</td>
                            </tr>
                            <tr class="positive">
                                <td>Positive Trump Emails</td>
                                <td>{this.state.posTrumpEmails}</td>
                            </tr>
                            <tr class="negative">
                                <td>Negative Trump Emails</td>
                                <td>{this.state.negTrumpEmails}</td>
                            </tr>
                            <tr>
                                <td>Ratio:</td>
                                <td>{(this.state.posTrumpEmails / this.state.negTrumpEmails).toFixed(3)}</td>
                            </tr>
                            <tr class="poop">
                                <td>Biden Emails</td>
                                <td>{this.state.bidenEmails}</td>
                            </tr>
                            <tr class="positive">
                                <td>Positive Biden Emails</td>
                                <td>{this.state.posBidenEmails}</td>
                            </tr>
                            <tr class="negative">
                                <td>Negative Biden Emails</td>
                                <td>{this.state.negBidenEmails}</td>
                            </tr>
                            <tr>
                                <td>Ratio:</td>
                                <td>{(this.state.posBidenEmails / this.state.negBidenEmails).toFixed(3)}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card5">

                    </div>
                    <div class="card6"></div>
                    <div class="card7"></div>
                    <div className="card8">
                        <h2>Statistics</h2>
                        <hr/>
                        <table>
                            <tr className="pp">
                                <td># Emails with URLS:</td>
                                <td>0</td>
                            </tr>
                            <tr className="pp">
                                <td># Emails with Attachments: &nbsp; </td>
                                <td>0</td>
                            </tr>
                            <tr className="pp">
                                <td># Emails with Promotions:</td>
                                <td>0</td>
                            </tr>
                        </table>
                    </div>

                    <a className="system" href="/">Back</a>
                </div>


            </body>
            </html>
        );
    }
}

export default class Results extends React.Component{
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
              data: [[new Date(2020, 9, 1), -1]],
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