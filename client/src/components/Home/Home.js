import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import logo from '../../img/logo.png';

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
        <NavLink
          className="cyan darken-2 btn"
          to="/ourmission"
          style={{ margin: '15px' }}
        >
          Our Mission
        </NavLink>
        <NavLink
          className="cyan darken-2 btn"
          to="/testimonials"
          style={{ margin: '15px' }}
        >
          Testimonials
        </NavLink>
        {isAuth ? (
          <NavLink
            className="cyan darken-2 btn"
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
            className="cyan darken-2 btn"
            to="/"
            onClick={function(e) {
              props.auth.login();
            }}
            style={{ margin: '15px' }}
          >
            Sign up/Sign in
          </NavLink>
        )}
      </div>
      {isAuth && (
        <div className="Main">
          {/*<NavLink to="/onboarding">Get Started</NavLink>*/}
          <NavLink
            className="red lighten-3 btn"
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

      <div className="logoAndText">
        <div className="textBox">
          <h4>
            Manage your <br />
            school wisely
          </h4>
          <p>
            It's easy to manage your school with Classroom Angel! As a teacher
            or a school administrator overseas, or a board member in the United
            States, you will get all the information you need about issues that
            need to be resolved, be able to pay contractors for their work with
            Stripe, and see when an administrator is set to visit.
          </p>

          {!isAuth && (
            <>
              <p>Sign up or sign in today to get started!</p>
              <NavLink
                className="cyan darken-2 btn"
                to="/"
                style={{ margin: '15px' }}
              >
                Sign up/sign in
              </NavLink>{' '}
            </>
          )}
        </div>
        <img src={logo} alt="Classroom Angel's logo" id="logo" className="hide-on-med-and-down" />
      </div>

      <div className="Footer">
        <p>© {date.getFullYear()}, Classroom Angel. All rights reserved.</p>
        <NavLink to="/MeetTeam">Meet The Team</NavLink>
      </div>
      {/*<div>
        <NavLink className='cyan darken-2 btn' to="/" onClick={function(e) {props.auth.login()}}>Signup?</NavLink>
        <NavLink className='cyan darken-2 btn' to="/" onClick={function(e) {props.auth.login()}}>Login?</NavLink>
        </div>*/}
    </div>
  );
}

export default Home;
