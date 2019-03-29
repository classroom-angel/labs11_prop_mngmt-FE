import React from 'react'
import { NavLink } from 'react-router-dom'
import './home.css'


function Home(props) {
  const isAuth = props.auth.isAuth()
    return (
      <div>
        <div className="onboarding-component">
          <h1>Classroom Angel</h1>
          {isAuth && <h3>Welcome, {props.name}</h3>}
          <NavLink className='land-link' to="/ourmission">Our Mission</NavLink>
          <NavLink className='land-link' to="/testimonials">Testimonials</NavLink>
          {isAuth ? <NavLink className='land-link' to="/"  onClick={function(e) {props.auth.logout()}}>Signout</NavLink> : <NavLink className='land-link' to="/"  onClick={function(e) {props.auth.login()}}>Signin/Signup</NavLink>}
        </div>
        {isAuth && <div className = "Main">
          <NavLink to="/onboarding">Get Started</NavLink>
          <NavLink className='land-link' to="/bm-homepage">View App</NavLink>
        </div>}

        <div className= "Footer">
          <p>©Classroom Angel</p>
          <NavLink to="/team">Meet The Team</NavLink>
        </div>
      {/*<div>
        <NavLink className='land-link' to="/" onClick={function(e) {props.auth.login()}}>Signup?</NavLink>
        <NavLink className='land-link' to="/" onClick={function(e) {props.auth.login()}}>Login?</NavLink>
        </div>*/}
        </div>
    )
}

export default Home;
