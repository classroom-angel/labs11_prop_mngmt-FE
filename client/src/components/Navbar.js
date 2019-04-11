import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home/Home.css';

export default function Navbar(props) {
  const isAuth = props.auth.isAuth();
  return (
    <div className="navbar">
      <NavLink
        className="cyan darken-2 btn navbtn"
        to="/MeetTeam"
        style={{ margin: '15px' }}
      >
        Meet The Team
      </NavLink>

      <NavLink
        className="cyan darken-2 btn navbtn"
        to="/OurMission"
        style={{ margin: '15px' }}
      >
        Our Mission
      </NavLink>
      <NavLink
        className="cyan darken-2 btn navbtn"
        to="/testimonials"
        style={{ margin: '15px' }}
      >
        Testimonials
      </NavLink>
      {isAuth ? (
        <NavLink
          className="cyan darken-2 btn navbtn"
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
          className="cyan darken-2 btn navbtn"
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
          {/*<NavLink to="/onboarding">Get Started</NavLink>*/}
          <NavLink
            className="red lighten-3 btn navbtn"
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
        </div>
      )}
    </div>
  );
}
