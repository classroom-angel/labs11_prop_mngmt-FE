import React, { Component } from 'react';
import axios from '../../axiosInstance';
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
        {this.state.testimonials.map(testimonial => {
            return (
                <div className="card">
                   <h1>{testimonial.name}</h1>
                   <h2>{testimonial.role}</h2> 
                   <h3>{testimonial.text}</h3>
                </div>
            )
        })}
            
        </div>
     )
 }
 
}




export default Testimonials;






