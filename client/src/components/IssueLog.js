import React from 'react'
import Sidebar from './Sidebar';
import '../App.css'
import '../axiosInstance'

function IssueLog(props) {
    if (props.issuesLoaded) {
        return (
            <div className="page-container">
                <Sidebar />
                <div style={{overflow: 'scroll'}}>
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
                    <form onSubmit={props.postIssues}>
                        <input name="issueName" value={props.issueName} placeholder="Issue Title" onChange={props.handleChange}/>
                        <input name="issueNotes" value={props.issueNotes} placeholder="Additional notes" onChange={props.handleChange}/>
                        {/* Need to come back and use select elements for the following line */}
                        <input name="issueStatus" value={props.issueStatus} placeholder="Status" onChange={props.handleChange}/> 
                        <input type="submit" />
                    </form>
                </div>
                
            </div>
        )
    } else {
        return (
            <div className="page-container">
                <Sidebar />
                <h1>Loading...</h1>
            </div>
            
        )
    }
    
}

export default IssueLog
