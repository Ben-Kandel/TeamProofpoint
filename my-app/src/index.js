import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InfoCard from "./InfoCard";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <InfoCard title="Emails Processed" text="4,593,238" width="15rem"/>,
  document.getElementById('root')
);
