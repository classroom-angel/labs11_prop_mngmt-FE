import React, { Component } from 'react';
import axios from '../../axiosInstance';
import { Button, Icon, CardPanel, Row, Col } from 'react-materialize';
import './AddTestimonial.css';

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
      <div className="TestimonialForm white col s12">
        <form onSubmit={this.createTestimonial} style={{ margin: '0 auto' }}>
          <div className="row">
            <div class="input-field col s6">
              <input
                onChange={this.handleChange}
                placeholder="name"
                value={this.state.name}
                name="name"
              />
            </div>
          </div>
          <div className="row">
            <div class="input-field col s6">
              <input
                onChange={this.handleChange}
                placeholder="role"
                value={this.state.role}
                name="role"
              />
            </div>
          </div>
          <div className="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">mode_edit</i>
              <textarea
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
    );
  }
}

export default AddTestimonial;
