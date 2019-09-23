import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import {connect} from 'react-redux';
import Home from './Home';
import Favorites from './Favorites';
import NoMatch from './NoMatch';



// class RouterComp extends Component {

//   render() {
//     return (
//       <div className="navbar navbar-expand-lg navbar-light static-top">
//           <Router>
//             <div>
//               <ul className="nav">
//               <span>ReduxWeatherApp</span>
//               <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/favorites">Favorites</Link>
//                 </li>
//               </ul>

//               <Switch>
//                 <Route exact path="/" component={Home} />
//                 <Route path="/favorites" component={Favorites} history={this.props.history} />
//                 <Route component={NoMatch} />
//               </Switch>
//             </div>
//           </Router>
//         </div>
//     );
//   }
// }
function RouterComp() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
  
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/favorites" exact component={Favorites} />
          <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }



export default RouterComp;