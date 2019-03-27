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
                issue: null,
                nameEdits: '',
                noteEdits: '',
                tag: '',
                tags: [],
                modal: false
            }
            this.toggleEdit = this.toggleEdit.bind(this)
            this.fetchIssue = this.fetchIssue.bind(this)
            this.handleChange = this.handleChange.bind(this)
            this.handleEdit = this.handleEdit.bind(this)
            this.handleTagEdit = this.handleTagEdit.bind(this)
            this.handleTagSubmit = this.handleTagSubmit.bind(this)
        }

        componentDidMount() {
            this.fetchIssue(this.props.match.params.id)
            axios.get('tags').then(res => this.setState({tags: res.data.tags})).catch(err => console.log(err))
        }

        handleChange(event) {
            this.setState({[event.target.name]: event.target.value})
        }
    

        toggleEdit() {
            this.setState({
              editingIssue: !this.state.editingIssue,
              nameEdits: this.state.issue.name,
              noteEdits: this.state.issue.notes
            })
        }
    
        fetchIssue(id) {
            axios.get(`issues/${id}`)
            .then(res => {
                this.setState({issue: res.data.issue})
            })
            .catch(err => {
                console.log(err)
            })
        }

        handleEdit(id) {
            const newEdits = {};
            // if (this.state.tag.length > 0){
            //   newEdits.tags = this.state.note.tags;
            //   newEdits.tags.push(this.state.tag);
            // }
            if (this.state.nameEdits.length > 0) newEdits.name = this.state.nameEdits;
            if (this.state.noteEdits.length > 0) newEdits.notes = this.state.noteEdits;
            newEdits.status = "Needs Attention" // NEed to make this dynamic
            axios.put(`issues/${id}`, newEdits)
            .then(response => {
              console.log(response.data);
              this.setState({issue: response.data.issue, editingIssue: false});
            })
            .catch(err => {
              console.log('Edit Error:', err);
        })
    }

    handleTagEdit(id) {
        const newTag = {name: this.state.tag, issueId: id}
        axios.post(`tags`, newTag)
        .then(response => {
          console.log("axios response", response.data);
          this.setState({tags: [...this.state.tags, response.data.tag], tag:''})
        })
        .catch(err => {
          console.log("Tag Edit Error", err);
        })
      }

      handleTagSubmit(e) {
        e.preventDefault();
        this.handleTagEdit(this.state.issue.id);
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
                      <h1>Name: {this.state.editingIssue ? <input name ="nameEdits" className="issue-input" value={this.state.nameEdits} onChange={this.handleChange}/>: this.state.issue.name}</h1>
                      <h2>Notes: {this.state.editingIssue ? <input name ="noteEdits" className="issue-input" value={this.state.noteEdits} onChange={this.handleChange}/>: this.state.issue.notes}</h2>
                      <h3>Status: {this.state.issue.status}</h3>
                      <h4>Date: {this.state.issue.date}</h4>
                      <h5>Org. Id: {this.state.issue.organization_id}</h5>
                      <div>
                            {this.state.tags.filter((tag) => {
                                return tag.issueId === this.state.issue.id
                            }).map(function(tag) {
                                return (
                                    <div key={tag.id} className="tag">
                                        {tag.name}
                                    </div>
                                )
                            })}
                            <form className="tagForm" onSubmit={this.handleTagSubmit}>
                              <input className="mainInput" type="text" placeholder="add tag" name="tag" onChange={this.handleChange} value={this.state.tag} />
                            </form>
                        </div>
                      <button onClick={this.deleteIssue} value={this.state.issue.id} sytle={{backgroundColor:'firebrick', color:'orange'}}>Delete Issue</button>
                      <button onClick={this.toggleEdit} value={this.state.issue.id} sytle={{backgroundColor:'firebrick', color:'orange'}}>Edit Issue</button>
                      {this.state.editingIssue ? <button onClick={() => {this.handleEdit(this.props.match.params.id)}} className="view-issue-button">Save</button> : null}
                      <NavLink to='/issue-log'>Back to Issues</NavLink>
                    </div>
                    </div> : "Loading..."}
    
                </div>
            </div>

        )
    }
}

export default ViewIssue