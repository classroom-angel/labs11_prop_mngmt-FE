import React from 'react'
import Sidebar from './Sidebar';
import '../App.css'
import axios from '../axiosInstance'
import {NavLink} from 'react-router-dom'

const statuses = [
    "Needs Attention",
    "Resolved",
    "Scheduled"
]
export default class IssueLog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            issues: [],
            issuesLoaded: false,
            issueName: "",
            issueNotes: "",
            issueStatus: "Needs Attention",
            orgID: 1,
            editingIssue: false,
            issue: null,
            tag: '',
            tags: [],
            modal: false
        }
        this.postIssues = this.postIssues.bind(this)
        this.deleteIssue = this.deleteIssue.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.fetchIssue = this.fetchIssue.bind(this)
    }

    componentDidMount() {
        axios.get('issues').then(res => this.setState({issues: res.data.issues, issuesLoaded: true})).catch(err => console.log(err))
        axios.get('tags').then(res => this.setState({tags: res.data.tags})).catch(err => console.log(err))
    }

    postIssues(event) {
        event.preventDefault()
        axios.post('issues', {name: this.state.issueName,
          notes: this.state.issueNotes,
        status: this.state.issueStatus,
        isVisit: false,
        organizationId: this.state.orgID,
        date: '03-25-20'
     })
       .then(res => {
           console.log(res)
           this.setState({issueName: "", issueNotes: "", issues: [...this.state.issues, res.data.issue]})
       })
       .catch(err => console.log(err))
    }

    deleteIssue(event) {
        axios.delete(`issues/${event.target.value}`)
        .then(res => {
            console.log(res.data.issue.id)
            var copy = this.state.issues.filter(function(element) {
                return element.id !== res.data.issue.id 
            })
            this.setState({issues: copy})
        })
        .catch(err => console.log(err))
      }

      handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
      }

      toggleEdit() {
        this.setState({
          editingIssue: !this.state.editingIssue,
          title: this.state.note.title,
          textBody: this.state.note.textBody
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
        console.log('2', this.state.tags)
    if (this.state.issuesLoaded) {
        return (
            <div className="page-container">
                <Sidebar />
                <div className="right-side">
                    <h1 style={{textAlign: 'center', border: '2px solid gray'}}>Issue Log</h1>
                    <ul>
                        {this.state.issues.map(issue => {
                            return (
                                <div key={issue.id} className="issue-card">
                                  <h1>Name: {issue.name}</h1>
                                  <h2>Notes: {issue.notes}</h2>
                                  <h3>Status: {issue.status}</h3>
                                  <h4>Date: {issue.date}</h4>
                                  <h5>Org. Id: {issue.organization_id}</h5>
                                  <ul>
                                      {this.state.tags.filter(function(tag) {
                                          return tag.id === issue.id
                                      }).map(function(tag) {
                                          return (
                                              <div>
                                                  {tag.name}
                                              </div>
                                          )
                                      })}
                                  </ul>
                                  <button onClick={this.deleteIssue} value={issue.id} sytle={{backgroundColor:'firebrick', color:'orange'}}>Delete Issue</button>
                                  <NavLink to={`/issue/${issue.id}`}><div value={issue.id} className="edit-issue-button">Update Issue</div></NavLink>
                                </div>
                            ) 
                        })}
                    </ul>
                    <form onSubmit={this.postIssues}>
                        <input name="issueName" value={this.state.issueName} placeholder="Issue Title" onChange={this.handleChange}/>
                        <input name="issueNotes" value={this.state.issueNotes} placeholder="Additional notes" onChange={this.handleChange}/>
                        <select name="role" onChange={this.change} value={this.state.role}>
                            <option>Status...</option>
                                {statuses.map((status, index) => {
                                  return <option key={index} value={status}>{status}</option>
                                })}
                        </select>
                        
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
}
