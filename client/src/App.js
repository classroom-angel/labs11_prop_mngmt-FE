import React from 'react';
import axios from './axiosInstance';
// import useFormInput from './components/useFormInput';
// import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import onBoard from './components/OnBoard';
import SignUp from './components/SignUp';
import home from './components/Home';
import joinOrg from './components/JoinOrg';
import boardMemberHub from './components/BoardMember'
import IssueLog from './components/IssueLog';
import scheduled from './components/Scheduled';
import Visits from './components/Visits';
import Payments from './components/Payments';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      issuesLoaded: false
    }
  }

  componentDidMount() {
    axios.get('issues').then(res => this.setState({issues: res.data.issues, issuesLoaded: true})).catch(err => console.log(err))
  }

  render(){
    return (
      <div className="App">
        <Route exact path='/' component={home}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/onboarding' component={onBoard}/>
        <Route exact path='/join-org' component={joinOrg}/>
        <Route exact path='/bm-homepage' component={boardMemberHub}/>
        <Route exact path='/issue-log' render={(props) => <IssueLog {...props} issues={this.state.issues} issuesLoaded={this.state.issuesLoaded} />}/>
        <Route exact path='/scheduled' component={scheduled}/>
        {/* <Route exact path='/teacher-attendance'/> */}
        {/* <Route exact path='/admin-visits'/> */}
        <Route exact path='/visits' component={Visits}/>
        <Route exact path='/payments' component={Payments}/>
      </div>
    );
  }
}

export default App;
