import React from "react"
import { Bar } from "react-chartjs-2";

//css
import "./Results.css";

class Model extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            trumpEmails: 0,
            bidenEmails: 0,
            posTrumpEmails: 0,
            negTrumpEmails: 0,
            posBidenEmails: 0,
            negBidenEmails: 0
        };

        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    getTrumpEmails(){
        fetch("http://127.0.0.1:8000/api/leads/?keywords=Trump", this.requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    trumpEmails: result.length
                })
            })
            .catch(error => console.log('error', error));
    }

    getBidenEmails(){
        fetch("http://127.0.0.1:8000/api/leads/?keywords=Biden", this.requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    bidenEmails: result.length
                })
            })
            .catch(error => console.log('error', error));
    }

    getPosTrumpEmails(){
        fetch("http://127.0.0.1:8000/api/leads/?keywords=Trump&pn=Positive", this.requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    posTrumpEmails: result.length
                })
            })
            .catch(error => console.log('error', error));
    }

    getNegTrumpEmails(){
        fetch("http://127.0.0.1:8000/api/leads/?keywords=Trump&pn=Negative", this.requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    negTrumpEmails: result.length
                })
            })
            .catch(error => console.log('error', error));
    }

    getPosBidenEmails(){
        fetch("http://127.0.0.1:8000/api/leads/?keywords=Biden&pn=Positive", this.requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    posBidenEmails: result.length
                })
            })
            .catch(error => console.log('error', error));
    }

    getNegBidenEmails(){
        fetch("http://127.0.0.1:8000/api/leads/?keywords=Biden&pn=Negative", this.requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    negBidenEmails: result.length
                })
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount(){
        this.getTrumpEmails();
        this.getBidenEmails();
        this.getPosTrumpEmails();
        this.getNegTrumpEmails();
        this.getPosBidenEmails();
        this.getNegBidenEmails();
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
            <h2>Our Model</h2>
        <hr/>
        </div>
        <div class="card2"></div>
            <div class="card3"></div>
            <div class="card4">
            <h2>Statistics</h2>
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
        </table>
        </div>
        <div class="card5">
            <h2>Common Words</h2>
        <hr/>
        </div>
        <div class="card6"></div>
            <div class="card7"></div>
            <div class="card8"></div>
            <a className= "usecase" href="/Results2">Case 3</a>
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

function TheChart(props) {

    const data = {
        labels: ["Positive", "Negative"],
        datasets: [
            {
                label: "Trump Sentiments",
                backgroundColor: ["green", "red"],
                borderColor: 'rgba(1,1,1,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [props.posTrump, props.negTrump],
            }
        ]
    };

    const options = {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                },
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    };

    return(
        <Bar data={data} options={options} width={500} height={200}></Bar>
)
}
