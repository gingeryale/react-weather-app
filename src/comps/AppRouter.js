import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Favorites from './Favorites';
import NoMatch from './NoMatch';

function AppRouter() {
  return (
    <Router>
      <div>
        <div className="bar">
          <span className="brand"><Link to="/">Weather-Check</Link></span>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/favorites" exact component={Favorites} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}



export default AppRouter;