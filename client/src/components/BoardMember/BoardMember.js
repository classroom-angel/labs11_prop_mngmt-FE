import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
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

        // axios
        // .get('attendance')
        // .then(res => this.setState({attendance: res.data.attendance, attendanceLoaded: true}))
        // .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="page-container">
                    <Sidebar/>
                    <div className="right-side">
                    <h1 style={{textAlign: 'left'}}>School Name Here</h1>
                        <div className="bm-issues" style={{display: 'inline-block', margin: '20px 5%', width: '45%', border: '5px solid firebrick', borderRadius: '10px'}}>
                        <h2 style={{textAlign:'left'}}>Issue Log</h2>
                        <div style={{overflow: 'scroll', height: '500px'}}>
                        {
                                this.state.issuesLoaded ? (
                                    this.state.issues.map(function(issue) {
                                        return (
                                        <p key={issue.id}><span style={{margin:'2px 10px'}}> {issue.name}</span><span style={{margin:'2px 10px'}}>{issue.date}</span><span style={{margin:'2px 10px'}}>{issue.status.toUpperCase()}</span></p>
                                        )
                                    }))
                                : "Loading..."
                            }
                            </div>
                        </div>
                        <div className="bm-devices" style={{display: 'inline-block', border: '2px solid', height: '500px'}}>
                        <div className="dev-condiiton">
                        <p>Equipment Open Issue Working Total</p>
                            {
                                this.state.equipmentLoaded ? (
                                    this.state.equipment.map(function(item) {
                                        return (
                                        <div key={item.id}>
                                        <p>{item.id} {item.name} {item.working} {item.damaged} {item.working + item.damaged}</p>
                                        {/* <p>OrgID: {item.organizationId}</p> */}
                                        </div>
                                        )
                                    }))
                                : "Loading..."
                            }
                        </div>
                        <div className="dev-description" style={{display: 'inline-block', border: '2px solid'}}>
                           {
                               this.state.equipmentLoaded ? (
                                   this.state.equipment.map(function(item) {
                                       return (
                                           <div>
                                                <p>{item.name}</p>
                                                <p>Description: {item.description}</p>
                                           </div>
                                           
                                       )
                                   })
                               ): "Loading...."
                                }
                        </div>
                        </div>
                        
                    </div>
            </div>
        )

    }
}

 /* {
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
                            } */