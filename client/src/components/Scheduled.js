import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { NavLink } from "react-router-dom";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from '../axiosInstance';
import Sidebar from './Sidebar/Sidebar';
import '../App.css'
const localizer = Calendar.momentLocalizer(moment)



export default class Scheduled extends React.Component {
constructor(props){
super(props)
this.state = {
solutions: [],
events: [],
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



setEvents = () => {
    const events = []
    this.state.solutions.map(solution =>{
        const date = new Date(moment(solution.date,'MM_DD_YY'));
        events.push({
        title: solution.name,
        start: date,
        end:  date
        })
    })
    this.setState({events:events})  
}





render() {
return (
    <div className ="page-container">
    <Sidebar />
  <NavLink to="/createEventForm">Create new Event</NavLink>
    <div className="calendar">
  <h1 className="calendar-title">Calendar</h1>
     <div style={{ height: 700 }}>
      <Calendar
         localizer={localizer}
         defaultDate={new Date()}
         defaultView="month"
         events={this.state.events}
         solutions={this.state.solutions}
         style={{ height: "100vh", width: "80vw"}}
        />
      </div>
   </div>
  </div>
    );
  }
}

