import React from "react"

import Election from "../components/Election";
import StockMarket from "../components/StockMarket";

//css
import "./Results.css";

export default class Results extends React.Component{
    render(){
        return(
            <div id="stuff">
                <Election day="Monday"/>
                <StockMarket/>
            </div>
        );
    }

}