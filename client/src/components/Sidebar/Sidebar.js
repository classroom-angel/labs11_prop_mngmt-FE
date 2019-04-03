import React from 'react'
import {NavLink} from 'react-router-dom'
import '../../App.css'
import './Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <h1 className="sidebar-header">Classroom Angel</h1>

            <NavLink to="/bm-homepage"><button className="sidebar-button">Board Member Homepage</button></NavLink>
            <NavLink to="/issue-log"><button className="sidebar-button">Issue Log</button></NavLink>
            <NavLink to="/scheduled"><button className="sidebar-button">Scheduled</button></NavLink>
            {/* <NavLink to="/attendance"><button className="sidebar-button">Teacher Attendance</button></NavLink> */}
            <NavLink to="/visits"><button className="sidebar-button">Admin Visits</button></NavLink>
            <NavLink to="/payments"><button className="sidebar-button">Payments</button></NavLink>
            <NavLink to="/"><button className="sidebar-button">Back to Landing Page</button></NavLink>
        </div>
    )
}

export default Sidebar
