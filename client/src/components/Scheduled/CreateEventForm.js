import React, { Component } from 'react';
import axios from '../../axiosInstance';
import { Button, Icon } from 'react-materialize';
import './Form.css';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solutions: [],
      issueId: 1,
      name: '',
      date: '',
      time: '',
      organizationId: ''
    };
  }

  // this function creates an event

  createEvent = event => {
    event.preventDefault();
    const newEvent = {
      issueId: this.state.issueId,
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      organizationId: this.state.organizationId
    };
    axios
      .post('solutions', newEvent)
      .then(response => {
        console.log(response.data);
        this.setState({ name: '', date: '', time: '', organization_id: '' });

        this.props.history.push('/scheduled');
      })
      .catch(error => {
        console.error("Can't add solution", error);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h3>Schedule Issue</h3>
        <div className="EventForm cyan z-depth-4">
          <form onSubmit={this.createEvent}>
            <div className="row">
              <div className="input-field col s12 black-text">
                <input
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
                  onChange={this.handleChange}
                  placeholder="MM_DD_YY"
                  value={this.state.date}
                  name="date"
                />
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <input
                  onChange={this.handleChange}
                  placeholder="12:00 PM"
                  value={this.state.time}
                  name="time"
                />
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <input
                  onChange={this.handleChange}
                  name="organizationId"
                  type="number"
                  value={this.state.organizationId}
                  placeholder="Select Organization Id"
                />
              </div>
            </div>
            <Button className="amber white-text" type="submit" waves="light">
              Submit
              <Icon right>send</Icon>
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateEventForm;
