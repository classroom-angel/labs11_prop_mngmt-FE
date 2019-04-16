import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';
import './Home/Home.css';

export default function Navbar(props) {
  const isAuth = props.auth.isAuth();
  const profile = JSON.parse(localStorage.getItem('profile'));
  const loc = props.location.pathname
  if (loc === "/" || loc === "/testimonials" || loc === "/MeetTeam" || loc === "/AddTestimonial" || loc === "/OurMission") {
    return (
      <div className="navbar" style={{zIndex: "5"}}>
      <div className="topbar2">
        <img src={logo} style={{ height: "40px", width: "auto", marginLeft: "10px"}}/>
        <div className="landingTitle">
          <h4>Classroom Angel</h4>
        </div>
      </div>
      {loc !== "/" &&
      <NavLink
      className="cyan btn navbtn"
      to="/"
      style={{ margin: '15px' }}
      >
      Home
      </NavLink>
    }
      {loc !== "/MeetTeam" &&
      <NavLink
      className="cyan btn navbtn"
      to="/MeetTeam"
      style={{ margin: '15px' }}
      >
      Meet The Team
      </NavLink>}

      {loc !== "/OurMission" &&
        <NavLink
      className="cyan btn navbtn"
      to="/OurMission"
      style={{ margin: '15px' }}
      >
      Our Mission
      </NavLink>}
      {loc !== "/testimonials" &&
        <NavLink
      className="cyan btn navbtn"
      to="/testimonials"
      style={{ margin: '15px' }}
      >
      Testimonials
      </NavLink>}
      {isAuth ? (
        <NavLink
        className="cyan btn navbtn"
        to="/"
        onClick={function(e) {
          props.auth.logout();
        }}
        style={{ margin: '15px' }}
        >
        Sign out
        </NavLink>
      ) : (
        <NavLink
        className="cyan btn navbtn"
        to="/"
        onClick={function(e) {
          props.auth.login();
        }}
        style={{ margin: '15px' }}
        >
        Sign up/Sign in
        </NavLink>
      )}

      {isAuth && (
        <div className="Main">
        {profile.role === 'Board member' ? (
          <NavLink
          className="amber darken-2 btn navbtn"
          to="/bm-homepage"
          style={{
            margin: '15px',
            width: '200px',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
          >
          View App
          </NavLink>
        ) : (
          <NavLink
          className="amber darken-2 btn navbtn"
          to="/issue-log"
          style={{
            margin: '15px',
            width: '200px',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
          >
          View App
          </NavLink>
        )}
        </div>
      )}
      </div>
    );
  } else {
    return null;
  }
}
