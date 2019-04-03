import React from 'react'
<<<<<<< HEAD
import Sidebar from '../Sidebar'
=======
import Sidebar from '../Sidebar/Sidebar'
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
import '../../App.css'
// import './BoardMember.css'
import axios from '../../axiosInstance'

export default class BoardMemberHub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            equipment: [],
            equipmentLoaded: false,
            attendance: [],
            attendanceLoaded: false,
            issuesLoaded: false,
            issues: []
        }
    }

    componentDidMount() {
        axios
        .get('equipment')
        .then(res => this.setState({equipment: res.data.equipment, equipmentLoaded: true}))
        .catch(err => console.error(err))

        axios
        .get('issues')
        .then(res => this.setState({issues: res.data.issues, issuesLoaded: true}))
        .catch(err => console.error(err))

        axios
        .get('attendance')
        .then(res => this.setState({attendance: res.data.attendance, attendanceLoaded: true}))
        .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="page-container grid-container">
                    <Sidebar/>
                    <div className="right-side grid-container">
                        <div className="item-1" style={{display: 'inline-block', border: '2px solid'}}>
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
                        <div className="item-2" style={{display: 'inline-block', border: '2px solid'}}>
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
                        <div className="item-3" style={{display: 'inline-block', border: '2px solid'}}>
                            {
                                this.state.issuesLoaded ? (
                                    this.state.issues.map(function(issue) {
                                        return (
                                        <div key={issue.id}>
                                        <p>ID: {issue.id}</p>
                                        <p>name: {issue.name}</p>
                                        <p>Date: {issue.date}</p>
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