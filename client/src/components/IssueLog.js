import React from 'react'
import Sidebar from './Sidebar';
import '../App.css'
import '../axiosInstance'

function IssueLog(props) {
    if (props.issuesLoaded) {
        console.log(props.issues)
        return (
            <div className="page-container">
                <Sidebar />
                <div>
                    <h1 style={{textAlign: 'center', border: '2px solid gray'}}>Issue Log</h1>
                    <ul>
                        {props.issues.map(issue => {
                            return (
                                <div key={issue.id}>
                                  <h1>Name: {issue.name}</h1>
                                  <h2>Notes: {issue.notes}</h2>
                                  <h3>Status: {issue.status}</h3>
                                  <h4>Date: {issue.date}</h4>
                                  <h5>Org. Id: {issue.organization_id}</h5>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                
            </div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
    
}

export default IssueLog
