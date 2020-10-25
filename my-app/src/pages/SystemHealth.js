import React from "react";
import MyChart from "../components/MyChart";

//css
import "./SystemHealth.css";

class SystemHealth extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            electionEmails: 0,
            dates: [],
            stockEmails: 0,
        };

        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    getElectionEmailsProcessed(){
        fetch("http://127.0.0.1:8000/api/leads/?subject=Election", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                electionEmails: result.length
            })
        })
        .catch(error => console.log('error', error));
    }
    getStockEmailsProcessed(){
        fetch("http://127.0.0.1:8000/api/stocks/", this.requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    stockEmails: result.length
                })
            })
            .catch(error => console.log('error', error));
    }

    getChartData(){
        fetch("http://127.0.0.1:8000/api/leads/", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            let dates = new Map(); //keys are dates, values are # of emails on that date
            result.forEach(element => {
                if(dates.get(element.date)){
                    dates.set(element.date, dates.get(element.date) + 1);
                }else{
                    dates.set(element.date, 1);
                }
            });

            let formattedData = [];
            //for some reason we have to swap the key and values
            dates.forEach((value, key) => {
                let date = new Date(key);
                formattedData.push([date, value]);
            });
            formattedData = formattedData.sort((a, b) => a[0] - b[0]);
            console.log(formattedData);
            this.setState({
                dates: formattedData
            })
        })
        .catch(error => console.log('error', error));
    }

    componentDidMount(){
        this.getElectionEmailsProcessed();
        this.getStockEmailsProcessed();
        this.getChartData();
    }

    render(){
        return(
            <div>
                <div class="header">
                    <h1>System Health and Status</h1>
                </div>
                <div class="grid-container">
                    <div class="grid-item emails">
                        <h1>Total Emails Processed</h1>
                        <hr></hr>
                        <p1>{this.state.electionEmails + this.state.stockEmails}</p1>
                    </div>
                    <div class="grid-item election">
                        <h1>Election Emails Processed</h1>
                        <hr></hr>
                        <p1>{this.state.electionEmails}</p1>
                    </div>
                    <div class="grid-item stocks">
                        <h1>Stock Market Emails Processed</h1>
                        <hr></hr>
                        <p1>{this.state.stockEmails}</p1>
                    </div>
                    <div class="grid-item line-graph">
                        <h1>Frequency of Incoming Emails Over Time</h1>
                        <MyChart data={this.state.dates}/>
                    </div>
                    <a className="system" href="/">Back</a>
                    <a className="next" href="/health2">Next</a>
                </div>
            </div>
        );
    }
}

export default SystemHealth;