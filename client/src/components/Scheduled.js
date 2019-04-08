import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from '../axiosInstance';
import Sidebar from './Sidebar/Sidebar';
import '../App.css';
const localizer = Calendar.momentLocalizer(moment);

export default class Scheduled extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solutions: [],
      events: []
    };
  }

  componentDidMount() {
    axios
      .get('solutions')
      .then(response => {
        console.log(response.data);
        this.setState(function() {
          return { solutions: [...response.data.solutions] };
        }, this.setEvents);
      })
      .catch(error => {
        console.error('Cannot get solutions', error);
      });
  }

  setEvents = () => {
    const events = [];
    console.log(this.state.solutions);
    this.state.solutions.map(solution => {
      console.log(Object.keys(solution));
      const date = new Date(moment(solution.date, 'MM_DD_YY'));
      events.push({
        title: solution.name,
        resource: solution.id,
        start: date,
        end: date
      });
    });
    this.setState({ events: events });
  };

  selectedEvent = event => {
    this.props.update(event.resource);
    this.props.history.push(`/events/${event.resource}`);
    console.log(event);
  };

  render() {
    if (this.props.auth.isAuth()) {
      return (
        <div className="page-container">
          <Sidebar />

          <div className="calendar right-side">
            <NavLink to="/createEventForm">Create new Event</NavLink>
            <h1 className="calendar-title">Calendar</h1>
            <div style={{ height: 700 }}>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                solutions={this.state.solutions}
                style={{ height: '100vh', width: '80vw' }}
                onSelectEvent={this.selectedEvent}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Whoops, you must be logged in to view Scheduled Issues</h1>;
    }
  }
}
