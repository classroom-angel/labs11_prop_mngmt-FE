import React from 'react';
import axios from './axiosInstance';
// import useFormInput from './components/useFormInput';
// import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import OnBoard from './components/OnBoard';
import SignUp from './components/SignUp';
import Home from './components/Home';
import JoinOrg from './components/JoinOrg';
import BoardMemberHub from './components/BoardMember'
import IssueLog from './components/IssueLog';
import Scheduled from './components/Scheduled';
import Visits from './components/Visits';
import Payments from './components/Payments';
import Auth from './Auth/auth';
import AuthLoad from './components/AuthLoad';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      issuesLoaded: false,
      solutions: [],
      solutionsLoaded: false,
      issueName: "",
      issueNotes: "",
      issueStatus: "Needs Attention",
      orgID: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.postIssues = this.postIssues.bind(this)
    this.deleteIssue = this.deleteIssue.bind(this)
    this.auth = new Auth();
  }

  componentDidMount() {
    axios.get('issues').then(res => this.setState({issues: res.data.issues, issuesLoaded: true})).catch(err => console.log(err))
    axios.get('solutions').then(res => this.setState({solutions: res.data.solutions, solutionsLoaded: true})).catch(err => console.log(err))
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  postIssues(event) {
    console.log('posting...')
    event.preventDefault()
    axios.post('issues', {name: this.state.issueName,
      notes: this.state.issueNotes,
    status: this.state.issueStatus,
    isVisit: false,
    organizationId: this.state.orgID,
    date: '03-25-20'
 })
   .then(res => console.log(res))
   .catch(err => console.log(err))
   this.setState({issueName: "", issueNotes: ""})
}

  deleteIssue(event) {
    console.log('deleting...')
    console.log(event.target.value)
    // event.preventDefault()
    axios.delete(`issues/${event.target.value}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render(){
    // console.log(this.state)
    return (
      <div className="App">
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' render={(props) => <SignUp auth={this.auth} />} />
        <Route exact path='/authload' render={(props) => <AuthLoad auth={this.auth} />} />
        <Route exact path='/onboarding' component={OnBoard}/>
        <Route exact path='/join-org' component={JoinOrg}/>
        <Route exact path='/bm-homepage' component={BoardMemberHub}/>
        <Route exact path='/issue-log'
        render={(props) => <IssueLog {...props}
        issues={this.state.issues}
        issuesLoaded={this.state.issuesLoaded}
        handleChange={this.handleChange}
        issueStatus={this.state.issueStatus}
        postIssues={this.postIssues}
        deleteIssue={this.deleteIssue} />}/>
        <Route exact path='/scheduled' render={(props) => <Scheduled {...props} solutions={this.state.solutions} solutionsLoaded={this.state.solutionsLoaded} />}/>
        {/* <Route exact path='/teacher-attendance'/> */}
        {/* <Route exact path='/admin-visits'/> */}
        <Route exact path='/visits' component={Visits}/>
        <Route exact path='/payments' component={Payments}/>
      </div>
    );
  }
}

export default App;
