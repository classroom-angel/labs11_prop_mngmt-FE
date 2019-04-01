import React from 'react'
import Sidebar from '../Sidebar';
import '../../App.css'
import './IssueLog.css'
import axios from '../../axiosInstance'
import {NavLink} from 'react-router-dom'
// import moment from 'moment'

const statuses = [
    "Needs Attention",
    "Resolved",
    "Scheduled",
    "Ignored"
]

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '-' + dd + '-' + yyyy;
export default class IssueLog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            issues: [],
            issuesLoaded: false,
            issueName: "",
            issueNotes: "",
            issueStatus: "",
            orgID: 1,
            editingIssue: false,
            issue: null,
            tag: '',
            tags: [],
            modal: false,
            isVisit: false,
            comment: '',
            comments: [],
            showComments: false
        }
        this.postIssues = this.postIssues.bind(this)
        this.deleteIssue = this.deleteIssue.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.fetchIssue = this.fetchIssue.bind(this)
        this.visitChange = this.visitChange.bind(this)
        this.toggleShowComments = this.toggleShowComments.bind(this)
        this.submitComment = this.submitComment.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
    }

    componentDidMount() {
        axios.get('issues').then(res => this.setState({issues: res.data.issues, issuesLoaded: true})).catch(err => console.log(err))
        axios.get('tags').then(res => this.setState({tags: res.data.tags})).catch(err => console.log(err))
        axios.get('comments').then(res => this.setState({comments: res.data.comments})).catch(err => console.log(err))

    }

    postIssues(event) {
        event.preventDefault()
        axios.post('issues', {name: this.state.issueName,
          notes: this.state.issueNotes,
        status: this.state.issueStatus,
        isVisit: this.state.isVisit,
        organizationId: this.state.orgID,
        date: today 
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

    toggleShowComments() {
        this.setState({showComments: !this.state.showComments})
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

    handleTagEdit(id, event) {
        event.preventDefault()
        const newTag = {name: this.state.tag, issueId: id}
        axios.post(`tag`, newTag)
        .then(response => {
          console.log("axios response", response.data);
          this.setState({tags: response.data, tag:''})
        })
        .catch(err => {
          console.log("Tag Edit Error", err);
        })
      }

    visitChange(event) {
        this.setState({[event.target.name]: event.target.checked})
    }

    submitComment(event) {
        event.preventDefault()
        axios
        .post('comments', {
            content: this.state.comment,
            userId: 1,
            issueId: event.target[0].attributes[2].value
        })
        .then(res => {
            this.setState({comments: [...this.state.comments, res.data.comment], comment: ''})
        })
        .catch(err => console.error(err))
    }

    deleteComment(event) {
        axios
        .delete(`comments/${event.target.getAttribute('issue_id')}`)
        .then(res => {
            let copy = this.state.comments.slice().filter(function(comment) {
                return comment.id !== res.data.comment.id
            })
            this.setState({comments: copy})
        })
        .catch(err => console.error(err))
    }
    
    render() {
    if (this.state.issuesLoaded) {
        return (
            <div className="page-container">
                <Sidebar />
                <div className="right-side">
                    <h1 style={{textAlign: 'center', border: '2px solid gray'}}>Issue Log</h1>
                    <form onSubmit={this.postIssues}>
                        <input name="issueName" value={this.state.issueName} placeholder="Issue Title" onChange={this.handleChange}/>
                        <input name="issueNotes" value={this.state.issueNotes} placeholder="Additional notes" onChange={this.handleChange}/>
                        <input type="checkbox" id="isVisit" name="isVisit" value={true} onChange={this.visitChange}/>
                        <label for="isVisit">isVisit</label>
                        <select name="issueStatus" onChange={this.handleChange}>
                            <option value="">Status...</option>
                                {statuses.map((status, index) => {
                                  return <option key={index} value={status}>{status}</option>
                                })}
                        </select>
                        
                        <input type="submit" />
                    </form>
                    <div className="issue-list">
                        {this.state.issues.map(issue => {
                            return (
                                <div key={issue.id} className="issue-card">
                                  <p>Name: {issue.name}</p>
                                  <h2>Notes: {issue.notes}</h2>
                                  <h3>Status: {issue.status}</h3>
                                  <h4>Date: {issue.date}</h4>
                                  <h5>Org. Id: {issue.organizationId}</h5>
                                  <div>
                                      {this.state.tags.filter(function(tag) {
                                          return tag.issueId === issue.id
                                      }).map(function(tag) {
                                          return (
                                              <div key={tag.id} className="tag">
                                                  {tag.name}
                                              </div>
                                          )
                                      })}
                                  </div>
                                  <button onClick={this.deleteIssue} value={issue.id} sytle={{display: 'inline-block'}}>Delete Issue</button>
                                  <NavLink to={`/issue/${issue.id}`}><div value={issue.id} className="edit-issue-button">Update Issue</div></NavLink>
                                  <button onClick={this.toggleShowComments} value={issue.id} sytle={{display: 'inline-block'}}>Show Comments</button>
                                  {this.state.showComments ?
                                  <div>
                                  <div>
                                      {this.state.comments.filter(function(comment) {
                                          return comment.issueId === issue.id
                                      }).map((comment) => {
                                          return (
                                              
                                              <div key={comment.id}>
                                                  - {comment.content}<span className="delete-button" onClick={this.deleteComment} issue_id={comment.id}> x</span>
                                              </div>
                                          )
                                      })}
                                  </div>
                                  <form onSubmit={this.submitComment}>
                                      <input name='comment' placeholder='add comment' value={this.state.comment} issue_id={issue.id} onChange={this.handleChange} />
                                  </form>
                                  </div>: null}
                                </div>
                            ) 
                        })}
                    </div>
                </div>
                
            </div>
        )
    } else {
        return (
            <div className="page-container">
                <Sidebar />
                <div className="right-side">
                    <h1>Loading...</h1>
                </div>
                
            </div>
            
        )
    }
}
}
