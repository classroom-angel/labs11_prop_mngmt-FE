import React from 'react'
import Sidebar from './Sidebar';
import '../App.css'
import axios from '../axiosInstance'
import {NavLink} from 'react-router-dom'

class ViewIssue extends React.Component {
    constructor(props) {
        super(props) 
            this.state = {
                issuesLoaded: false,
                issueName: "",
                issueNotes: "",
                issueStatus: "Needs Attention",
                orgID: 1,
                editingIssue: false,
                issue: null
            }
            this.toggleEdit = this.toggleEdit.bind(this)
            this.fetchIssue = this.fetchIssue.bind(this)
        }

        componentDidMount() {
            console.log(this.props.match.params.id)
            this.fetchIssue(this.props.match.params.id)
        }
    

        toggleEdit() {
            this.setState({
              editingIssue: !this.state.editingIssue,
              title: this.state.issue.name,
              textBody: this.state.issue.notes
            })
        }
    
        fetchIssue(id) {
            axios.get(`issues/${id}`)
            .then(res => {
                console.log('fetched note', res.data)
                this.setState({issue: res.data.issue})
            })
            .catch(err => {
                console.log(err)
            })
        }

    render() {
        return (
            <div className="page-container">
                <Sidebar />
                <div className="right-side">
                {this.state.issue ?
                    <div> 
                    <h1 style={{textAlign: 'center', border: '2px solid gray'}}>Issue</h1>
                    <div key={this.state.issue.id}>
                      <h1>Name: {this.state.issue.name}</h1>
                      <h2>Notes: {this.state.issue.notes}</h2>
                      <h3>Status: {this.state.issue.status}</h3>
                      <h4>Date: {this.state.issue.date}</h4>
                      <h5>Org. Id: {this.state.issue.organization_id}</h5>
                      <button onClick={this.deleteIssue} value={this.state.issue.id} sytle={{backgroundColor:'firebrick', color:'orange'}}>Delete Issue</button>
                      <button onClick={this.deleteIssue} value={this.state.issue.id} sytle={{backgroundColor:'firebrick', color:'orange'}}>Edit Issue</button>
                      <NavLink to='/issue-log'>Back to Issues</NavLink>
                    </div>
                    </div> : "Loading..."}
    
                </div>
            </div>

        )
    }
}

export default ViewIssue