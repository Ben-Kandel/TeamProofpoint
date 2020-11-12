import React from "react";
import SystemBarChart from "../components/SystemBarChart";

//css
import "./SystemHealth2.css"

class SystemHealth2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            totalEmails: 0,
            positiveEmails: 0,
            negativeEmails: 0,

            posStock: 0,
            posElection: 0,
            posConsumer: 0,
            negStock: 0,
            negElection: 0,
            negConsumer: 0,

        };

        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    getTotalEmailsProcessed(){
        fetch("http://127.0.0.1:8000/api/leads/", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                totalEmails: result.length
            })
        })
        .catch(error => console.log('error', error));
    }


    getPosStock(){
        fetch("http://127.0.0.1:8000/api/stocks/?pn=Positive", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                posStock: result.length
            })
        })
        .catch(error => console.log('error', error));
    }

    getPosElection(){
        fetch("http://127.0.0.1:8000/api/leads/?pn=Positive", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                posElection: result.length
            })
        })
        .catch(error => console.log('error', error));
    }

    getPosConsumer(){
        fetch("http://127.0.0.1:8000/api/consumers/?pn=Positive", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                posConsumer: result.length
            })
        })
        .catch(error => console.log('error', error));
    }

    getNegStock(){
        fetch("http://127.0.0.1:8000/api/stocks/?pn=Negative", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                negStock: result.length
            })
        })
        .catch(error => console.log('error', error));
    }

    getNegElection(){
        fetch("http://127.0.0.1:8000/api/leads/?pn=Negative", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                negElection: result.length
            })
        })
        .catch(error => console.log('error', error));
    }

    getNegConsumer(){
        fetch("http://127.0.0.1:8000/api/consumers/?pn=Negative", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                negConsumer: result.length
            })
        })
        .catch(error => console.log('error', error));
    }

    getNegativeEmailsProcessed(){
        fetch("http://127.0.0.1:8000/api/leads/?pn=Negative", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                negativeEmails: result.length
            })
        })
        .catch(error => console.log('error', error));
    }

    componentDidMount(){
        this.getPosConsumer();
        this.getPosStock();
        this.getPosElection();
        this.getNegConsumer();
        this.getNegStock();
        this.getNegElection();
    }

    render(){
        return(
            <div>
                <div class="header">
                    <h1>System Health and Status</h1>
                </div>
                <div class="grid-container-2">
                    <div class="grid-item-2 data-upload">
                        <h1>Last Data Upload</h1>
                        <hr></hr>
                        <p1>
                            1 day ago
                        </p1>
                    </div>
                    <div class="grid-item-2 runtime">
                        <h1>Runtime</h1>
                        <hr></hr>
                        <p1>4 emails/second</p1>
                    </div>
                    <div class="grid-item-2 emails-2">
                        <h1>Total Emails Processed</h1>
                        <hr></hr>
                        <p1>17851</p1>
                    </div>
                    <div class="grid-item-2 positive-sentiment">
                        <h1># of Positive Sentiment Emails</h1>
                        <hr></hr>
                        <p1>{this.state.posStock + this.state.posElection + this.state.posConsumer}</p1>
                    </div>
                    <div class="grid-item-2 neutral-sentiment">
                        <h1># of Neutral Sentiment Emails</h1>
                        <hr></hr>
                        <p1>0</p1>
                    </div>
                    <div class="grid-item-2 negative-sentiment">
                        <h1># of Negative Sentiment Emails</h1>
                        <hr></hr>
                        <p1>{this.state.negStock + this.state.negElection + this.state.negConsumer}</p1>
                    </div>
                    <div class="grid-item-2 bar-graph">
                        <SystemBarChart data={this.state}/>
                    </div>
                    <a className="system" href="/health">Back</a>
                    <a className="next" href="/">Home</a>
                </div>

            </div>
        );
    }
}
export default SystemHealth2;