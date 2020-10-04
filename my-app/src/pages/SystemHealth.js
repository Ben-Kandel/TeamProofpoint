import React from "react";
//import InfoButton from "../components/InfoButton"; right now we are not using this button...
import InfoCard from "../components/InfoCard";
import {CustomChart} from "../components/CustomChart";

import "./SystemHealth.css";

class SystemHealth extends React.Component{
    render(){
        return(
            <div class="grid-container">
                <div class="grid-header">
                    <h1>System Health and Status</h1>
                </div>
                <div class="item1">
                    <InfoCard title="Emails Processed" text="4,593,238" width="15rem"></InfoCard>
                </div>
                <div class="item2">
                    <InfoCard title="Last Data Upload" text="2 days ago" width="15rem"></InfoCard>
                </div>
                <div class="item3">
                    <InfoCard title="Runtime" text="0.45ms" width="15rem"></InfoCard>
                </div>
                <div class="item4">
                    <CustomChart></CustomChart>
                </div>
            </div>
        );
    }
}

export default SystemHealth;