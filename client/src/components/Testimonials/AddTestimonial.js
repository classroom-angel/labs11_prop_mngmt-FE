import React, { Component } from 'react';
import axios from '../../axiosInstance';

class AddTestimonial extends Component {
    constructor(props){
        super(props);
        this.state = {
            testimonials: [],
            name: "",
            role: "",
            text: ""
        };
    }

    createTestimonial = (event) => {
        event.preventDefault()
        const newTestimonial = {
            name: this.state.name,
            role: this.state.role,
            text: this.state.text
        }
        axios
        .post("testimonials", newTestimonial)
        .then(response => {
        console.log(response.data)
        this.setState({ name:"", role:"",text:""})

        this.props.history.push('/testimonials');
        })
        .catch(error => {
            console.error("Can't add testimonial",error)
        })
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    render(){
        return (
            <div className="TestimonialForm">
            <form onSubmit={this.createTestimonial}>
            <input
             onChange={this.handleChange}
             placeholder="name"
             value={this.state.name}
             name="name"
             />
             <input
             onChange={this.handleChange}
             placeholder="role"
             value={this.state.role}
             name="role"
             />
             <textarea
             onChange={this.handleChange}
             placeholder="text"
             value={this.state.text}
             name="text"
             />
              <button type="submit">Submit</button>
            </form>
        </div>
        )
    }

}

export default AddTestimonial;