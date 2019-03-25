import React from 'react'
import { NavLink } from 'react-router-dom'
import './home.css'


function Home() {
    return (
        <div>
        <div className="onboarding-component">
            <h1>Classroom Angel</h1>
            <NavLink className='land-link' to="/ourmission">Our Mission</NavLink>
            <NavLink className='land-link' to="/testimonials">Testimonials</NavLink>
            <NavLink className='land-link' to="/signout">Signout</NavLink>
        </div>
        <div className = "Main">
         <NavLink to="/onboarding">Get Started</NavLink>
       </div>
      
	 <NavLink className='land-link' to="/bm-homepage">View App</NavLink>
     <NavLink className='land-link' to="/signup">Signup</NavLink>
         
       
        <div className= "Footer">
        <p>©Classroom Angel</p>
         <NavLink to="/team">Meet The Team</NavLink>
        </div>
        </div>
    )
}

export default Home;
