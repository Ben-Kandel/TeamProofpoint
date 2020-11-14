import React from "react"
import { Bar } from "react-chartjs-2";

//css   
import "./Results.css";
import MyChart from "../components/MyChart";
import { Chart } from "react-charts";
import { variance, std } from 'mathjs'

import ElectionChart from "../components/ElectionChart";


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
            positiveTrumpDates: [],
            show:false,
            flip:false,
            showDates:false
        };

        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    async fetchData(leadName="leads", subject="", P_N=""){
        let url = new URL(`http://127.0.0.1:8000/api/${leadName}/`);
        if(subject){ //if keywords is not an empty string
            url.searchParams.append("subject", subject);
        }
        if(P_N){ //if pn is not an empty string
            url.searchParams.append("P_N", P_N);
        }
        console.log(url.href);
        const response = await fetch(url.href, this.requestOptions); //wait for the promise to resolve
        const json = await response.json(); //we have to wait when converting this to json
        return json; //return it
    }
    async getPrediction() {
        const result = await this.fetchData("predictions");
        let predictions = [];
        result.forEach(element =>{
           if (element.subject === "Election"){
               predictions.push([element.keyword, element.prediction]);
           }

        })

        return predictions;

    }

    async getDataForGraph(){
        const result = await this.fetchData("leads");
        let dateMap = new Map();
        result.forEach(element => {
            let tempMap = new Map();
            if (element.subject === "Biden"){
                if (element.P_N === "POSITIVE"){
                    if (dateMap.get("BP")){

                        if (dateMap.get("BP").get(element.date)){ //Biden Positive, checking if date exists
                            dateMap.get("BP").set(element.date, ( dateMap.get("BP").get(element.date) + element.volume) ); //increment
                        }
                        else{ //Biden Positive, if the date does not exist in the nested dictionary
                            dateMap.get("BP").set(element.date, element.volume);
                        }

                    }
                    else{
                        dateMap.set("BP", tempMap); //This means we are adding the first positive biden entry
                        dateMap.get("BP").set(element.date, element.volume); //initialize one at the date
                    }

                }
                
                else if (element.P_N === "NEGATIVE"){
                    if (dateMap.get("BN")){ //if Biden negative exists in the dictionary
                        if (dateMap.get("BN").get(element.date)){ //Biden Negative, check if date exists
                            dateMap.get("BN").set(element.date, (dateMap.get("BN").get(element.date) + element.volume) ); //increment
                        }
                        else{ //if Biden negative, if the date does not exist in nested dictionary
                            dateMap.get("BN").set(element.date, element.volume);
                        }
                    }
                    else{
                        dateMap.set("BN", tempMap); //add a empty dictionary as key, first negative biden entry
                        dateMap.get("BN").set(element.date, element.volume); //initialize one at date
                    }

                }
            }
            else if (element.subject === "Trump"){
                if (element.P_N === "POSITIVE"){
                    if (dateMap.get("TP")){ //If Trump positive exists in the dictionary
                        if (dateMap.get("TP").get(element.date)){ //Trump Positive, check if date exists
                            dateMap.get("TP").set(element.date, (dateMap.get("TP").get(element.date) + element.volume) ); //increment
                        }
                        else{ //If Trump positive, if date does not exist in the nested dictionary
                            dateMap.get("TP").set(element.date, element.volume);
                        }
                    }
                    else{
                        dateMap.set("TP", tempMap); //Add a empty dictionary as key, first positive trump entry
                        dateMap.get("TP").set(element.date, element.volume); //initialize one at date
                    }

                }
                
                else if (element.P_N === "NEGATIVE"){
                    if (dateMap.get("TN")){ //If Trump negative exists in the dictionary
                        if (dateMap.get("TN").get(element.date)){ //Trump Negative, check if date exists
                            dateMap.get("TN").set(element.date, (dateMap.get("TN").get(element.date) + element.volume) ); //increment
                        }
                        else { //If Trump negative, if date does not exist in nested dictionary
                            dateMap.get("TN").set(element.date, element.volume);
                        }
                    }
                    else{
                        dateMap.set("TN", tempMap); //Add a empty dictionary as key, first negative trump entry
                        dateMap.get("TN").set(element.date, element.volume); //initialize one at date
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
                    // date = date.split(' ').slice(0,4).join(' ');
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
        // const trumpPositive = (await this.fetchData("leads", "Trump", "POSITIVE")).length;
        // const trumpNegative = (await this.fetchData("leads", "Trump", "NEGATIVE")).length;
        // const bidenPositive = (await this.fetchData("leads", "Biden", "POSITIVE")).length;
        // const bidenNegative = (await this.fetchData("leads", "Biden", "NEGATIVE")).length;
        let predArr = await this.getPrediction();
        let trumpPred = 0;
        let bidenPred = 0;
        for (let i = 0; i < (predArr.length); i ++){
            if (predArr[0] === "Trump"){
                trumpPred = predArr[1];

            }
            else if (predArr[0] === "Biden"){
                bidenPred = predArr[1];
            }
        }
        let trumpPositive = await this.fetchData("leads", "Trump", "POSITIVE");
        let trumpNegative = await this.fetchData("leads", "Trump", "NEGATIVE");
        let bidenPositive = await this.fetchData("leads", "Biden", "POSITIVE");
        let bidenNegative = await this.fetchData("leads", "Biden", "NEGATIVE");

        let allEmails = []

        let trumpMostNegative = 0;
        let bidenMostNegative = 0;
        let trumpMostPositive = 0;
        let bidenMostPositive = 0;
        let trumpMostNegativeDate = new Date();
        let bidenMostNegativeDate = new Date();
        let trumpMostPositiveDate = new Date();
        let bidenMostPositiveDate = new Date();

        let trumpPositiveTotal = 0;
        trumpPositive.forEach((row) => {
            trumpPositiveTotal = trumpPositiveTotal + row.volume
            if (row.volume > 5) {
                allEmails.push(row.volume)
            }
            if (row.volume > trumpMostPositive){
                trumpMostPositive = row.volume
                trumpMostPositiveDate = row.date

            }
        })

        let trumpNegativeTotal = 0;
        trumpNegative.forEach((row) => {
            trumpNegativeTotal = trumpNegativeTotal + row.volume
            if (row.volume > 5) {
                allEmails.push(row.volume)
            }
            if (row.volume > trumpMostNegative){
                trumpMostNegative = row.volume
                trumpMostNegativeDate = row.date
            }
        })

        let bidenPositiveTotal = 0;
        bidenPositive.forEach((row) => {
            bidenPositiveTotal = bidenPositiveTotal + row.volume
            if (row.volume > 5) {
                allEmails.push(row.volume)
            }
            if (row.volume > bidenMostPositive){
                bidenMostPositive = row.volume
                bidenMostPositiveDate = row.date
            }
        })

        let bidenNegativeTotal = 0;
        bidenNegative.forEach((row) => {
            bidenNegativeTotal = bidenNegativeTotal + row.volume
            if (row.volume > 5) {
                allEmails.push(row.volume)
            }
            if (row.volume > bidenMostNegative){
                bidenMostNegative = row.volume
                bidenMostNegativeDate = row.date
            }
        })

        //this.getDataForGraph() returns a list [] with 4 values
        const [ posBidenDates, negBidenDates, posTrumpDates, negTrumpDates ] = await this.getDataForGraph();

        this.setState({
            trumpEmails: trumpPositiveTotal + trumpNegativeTotal,
            bidenEmails: bidenPositiveTotal + bidenNegativeTotal,
            posTrumpEmails: trumpPositiveTotal,
            negTrumpEmails: trumpNegativeTotal,
            posBidenEmails: bidenPositiveTotal,
            negBidenEmails: bidenNegativeTotal,
            negativeBidenDates: negBidenDates,
            positiveBidenDates: posBidenDates,
            negativeTrumpDates: negTrumpDates,
            positiveTrumpDates: posTrumpDates,
            trumpMostNegative: trumpMostNegative,
            bidenMostNegative: bidenMostNegative,
            trumpMostPositive: trumpMostPositive,
            bidenMostPositive: bidenMostPositive,
            trumpMostNegativeDate: trumpMostNegativeDate,
            bidenMostNegativeDate: bidenMostNegativeDate,
            trumpMostPositiveDate: trumpMostPositiveDate,
            bidenMostPositiveDate: bidenMostPositiveDate,
            emailStd: (std(allEmails)).toFixed(),
            tPrediction : trumpPred,
            bPrediction : bidenPred,
        });
    }



    render(){
        return(
            <html >
            <body>
            <div>
                <div id = "header">
                    <h1>United States Presidential Election, 2020</h1>
                </div>
                <div class="grid-container">
                    <div class="card1">
                        <h2>Emails Collected Each Day</h2>
                        <hr/>
                        {/* <SomeChart class ="chart" pt={this.state.positiveTrumpDates} nt={this.state.negativeTrumpDates} pb={this.state.positiveBidenDates} nb={this.state.negativeBidenDates}/> */}
                        <ElectionChart pt={this.state.positiveTrumpDates} nt={this.state.negativeTrumpDates} pb={this.state.positiveBidenDates} nb={this.state.negativeBidenDates}></ElectionChart>
                    </div>
                    <div class="card2"></div>
                    <div class="card3"></div>
                    <div class="card4">
                        <h2>Email Totals</h2>
                        <hr/>
                        <table>
                            <tr class="total-title">
                                <td>Total Emails</td>
                                <td>{this.state.bidenEmails + this.state.trumpEmails}</td>
                            </tr>
                            
                            <tr class="line-title">
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
                            <tr class="line-title">
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
                             {
                                 this.state.show ? <div class="sub5">
                                    <h2>Our Prediction</h2>


                                     <div class="bidenprediction">
                                         <div class="biden">Biden: {this.state.bPrediction}%</div>
                                         {//document.getElementById(".biden").style.width = this.state.bPrediction}
                                         }
                                         <div class = "trump">Trump: {this.state.tPrediction}%</div>
                                         {//document.getElementById(".trump").style.width = this.state.tPrediction}
                                         }
                                     </div>
                                 </div> : null

                             }

                        </div>

                    <button className="hideB" onClick={() => {
                        this.setState({show: !this.state.show})
                    }}>{this.state.show ? 'Hide' : 'Show'} Prediction
                    </button>
                    <button className="hideC" onClick={() => {
                        this.setState({showDates: !this.state.showDates})
                    }}>{this.state.showDates ? 'Hide' : 'Show'} Important Dates
                    </button>
                    <div class="card6"></div>
                    <div class="card7">

                    </div>



                    <div class="card8">
                        <table >
                            <tr>
                        <td><h2>Statistics: </h2></td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td><h2 id="stat-title" style={{color: "blue"}}>Biden</h2></td>
                                </tr>
                        </table>
                        <div className='be-normal'> <button id = "statSwap" onClick={() => toggle(this.state)}>
                            {'Switch Candidate'}
                        </button>
                                   </div>

                        <hr/>
                        <table>
                            <tr className="sb">
                                <td># Emails with URLS: </td>
                                <td>&nbsp;</td>
                                <td>0</td>
                            </tr>
                            <tr className="sb">
                                <td># Emails with Attachments:</td>
                                <td>&nbsp;</td>
                                <td>0</td>
                            </tr>
                            <tr className="sb">
                                <td># Emails with Promotions: </td>
                                <td>&nbsp;</td>
                                <td>0</td>
                            </tr>
                            <tr className="sb-toggle">

                                <td id="positiveDay">Most Positive Emails:</td>
                                <td>&nbsp;</td>
                                <td id ="positiveCount"> {this.state.bidenMostPositive} </td>
                            </tr>
                            <tr className="sb-toggle">

                                <td id="positiveDayDate">Date of Most Positive Emails:</td>
                                <td>&nbsp;</td>
                                <td id ="positiveCountDate"> {this.state.bidenMostPositiveDate} </td>
                            </tr>
                            <tr className="sb-toggle">

                                <td id="negativeDay">Most Negative Emails:</td>
                                <td>&nbsp;</td>
                                <td id ="negativeCount"> {this.state.bidenMostNegative} </td>
                            </tr>
                            <tr className="sb-toggle">

                                <td id="negativeDayDate">Date of Most Negative Emails:</td>
                                <td>&nbsp;</td>
                                <td id ="negativeCountDate"> {this.state.bidenMostNegativeDate} </td>
                            </tr>
                            <tr className="sb">

                                <td id="avgSentiment">Total Email Deviation per Day:</td>
                                <td>&nbsp;</td>
                                <td id ="avgSentimentNum"> {(this.state.emailStd)} </td>
                            </tr>
                        </table>
                    </div>





                </div>
                {/*important dates */}
                <div className="card9">
                    {
                        this.state.showDates ? <div className="sub9">
                            <h2>Important Dates</h2>
                            <div class = "card9Table">
                            <tr>
                                <td id="bolded">2020-10-01</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>President Donald Trump and First Lady Melania Trump Test Positive for COVID-19</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-10-05</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>President Trump is discharged Walter Reed Hospital</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-10-07</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>Vice Presidential Debate is held in Salt Lake City, Utah</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-10-08</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>FBI arrest 13 armed militia members who plotted to kidnap Michigan Governor Gretchen Whitmer</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-10-12</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>Senate Judiciary Committee hearings on Supreme Court nominee Amy Coney Barrett begin</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-10-15</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>Biden and Trump participate in separate town halls</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-10-22</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>Final Presidential Debate is held in Nashville, Tennessee</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-10-26</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>Senate confirms Amy Coney Barrett to the Supreme Court</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-10-30</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>A Biden campaign bus is swarmed by a caravan of Texas Trump supporters causing the eventual cancellation of a Biden campaign event, no one was harmed </td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-11-03</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>2020 U.S. Election Begins</td>
                            </tr>
                            <tr>
                                <td id="bolded">2020-11-07</td>
                                <td>&nbsp;</td>
                                <td>|</td>
                                <td>&nbsp;</td>
                                <td>Most major networks call the election for President-elect Joe Biden</td>
                            </tr>
                            </div>
                        </div> : null

                    }

                </div>

            </div>
            <a className="back" href="/">Back</a>
            </body>

            </html>

        );
    }
}

// stats page for candidate specific stats
var statBiden = true;
function toggle(test) {
        statBiden = !statBiden

        console.log("swapping stats")

        window.onclick = function(){
            let statTitle = document.getElementById("stat-title")

            let negativeDay = document.getElementById("negativeDay")
            let negativeCount = document.getElementById("negativeCount")

            let positiveDay = document.getElementById("positiveDay")
            let positiveCount = document.getElementById("positiveCount")

            let negativeDayDate = document.getElementById("negativeDayDate")
            let negativeCountDate = document.getElementById("negativeCountDate")

            let positiveDayDate = document.getElementById("positiveDayDate")
            let positiveCountDate = document.getElementById("positiveCountDate")


            if (statBiden) {
                statTitle.innerHTML = "Biden"
                negativeCount.innerHTML = test.bidenMostNegative
                positiveCount.innerHTML = test.bidenMostPositive
                negativeCountDate.innerHTML = test.bidenMostNegativeDate
                positiveCountDate.innerHTML = test.bidenMostPositiveDate

                statTitle.style.color = 'blue'
                negativeDay.style.color = 'blue'
                negativeCount.style.color = 'blue'
                positiveDay.style.color = 'blue'
                positiveCount.style.color = 'blue'
                negativeDayDate.style.color = 'blue'
                negativeCountDate.style.color = 'blue'
                positiveDayDate.style.color = 'blue'
                positiveCountDate.style.color = 'blue'
            } else {
                statTitle.innerHTML = "Trump"
                negativeCount.innerHTML = test.trumpMostNegative
                positiveCount.innerHTML = test.trumpMostPositive
                negativeCountDate.innerHTML = test.trumpMostNegativeDate
                positiveCountDate.innerHTML = test.trumpMostPositiveDate

                statTitle.style.color = 'red'
                negativeDay.style.color = 'red'
                negativeCount.style.color = 'red'
                positiveDay.style.color = 'red'
                positiveCount.style.color = 'red'
                negativeDayDate.style.color = 'red'
                negativeCountDate.style.color = 'red'
                positiveDayDate.style.color = 'red'
                positiveCountDate.style.color = 'red'
            }

        }
    }



export default class Election extends React.Component{
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
              data: [[new Date(2020, 9, 11), 21]],
              color: "rgba(1,1,1,0)",
          }
        ],
        [props.pt, props.nt]
    );

    const axes = React.useMemo(
    () => [
        { primary: true, type: "time", position: "bottom", min : new Date(2020, 9, 11)},
        { type: "linear", position: "left", min: Math.min(props.nt)}
    ],
    []
    );

    return(
        <div
        style={{
            // display: 'flex',
            // flexDirection: 'column',
            // padding: '12px',

            margin: "auto",
            height: '80%',
            width: '45%',
            flex: 10,
            // border: '5px solid blue',
            maxHeight: '400px',
            // margin: '10px'

        }}
      >

            <Chart data={data} axes={axes} tooltip/>
        </div>
    )
}