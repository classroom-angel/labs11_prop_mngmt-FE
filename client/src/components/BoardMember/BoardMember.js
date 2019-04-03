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
            issues: [],
            selected: 'ChromeBooks'
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
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div className="bm-issues" style={{display: 'inline-block', margin: '20px 1%', width: '35%', border: '5px solid firebrick', borderRadius: '10px'}}>
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
                        <div className="bm-devices" style={{display: 'inline-block', border: '5px dotted blue', borderRadius: '10px', height: '500px', width: '60%'}}>
                        <div className="dev-condiiton" style={{display:'flex'}}>
                        <div style={{border:"1px solid", textAlign:"center", width: "80px", overflow:"scroll"}}>
                            Equipment
                            {
                                this.state.equipmentLoaded ? (
                                    this.state.equipment.map(function(item) {
                                        return (
                                            <p>{item.name}</p>
                                        )
                                    })
                                ): "Loading..."
                                
                            }
                        </div>
                        <div style={{border:"1px solid", textAlign:"center", width: "80px", overflow:"scroll"}}>
                            Open Issues
                            {
                                this.state.equipmentLoaded ? (
                                    this.state.equipment.map(function(item) {
                                        return (
                                            <p>{item.damaged}</p>
                                        )
                                    })
                                ): "Loading..."
                                
                            }
                        </div>
                        <div style={{border:"1px solid", textAlign:"center", width: "80px", overflow:"scroll"}}>
                            Working
                            {
                                this.state.equipmentLoaded ? (
                                    this.state.equipment.map(function(item) {
                                        return (
                                            <p>{item.working}</p>
                                        )
                                    })
                                ): "Loading..."
                                
                            }
                        </div>
                        <div style={{border:"1px solid", textAlign:"center", width: "80px", overflow:"scroll"}}>
                            Total
                            {
                                this.state.equipmentLoaded ? (
                                    this.state.equipment.map(function(item) {
                                        return (
                                            <p>{item.working + item.damaged}</p>
                                        )
                                    })
                                ): "Loading..."
                                
                            }
                        </div>
                        <div className="dev-description" style={{display: 'inline-block', border: '2px solid', overflow:"scroll"}}>
                            {this.state.selected}
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