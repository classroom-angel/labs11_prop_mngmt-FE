import React from 'react'
import Sidebar from './Sidebar';
import '../App.css'
import axios from '../axiosInstance'

export default class Visits extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visits: [],
            visitsLoaded: false,
            visitName: "",
            visitNotes: "",
            visitStatus: "Needs Attention",
            orgID: 1,
            editingVisit: false,
            visit: null 
        }
        this.postVisits = this.postVisits.bind(this)
        this.deleteVisit = this.deleteVisit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.fetchVisit = this.fetchVisit.bind(this)
    }

    componentDidMount() {
        axios.get('visits').then(res => this.setState({visits: res.data.visits, visitsLoaded: true})).catch(err => console.log(err))
    }

    postVisits(event) {
        console.log('posting...')
        event.preventDefault()
        axios.post('visits', {name: this.state.visitName,
          notes: this.state.visitNotes,
        status: this.state.visitStatus,
        isVisit: false,
        organizationId: this.state.orgID,
        date: '03-25-20'
     })
       .then(res => {
           console.log(res)
           this.setState({visitName: "", visitNotes: "", visits: [...this.state.visits, res.data.visit]})
       })
       .catch(err => console.log(err))
    }

    deleteVisit(event) {
        axios.delete(`visits/${event.target.value}`)
        .then(res => {
            console.log(res.data.visit.id)
            var copy = this.state.visits.filter(function(element) {
                return element.id !== res.data.visit.id 
            })
            this.setState({visits: copy})
        })
        .catch(err => console.log(err))
      }

      handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
      }

      toggleEdit() {
        this.setState({
          editingVisit: !this.state.editingVisit,
          title: this.state.note.title,
          textBody: this.state.note.textBody
        })
    }

    fetchVisit(id) {
        axios.get(`visits/${id}`)
        .then(res => {
            console.log('fetched note', res.data)
            this.setState({visit: res.data.visit})
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    render() {
    if (this.state.visitsLoaded) {
        return (
            <div className="page-container">
                <Sidebar />
                <div className="right-side">
                    <h1 style={{textAlign: 'center', border: '2px solid gray'}}>Visits</h1>
                    <ul>
                        {this.state.visits.map(visit => {
                            return (
                                <div key={visit.id}>
                                  <h1>Name: {visit.name}</h1>
                                  <h2>Notes: {visit.notes}</h2>
                                  <h3>Status: {visit.status}</h3>
                                  <h4>Date: {visit.date}</h4>
                                  <h5>Org. Id: {visit.organization_id}</h5>
                                  <button onClick={this.deleteVisit} value={visit.id} sytle={{backgroundColor:'firebrick', color:'orange'}}>Delete Visit</button>
                                  <button onClick={this.deleteVisit} value={visit.id} sytle={{backgroundColor:'firebrick', color:'orange'}}>Delete Visit</button>
                                </div>
                            )
                        })}
                    </ul>
                    <form onSubmit={this.postVisits}>
                        <input name="visitName" value={this.state.visitName} placeholder="Visit Title" onChange={this.handleChange}/>
                        <input name="visitNotes" value={this.state.visitNotes} placeholder="Additional notes" onChange={this.handleChange}/>
                        {/* Need to come back and use select elements for the following line */}
                        <input name="visitStatus" value={this.state.visitStatus} placeholder="Status" onChange={this.handleChange}/> 
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
