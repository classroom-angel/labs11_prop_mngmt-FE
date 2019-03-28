import React from 'react'
import { NavLink } from 'react-router-dom'
import './home.css'


function Home(props) {
  const isAuth = props.auth.isAuth()
  console.log(isAuth);
    return (
      <div>
      {isAuth ?
        <div>
          <div className="onboarding-component">
            <h1>Classroom Angel</h1>
            <NavLink className='land-link' to="/ourmission">Our Mission</NavLink>
            <NavLink className='land-link' to="/testimonials">Testimonials</NavLink>
            <NavLink className='land-link' to="/"  onClick={function(e) {props.auth.logout()}}>Signout</NavLink>
          </div>
          <div className = "Main">
            <NavLink to="/onboarding">Get Started</NavLink>
            <NavLink className='land-link' to="/bm-homepage">View App</NavLink>
          </div>

          <div className= "Footer">
            <p>©Classroom Angel</p>
            <NavLink to="/team">Meet The Team</NavLink>
          </div>
        </div>


        :
        <div>
          <NavLink className='land-link' to="/" onClick={function(e) {props.auth.login()}}>Signup?</NavLink>
          <NavLink className='land-link' to="/" onClick={function(e) {props.auth.login()}}>Login?</NavLink>
        </div>}
      </div>
    )
}

export default Home;
