import React, { Component } from 'react';
import dateFns from "date-fns";
import axios from '../axiosInstance';
import Sidebar from './Sidebar';
import '../App.css'



export default class Scheduled extends React.Component {
 state = {
     currentMonth: new Date(),
     selectedDate: new Date(),
     solutions: [],
 };

 renderHeader() {
   const dateFormat = "MMMM YYYY";
   
   return (
     <div className="header row flex-middle">
     <div className="col col-start">
     <div className="icon" onClick={this.prevMonth}>
     chevron_left
     </div>
     </div>
     <div className="col col-center">
     <span>
       {dateFns.format(this.state.currentMonth, dateFormat)}
    </span>
     </div>
     <div className="col col-end" onClick={this.nextMonth}>
     <div className="icon">chevron_right</div>
     </div>
     </div>  
   )
 }

 renderDays() {
     const dateFormat = "dddd";
     const days = [];

     let startDate = dateFns.startOfWeek(this.state.currentMonth);

     for (let i = 0; i < 7; i++) {
         days.push(
             <div className="col col-center" key={i}>
             {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
             </div>
         );
     }
     return <div className="days row">{days}</div>
 }

 renderCells() {
     const {currentMonth, selectedDate} = this.state;
     const monthStart = dateFns.startOfMonth(currentMonth);
     const monthEnd = dateFns.endOfMonth(monthStart);
     const startDate = dateFns.startOfWeek(monthStart);
     const endDate = dateFns.endOfWeek(monthEnd);

     const dateFormat = "D";
     const rows = [];

     let days = [];
     let day = startDate;
     let formattedDate = "";

     while (day <= endDate) {
         for (let i = 0; i < 7; i++) {
             formattedDate = dateFns.format(day, dateFormat);
             const cloneDay = day;
             days.push(
              <div
              className={`col cell ${
                  !dateFns.isSameMonth(day, monthStart)
                   ? "disabled"
                   : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
              key={day}
              onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
              >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
              </div>
             );
             day = dateFns.addDays(day, 1);
         }
         rows.push(
             <div className="row" key={day}>
             {days}
             </div>
         );
         days = [];
     }
     return <div className="body">{rows}</div>
 }

 onDateClick = day => {
     this.setState({
         selectedDate: day
     });
 };

 nextMonth = () => {
     this.setState({
         currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
     });
 };

 prevMonth = () => {
     this.setState({
         currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
     })
 };



 /* Solution Data Code */

 componentDidMount() {
  axios 
  .get("solutions")
  .then(response => {
      console.log(response.data)
      this.setState({solutions: response.data});
  })
  .catch(error => {
      console.error("Cannot get solutions",error);
  });
 }

render() {
 return (
    <div className="page-container">
    <Sidebar />
   <div className="calendar">
    {this.renderHeader()}
    {this.renderDays()}
    {this.renderCells()}
    </div>
   </div>
  
    );
 }
}

// function Scheduled(props) {
//     console.log(props.solutions)
//     if (props.solutionsLoaded) {
//         return (
//             <div className="page-container">
//                 <Sidebar />
//                 <div className="right-side">
//                         <h1 style={{textAlign: 'center', border: '2px solid green'}}>Scheduled Issues</h1>
//                         <ul>
//                             {props.solutions.map(solution => {
//                                 return (
//                                     <div key={solution.id}>
//                                       <h1>Name: {solution.name}</h1>
//                                       <h2>Notes: {solution.notes}</h2>
//                                       <h3>Status: {solution.status}</h3>
//                                       <h4>Date: {solution.date}</h4>
//                                       <h4>Time: {solution.time}</h4>
//                                       <h5>Org. Id: {solution.organization_id}</h5>
//                                     </div>
//                                 )
//                             })}
//                         </ul>
//                     </div>
                
//             </div>
//         )
//     } else {
//         return (
//             <div className="page-container">
//               <Sidebar />
//               <div>
//                   <h1>Loading...</h1>
//               </div>
//             </div>
//         )
//     }
    
    
// }

// export default Scheduled
