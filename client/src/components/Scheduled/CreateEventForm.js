import React, { Component } from 'react';
import axios from '../../axiosInstance';

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
      <div className="EventForm">
        <form onSubmit={this.createEvent}>
          <input
            onChange={this.handleChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleChange}
            placeholder="date"
            value={this.state.date}
            name="date"
          />
          <input
            onChange={this.handleChange}
            placeholder="time"
            value={this.state.time}
            name="time"
          />
          <input
            onChange={this.handleChange}
            name="organizationId"
            type="number"
            value={this.state.organizationId}
            placeholder="Enter Organization Id"
          />
          <button type="submit">Add Event</button>
        </form>
      </div>
    );
  }
}

export default CreateEventForm;
