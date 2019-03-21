import React, { Component } from 'react';
// import {Route} from 'react-router-dom';
// import {Link} from 'react-router-dom';



class landingpage extends Component {
  
    render() { 
        return ( 
        <div className = "landing">
        <div className="title">
        <h1>Classroom Angel</h1>
        </div>
        <div classname ="nav">
        <a href="#ourmission">Our Mission</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#signout">Signout</a>
        </div>
   
        {/* <div className = "Main">
        <Button className ="getstarted">
         Get Started
        </Button>
        </div> */}
        </div>
         );
    }
}
 
export default landingpage;