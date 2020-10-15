import React from "react";
import MyChart from "../components/MyChart";

//css
import "./SystemHealth.css";

class SystemHealth extends React.Component{
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
                        <p1>1,348</p1>
                    </div>
                    <div class="grid-item election">
                        <h1>Election Emails Processed</h1>
                        <hr></hr>
                        <p1>600</p1>
                    </div>
                    <div class="grid-item stocks">
                        <h1>Stock Market Emails Processed</h1>
                        <hr></hr>
                        <p1>748</p1>
                    </div>
                    <div class="grid-item line-graph">
                        <h1>Frequency of Incoming Emails Over Time</h1>
                        <MyChart></MyChart>
                    </div>
                    <a className="system" href="/">Back</a>
                    <a className="next" href="/health2">Next</a>
                </div>
            </div>
        );
    }
}

export default SystemHealth;