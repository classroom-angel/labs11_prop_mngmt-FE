import React, { Component } from 'react';
import axios from '../../axiosInstance';
import { NavLink } from "react-router-dom";
import './testimonial.css'

class Testimonials extends Component {
    constructor(props){
        super(props);
        this.state = {
        testimonials: []
        }
    };
    
    componentDidMount() {
    console.log("hi hi!")
    axios
    .get("testimonials")
    .then(response => {
    console.log(response.data)
    this.setState(function(){return{testimonials: [...response.data.testimonials]}}
    );
  })
  .catch(error =>{
    console.error("Cannot get testimonials",error);
  })
    }

 render(){
     return(
        <div className="testimonials">
         <NavLink to="/AddTestimonial">Tell us what you think!</NavLink>
        {this.state.testimonials.map(testimonial => {
            return (
                <div className="testimonials">
                <div className="card">
                   <h1>{testimonial.name}</h1>
                   <h2>{testimonial.role}</h2> 
                   <h3>{testimonial.text}</h3>
                </div>
           </div>
            )
        })}
            
        </div>
     )
 }
 
}




export default Testimonials;






