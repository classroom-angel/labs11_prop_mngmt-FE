import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import logo from '../../img/logo.png'

function Home(props) {
  const isAuth = props.auth.isAuth();
  const date = new Date();
  return (
    <div>
      <div className="onboarding-component">
        <h1>Classroom Angel</h1>
        {isAuth && (
          <div>
            <h3>Welcome, {props.profile.name.split(' ')[0]}</h3>
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${props.profile.picture})`,
                backgroundSize: 'cover',
                width: '100px',
                height: '100px',
                borderRadius: '50px',
                margin: '0 auto 20px'
              }}
            />
          </div>
        )}
        <NavLink className="land-link" to="/ourmission">
          Our Mission
        </NavLink>
        <NavLink className="land-link" to="/testimonials">
          Testimonials
        </NavLink>
        {isAuth ? (
          <NavLink
            className="land-link"
            to="/"
            onClick={function(e) {
              props.auth.logout();
            }}
          >
            Signout
          </NavLink>
        ) : (
          <NavLink
            className="land-link"
            to="/"
            onClick={function(e) {
              props.auth.login();
            }}
          >
            Signin/Signup
          </NavLink>
        )}
      </div>
      {isAuth && (
        <div className="Main">
          <NavLink to="/onboarding">Get Started</NavLink>
          <NavLink className="land-link" to="/bm-homepage">
            View App
          </NavLink>
        </div>
      )}

      <img src={logo} alt="logo" width="600"/>

      <div className="Footer">
        <p>© {date.getFullYear()}, Classroom Angel. All rights reserved.</p>
        <NavLink to="/team">Meet The Team</NavLink>
      </div>
      {/*<div>
        <NavLink className='land-link' to="/" onClick={function(e) {props.auth.login()}}>Signup?</NavLink>
        <NavLink className='land-link' to="/" onClick={function(e) {props.auth.login()}}>Login?</NavLink>
        </div>*/}
    </div>
  );
}

export default Home;
