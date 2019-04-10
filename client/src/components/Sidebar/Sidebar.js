// import React from 'react';
import { NavLink } from 'react-router-dom';
// import '../../App.css';
// import './Sidebar.css';
//
// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h3 className="sidebar-header">Classroom Angel</h3>
//
//       <NavLink to="/bm-homepage">
//         <button className="sidebar-button">Board Member Homepage</button>
//       </NavLink>
//       <NavLink to="/issue-log">
//         <button className="sidebar-button">Issue Log</button>
//       </NavLink>
//       <NavLink to="/scheduled">
//         <button className="sidebar-button">Scheduled</button>
//       </NavLink>
//       {/* <NavLink to="/attendance"><button className="sidebar-button">Teacher Attendance</button></NavLink> */}
//       <NavLink to="/visits">
//         <button className="sidebar-button">Admin Visits</button>
//       </NavLink>
//       <NavLink to="/payments">
//         <button className="sidebar-button">Payments</button>
//       </NavLink>
//       <NavLink to="/">
//         <button className="sidebar-button">Back to Landing Page</button>
//       </NavLink>
//     </div>
//   );
// }
//
// export default Sidebar;

import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { BrowserRouter, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import Kid from "../../img/oneboyinclass.jpg"

class Sidebar extends Component {
  componentDidMount() {
    var elem = document.querySelector('.sidenav');
    var instance = M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 250
    });
  }

  render() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    return (
      <div>
        <ul id="slide-out" className="sidenav sidebar">
          <img
            src={Kid}
            alt="A child in class"
            style={{ height: '200px', width: '300px' }}
          />
          <h3 className="sidebar-header">Classroom Angel</h3>
          {profile.role === "Board member" && <li>
            <NavLink to="/bm-homepage">
              <p className="black-text waves-effect">Board Member Homepage</p>
            </NavLink>
          </li>}
          {(profile.role === "School administrator" || profile.role === "Teacher") && <li>
            <NavLink to="/issue-log">
              <p className="black-text waves-effect">Issue Log</p>
            </NavLink>
          </li>}
          <li>
            <NavLink to="/scheduled">
              <p className="black-text waves-effect">Scheduled Issues</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/visits">
              <p className="black-text waves-effect">Admin Visits</p>
            </NavLink>
          </li>
          {profile.role === "Board member" && <li>
            <NavLink to="/payments">
              <p className="black-text waves-effect">Payments</p>
            </NavLink>
          </li>}
          <li>
            <NavLink to="/">
              <p className="black-text waves-effect">Landing Page</p>
            </NavLink>
          </li>
        </ul>
        <a href="#" data-target="slide-out" className="sidenav-trigger" style={{position: 'fixed', left: '5px', top: '10px'}}>
          <i className="material-icons white-text">menu</i>
        </a>
      </div>
    );
  }
}

export default Sidebar;
