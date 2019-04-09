import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from '../../axiosInstance';
import Sidebar from '../Sidebar/Sidebar';

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
            <h3 className="calendar-title">Scheduled Issues and Visits</h3>
            <div>
              <Link to="/createEventForm">
                <Button
                  style={{ margin: '10px' }}
                  className="cyan darken-2"
                  waves="light"
                  style={{ marginRight: '5px' }}
                >
                  Schedule Issue or Visit
                </Button>
              </Link>

              <Button className="cyan darken-2" style={{ margin: '10px' }}>
                Click event or Issue to edit
              </Button>
            </div>
            <div style={{ height: 700 }}>
              <Calendar
                className="white"
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                events={this.state.events}
                solutions={this.state.solutions}
                style={{
                  height: '154%',
                  width: '95%',
                  marginLeft: '2.5%',
                  marginBottom: '2%'
                }}
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
