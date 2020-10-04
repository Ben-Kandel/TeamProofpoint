//components
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import InfoCard from "./InfoCard";
import InfoButton from "./InfoButton";
import {CustomChart} from "./CustomChart";

//css stuff
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <div class="grid-container">

    <div class="grid-header">
      <h1>System Health and Status</h1>
    </div>

    <div class="item1">
      <InfoCard title="Emails Processed" text="4,593,238" width="15rem"/>
    </div>
    <div class="item2">
      <InfoCard title="Last Data Upload" text="2 days ago" width="15rem"/>
    </div>
    <div class="item3">
      <InfoCard title="Runtime" text="0.45 ms" width="15rem"/>
    </div>
    <div class="item4">
      <InfoButton text="Go Back"/>
    </div>
    <div class="item5">
      <CustomChart></CustomChart>
    </div>

  </div>
  ,
  document.getElementById('root')
);

/*
import Home from "./components/Home";
import About from "./components/About";
import Navigation from './components/Navigation';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Navigation>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/about" component={About}/>
            </Switch>
          </Navigation>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <div>
    <p1>Fuck!</p1>
  </div>,
  document.getElementById("root")
)
*/