import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import '../App.css'
import axios from '../axiosInstance'

export default class TeacherAttendance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attendance: [],
            attendanceLoaded: false
        }
    }

    componentDidMount() {
        axios
        .get('attendance')
        .then(res => this.setState({attendance: res.data.attendance, attendanceLoaded: true}))
        .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="page-container">
                    <Sidebar/>
                    <div className="right-side">
                        <h1>Teacher Attendance</h1>
                        <div style={{display: 'inline-block', border: '2px solid'}}>
                            {
                                this.state.attendanceLoaded ? (
                                    this.state.attendance.map(function(teacher) {
                                        return (
                                        <div key={teacher.id}>
                                        <p>ID: {teacher.id}</p>
                                        <p>Name: No name provided by API</p>
                                        <p>lastIn: {teacher.lastIn}</p>
                                        <p>lastOut: {teacher.lastOut}</p>
                                        <p>OrgID: Need a different request</p>
                                        <p>TMM: {teacher.totalMinutesMissed}</p>
                                        </div>
                                        )
                                    }))
                                : "Loading..."
                            }
                        </div>
                    </div>
            </div>
        )

    }
}
