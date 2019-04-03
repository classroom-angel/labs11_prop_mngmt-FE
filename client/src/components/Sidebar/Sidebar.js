import React from 'react'
import {NavLink} from 'react-router-dom'
import '../../App.css'
import './Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
<<<<<<< HEAD:client/src/components/Sidebar.js
            <h1>Classroom Angel</h1>
=======
            <h1 className="sidebar-header">Classroom Angel</h1>
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c:client/src/components/Sidebar/Sidebar.js
            
            <NavLink to="/bm-homepage"><button className="sidebar-button">Board Member Homepage</button></NavLink>
            <NavLink to="/issue-log"><button className="sidebar-button">Issue Log</button></NavLink>
            <NavLink to="/scheduled"><button className="sidebar-button">Scheduled</button></NavLink>
<<<<<<< HEAD:client/src/components/Sidebar.js
            <NavLink to="/attendance"><button className="sidebar-button">Teacher Attendance</button></NavLink>
=======
            {/* <NavLink to="/attendance"><button className="sidebar-button">Teacher Attendance</button></NavLink> */}
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c:client/src/components/Sidebar/Sidebar.js
            <NavLink to="/visits"><button className="sidebar-button">Admin Visits</button></NavLink>
            <NavLink to="/payments"><button className="sidebar-button">Payments</button></NavLink>
            <NavLink to="/"><button className="sidebar-button">Back to Landing Page</button></NavLink>
        </div>
    )
}

export default Sidebar
