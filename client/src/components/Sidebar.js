import React from 'react'
import {NavLink} from 'react-router-dom'
import '../App.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <h1>Classroom Angel</h1>
            <NavLink to="/bm-homepage"><button className="sidebar-button">Board Member Homepage</button></NavLink>
            <NavLink to="/payments"><button className="sidebar-button">Payments</button></NavLink>
            <NavLink to="/visits"><button className="sidebar-button">Visits</button></NavLink>        
            <NavLink to="/issue-log"><button className="sidebar-button">Issue Log</button></NavLink>        
            <NavLink to="/scheduled"><button className="sidebar-button">Scheduled</button></NavLink>        
            {/* <button onClick={this.handleLogout} className="logout-button">Logout</button> */}
        </div>
    )
}

export default Sidebar