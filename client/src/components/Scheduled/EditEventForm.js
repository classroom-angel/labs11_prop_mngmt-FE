import React, { Component } from 'react';
import axios from '../../axiosInstance';
import { Button, Icon } from 'react-materialize';
import './Form.css';
class EditEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      time: ''
    };
  }

  componentDidMount() {
    axios
      .get(`solutions/${this.props.solutionEditId}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          name: response.data.solution.name,
          date: response.data.solution.date,
          time: response.data.solution.time
        });
      })
      .catch(error => {
        console.error("Can't get solution", error);
      });
  }

  // this allows you to edit a event
  updateEvent = event => {
    event.preventDefault();
    axios
      .put(`solutions/${this.props.solutionEditId}`, this.state)
      .then(() => {
        console.log(this.props);
        this.props.history.push('/scheduled');
      })
      .catch(error => {
        console.error("Can't edit solution", error);
      });
  };

  // this allows you to delete a event
  deleteEvent = event => {
    event.preventDefault();
    axios
      .delete(`solutions/${this.props.solutionEditId}`, this.state)
      .then(() => {
        this.props.history.push('/scheduled');
      })
      .catch(error => {
        console.error("Can't delete solution", error);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Edit Issue</h3>
        <div className="EditForm cyan">
          <form onSubmit={this.updateEvent}>
            <div className="row">
              <div class="input-field col s12">
                <input
                  onChange={this.handleChange}
                  placeholder="name"
                  value={this.state.name}
                  name="name"
                />
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <input
                  onChange={this.handleChange}
                  placeholder="date"
                  value={this.state.date}
                  name="date"
                />
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <input
                  onChange={this.handleChange}
                  placeholder="time"
                  value={this.state.time}
                  name="time"
                />
              </div>
            </div>
            <div>
              <Button
                className="amber black-text"
                type="submit"
                waves="light"
                style={{ margin: '10px' }}
              >
                Submit
                <Icon right>send</Icon>
              </Button>
              <Button
                className="red darken-4"
                onClick={this.deleteEvent}
                style={{ margin: '10px' }}
              >
                Delete Issue
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditEventForm;
