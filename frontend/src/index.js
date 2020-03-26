import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

// Pages:
import Survey from './components/Survey';
import PageNotFound from "./components/404";

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Survey} />
        <Route exact path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);