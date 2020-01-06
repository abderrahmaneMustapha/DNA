import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './navbar.css';
import Home from '../home/Home';
import Courses from '../courses/Courses';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faTachometerAlt,faUserAlt, faBookOpen} from '@fortawesome/free-solid-svg-icons'
class NavBar extends React.Component{

render(){
    return(
  <div className="NavBar">    
 <Router>
<nav >
  <ul className="list-group">
    <li>
      <Link className= "list-group-item" to="/"><FontAwesomeIcon icon={faHome} /> </Link>
    </li>
    <li>
      <Link className= "list-group-item" to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} /></Link>
    </li>
    <li>
      <Link className= "list-group-item" to="/profile"><FontAwesomeIcon icon={faUserAlt} /></Link>
    </li>
    <li>
      <Link className= "list-group-item" to="/courses"><FontAwesomeIcon icon={faBookOpen} /></Link>
    </li>
    
  </ul>
  </nav>
  <div>
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/courses">
      <Courses />
    </Route>
   
  </Switch>
</div>

</Router>
</div> 
   
    );
    }
}

export default NavBar;



