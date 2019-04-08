import React, { Component } from 'react';
import axios from '../../axiosInstance';
import { Button, Icon, CardPanel, Row, Col } from 'react-materialize';
import './testimonial.css';

class AddTestimonial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonials: [],
      name: '',
      role: '',
      text: ''
    };
  }

  createTestimonial = event => {
    event.preventDefault();
    const newTestimonial = {
      name: this.state.name,
      role: this.state.role,
      text: this.state.text
    };
    axios
      .post('testimonials', newTestimonial)
      .then(response => {
        console.log(response.data);
        this.setState({
          name: '',
          role: '',
          text: ''
        });

        this.props.history.push('/testimonials');
      })
      .catch(error => {
        console.error("Can't add testimonial", error);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <h3>Add Testimonial</h3>
        <div className="TestimonialForm cyan darken-2 col s12">
          <form onSubmit={this.createTestimonial}>
            <div className="row">
              <div class="input-field col s12">
                <input
                  className="validate"
                  onChange={this.handleChange}
                  placeholder="Name"
                  value={this.state.name}
                  name="name"
                />
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <input
                  className="validate"
                  onChange={this.handleChange}
                  placeholder="Role"
                  value={this.state.role}
                  name="role"
                />
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <textarea
                  id="textarea1"
                  className="materialize-textarea validate"
                  onChange={this.handleChange}
                  placeholder="Testimonial"
                  value={this.state.text}
                  name="text"
                />
              </div>
            </div>

            <Button className="red lighten-1" type="submit" waves="light">
              Submit
              <Icon right>send</Icon>
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddTestimonial;
