//react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//css
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import SystemHealth from "./pages/SystemHealth";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <a href="/"> Home </a>
          <a href="/about"> About </a>
          <a href="/health"> Health </a>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/health">
            <SystemHealth />
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
function Home() {
  return(
    <h1>this is the home page!</h1>
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
