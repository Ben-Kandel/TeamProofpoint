import React from "react";
import SystemBarChart from "../components/SystemBarChart";

import { SystemHealthChart2 } from "../components/SystemHealthChart";

//css
import "./SystemHealth2.css"

class SystemHealth2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            posElectionEmails: 0,
            posStocksEmails: 0,
            negElectionEmails: 0,
            negStocksEmails: 0,
            totalEmails: 0,
        };

        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    async getPosNegEmails(){

        let getJsonData = async (url) => {
            let response = await fetch(url, this.requestOptions);
            let json = await response.json();
            return json;
        };

        let processJsonData = (data) => {
            let total = 0;
            data.forEach(element => {
                total += element.volume;
            });
            return total;
        };

        let electionData = await getJsonData('http://127.0.0.1:8000/api/leads/?P_N=POSITIVE');
        let posElectionEmails = processJsonData(electionData);
        electionData = await getJsonData('http://127.0.0.1:8000/api/leads/?P_N=NEGATIVE');
        let negElectionEmails = processJsonData(electionData);

        let stocksData = await getJsonData('http://127.0.0.1:8000/api/stocks/?P_N=POSITIVE');
        let posStocksEmails = processJsonData(stocksData);
        stocksData = await getJsonData('http://127.0.0.1:8000/api/stocks/?P_N=NEGATIVE');
        let negStocksEmails = processJsonData(stocksData);

        this.setState({
            posElectionEmails: posElectionEmails,
            posStocksEmails: posStocksEmails,
            negElectionEmails: negElectionEmails,
            negStocksEmails: negStocksEmails,
            totalEmails: posElectionEmails + posStocksEmails + negElectionEmails + negStocksEmails,
        });
    }

    async componentDidMount(){
        this.getPosNegEmails();
    }

    render(){
        return(
            <div>
                <div class="header">
                    <h1>System Health and Status</h1>
                </div>
                <div class="grid-container-2">
                    <div class="grid-item-2 data-upload">
                        <h1>Last Email Processed</h1>
                        <hr></hr>
                        <p1>

                            11/17/2020

                            11/18/2020

                        </p1>
                    </div>
                    <div class= "grid-item-2 runtime">
                        <h1>Runtime</h1>
                        <hr></hr>
                        <p1>4 emails/second</p1>
                    </div>
                    <div class="grid-item-2 emails-2">
                        <h1>Total Emails Processed</h1>
                        <hr></hr>
                        <p1>{this.state.totalEmails}</p1>
                    </div>
                    <div class="grid-item-2 positive-sentiment">
                        <h1># of Positive Sentiment Emails</h1>
                        <hr></hr>
                        <p1>{this.state.posElectionEmails + this.state.posStocksEmails}</p1>
                    </div>
                    <div class="grid-item-2 negative-sentiment">
                        <h1># of Negative Sentiment Emails</h1>
                        <hr></hr>
                        <p1>{this.state.negElectionEmails + this.state.negStocksEmails}</p1>
                    </div>
                    <div class="grid-item-2 bar-graph">
                        {/* <SystemBarChart data={this.state}/> */}
                        <SystemHealthChart2 data={this.state}/>
                    </div>
                    <a className="system" href="/health">Back</a>
                    <a className="next" href="/">Home</a>
                </div>

            </div>
        );
    }
}
export default SystemHealth2;