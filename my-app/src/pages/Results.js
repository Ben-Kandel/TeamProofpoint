import React from "react"

import Election from "../components/Election";
import StockMarket from "../components/StockMarket";

//css   
import "./Results.css";

class Model extends React.Component{
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
                        <div class="line"></div>
                    </div>
                    <div class="card5">
                        <h2>Common Words</h2>
                        <hr/>
                    </div>
                    <div class="card6"></div>
                    <div class="card7"></div>
                    <div class="card8"></div>   
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