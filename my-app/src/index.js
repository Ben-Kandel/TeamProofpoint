//react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//css
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import SystemHealth from "./pages/SystemHealth";
import SystemHealth2 from "./pages/SystemHealth2";
import Home from "./pages/Home"; 
import Results from "./pages/Results";
import Results1 from "./pages/Results1.js";
import Results2 from "./pages/Results2.js";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/health">
            <SystemHealth />
          </Route>
          <Route path="/health2">
            <SystemHealth2 />
          </Route>
          <Route path="/results">
            <Results/>
          </Route>
            <Route path = "/results1">
            <Results1/>
            </Route>
            <Route path = "/results2">
            <Results2/>
            </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

//this is just temporary, this will be a class in the pages directory.
function About() {
  return <h2>this is the about page...</h2>;
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
)
