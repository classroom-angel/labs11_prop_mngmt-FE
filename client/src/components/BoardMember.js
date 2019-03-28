import React from 'react'
import Sidebar from './Sidebar'
import '../App.css'
import axios from '../axiosInstance'

export default class BoardMemberHub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            equipment: [],
            equipmentLoaded: false,
            attendance: [],
            attendanceLoaded: false
        }
    }

    componentDidMount() {
        axios
        .get('equipment')
        .then(res => this.setState({equipment: res.data.equipment, equipmentLoaded: true}))
        .catch(err => console.error(err))

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
                        <h1>Board member homepage</h1>
                        <div style={{display: 'inline-block', border: '2px solid'}}>
                            {
                                this.state.equipmentLoaded ? (
                                    this.state.equipment.map(function(item) {
                                        return (
                                        <div key={item.id}>
                                        <p>ID: {item.id}</p>
                                        <p>Name: {item.name}</p>
                                        <p>Description: {item.description}</p>
                                        <p>Working: {item.working}</p>
                                        <p>Damaged: {item.damaged}</p>
                                        <p>OrgID: {item.organizationId}</p>
                                        <p>Total: {item.working + item.damaged}</p>
                                        </div>
                                        )
                                    }))
                                : "Loading..."
                            }
                        </div>
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