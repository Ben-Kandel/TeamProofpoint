import React from "react"
import { Bar } from "react-chartjs-2";

//css   
import "./Results.css";
import { Chart } from "react-charts";

class Model extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };

        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
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

    async componentDidMount(){
        // const stockData = (await this.fetchData("stocks", "SOMETHING", "THIS_WONT_WORK")).length;
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
                        <hr/>                        
                    </div>
                    <div class="card2"></div>
                    <div class="card3"></div>
                    <div class="card4">
                        <h2>Some other stats</h2>
                    </div>
                    <div class="card5">

                    </div>
                    <div class="card6"></div>
                    <div class="card7"></div>
                    <div className="card8">
                        <h2>Statistics</h2>
                    </div>
                    <a className="system" href="/">Back</a>
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