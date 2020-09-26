//components
import React from 'react';
import ReactDOM from 'react-dom';
import InfoCard from "./InfoCard";
import InfoButton from "./InfoButton";
import CustomChart from "./CustomChart";

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
      <CustomChart width="400px" height="300px"/>
    </div>

  </div>
  ,
  document.getElementById('root')
);
