import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
<<<<<<< HEAD
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from '../axiosInstance';
import Sidebar from './Sidebar';
=======
import { NavLink } from "react-router-dom";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from '../axiosInstance';
import Sidebar from './Sidebar/Sidebar';
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
import '../App.css'
const localizer = Calendar.momentLocalizer(moment)



export default class Scheduled extends React.Component {
constructor(props){
super(props)
this.state = {
solutions: [],
<<<<<<< HEAD
events: []
=======
events: [],
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
}
};

componentDidMount() {

axios 
.get("solutions")
.then(response => {
console.log(response.data)
this.setState(function(){return{solutions: [...response.data.solutions]}}, 
this.setEvents    
 );
})
.catch(error => {
 console.error("Cannot get solutions",error);
});
}

<<<<<<< HEAD
setEvents = () => {
    const events = []
    this.state.solutions.map(solution =>{
        const date = new Date(moment(solution.date,'MM_DD_YY'));
        events.push({
        title: solution.name,
=======


setEvents = () => {
    const events = []
    console.log(this.state.solutions)
    this.state.solutions.map(solution =>{
         console.log(Object.keys(solution))
        const date = new Date(moment(solution.date,'MM_DD_YY'));
        events.push({
        title: solution.name,
        resource: solution.id,
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
        start: date,
        end:  date
        })
    })
    this.setState({events:events})  
}



<<<<<<< HEAD
=======
 selectedEvent = (event) => {
 this.props.update(event.resource)
 this.props.history.push(`/events/${event.resource}`)
  console.log(event)
 }
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c

render() {
return (
    <div className ="page-container">
    <Sidebar />
<<<<<<< HEAD
    <div className="calendar right-side">
    <h1 className="calendar-title">Calendar</h1>
=======

    <div className="calendar right-side">
    <NavLink to="/createEventForm">Create new Event</NavLink>
  <h1 className="calendar-title">Calendar</h1>
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
     <div style={{ height: 700 }}>
      <Calendar
         localizer={localizer}
         defaultDate={new Date()}
         defaultView="month"
         events={this.state.events}
         solutions={this.state.solutions}
         style={{ height: "100vh", width: "80vw"}}
<<<<<<< HEAD
=======
         onSelectEvent={this.selectedEvent}
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
        />
      </div>
   </div>
  </div>
    );
  }
}

