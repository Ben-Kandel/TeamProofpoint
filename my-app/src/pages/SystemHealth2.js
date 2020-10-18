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

    getPositiveEmailsProcessed(){
        fetch("http://127.0.0.1:8000/api/leads/?pn=Positive", this.requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                positiveEmails: result.length
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
        this.getTotalEmailsProcessed();
        this.getPositiveEmailsProcessed();
        this.getNegativeEmailsProcessed();
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
                        <p1>2 days ago</p1>
                    </div>
                    <div class="grid-item-2 runtime">
                        <h1>Runtime</h1>
                        <hr></hr>
                        <p1>0.45 ms</p1>
                    </div>
                    <div class="grid-item-2 emails-2">
                        <h1>Total Emails Processed</h1>
                        <hr></hr>
                        <p1>{this.state.totalEmails}</p1>
                    </div>
                    <div class="grid-item-2 positive-sentiment">
                        <h1># of Positive Sentiment Emails</h1>
                        <hr></hr>
                        <p1>{this.state.positiveEmails}</p1>
                    </div>
                    <div class="grid-item-2 neutral-sentiment">
                        <h1># of Neutral Sentiment Emails</h1>
                        <hr></hr>
                        <p1>0</p1>
                    </div>
                    <div class="grid-item-2 negative-sentiment">
                        <h1># of Negative Sentiment Emails</h1>
                        <hr></hr>
                        <p1>{this.state.negativeEmails}</p1>
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