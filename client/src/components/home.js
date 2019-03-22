import React from 'react'
import { NavLink } from 'react-router-dom'
import './home.css'


function home() {
    return (
        <div>
        <div className="onboarding-component">
            <h1>Classroom Angel</h1>
            <NavLink to="/ourmission">Our Mission</NavLink>
            <NavLink to="/testimonials">Testimonials</NavLink>
            <NavLink to="/signout">Signout</NavLink>
        </div>
        <div className = "Main">
         <NavLink to="/onboarding">Get Started</NavLink>
       </div>
       
        <div className= "Footer">
        <p>©Classroom Angel</p>
         <NavLink to="/team">Meet The Team</NavLink>
        </div>
        </div>
    )
}

export default home;