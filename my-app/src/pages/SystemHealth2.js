import React from "react";
import SystemBarChart from "../components/SystemBarChart";

//css
import "./SystemHealth2.css"

class SystemHealth2 extends React.Component{
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
                        <p1>1,348</p1>
                    </div>
                    <div class="grid-item-2 positive-sentiment">
                        <h1># of Positive Sentiment Emails</h1>
                        <hr></hr>
                        <p1>535</p1>
                    </div>
                    <div class="grid-item-2 neutral-sentiment">
                        <h1># of Neutral Sentiment Emails</h1>
                        <hr></hr>
                        <p1>33</p1>
                    </div>
                    <div class="grid-item-2 negative-sentiment">
                        <h1># of Negative Sentiment Emails</h1>
                        <hr></hr>
                        <p1>780</p1>
                    </div>
                    <div class="grid-item-2 bar-graph">
                        <SystemBarChart/>
                    </div>
                </div>
            </div>
        );
    }
}
export default SystemHealth2;