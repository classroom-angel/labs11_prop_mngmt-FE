import React from 'react';
import axios from './axiosInstance';
// import useFormInput from './components/useFormInput';
// import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import OnBoard from './components/OnBoard';
import SignUp from './components/SignUp';
import Home from './components/Home/Home';
import JoinOrg from './components/JoinOrg';
import BoardMemberHub from './components/BoardMember/BoardMember'
import IssueLog from './components/Issues/IssueLog';
import ViewIssue from './components/Issues/ViewIssue';
import Scheduled from './components/Scheduled';
import CreateEventForm from './components/CreateEventForm';
import EditEventForm from './components/EditEventForm';
import Visits from './components/Visits';
import Payments from './components/Payments';
import Auth from './Auth/auth';
import AuthLoad from './components/AuthLoad';
import CreateOrg from './components/CreateOrg';


class App extends React.Component {
  constructor(props) {
    super(props)
    // When we're ready we can delete these extra state values
    this.state = {
      solutions: [],
      solutionsLoaded: false,
      orgID: 1,
      solutionEditId: 1
    }

    this.auth = new Auth(props);
  }

  componentDidMount() {
    axios.get('solutions').then(res => this.setState({solutions: res.data.solutions, solutionsLoaded: true})).catch(err => console.log(err))
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  shareState = async (ste, cb) => {
    this.setState((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        ste
      }
    }));

    cb(ste);

  }


  updateSolutionEditId = (id) => {
    this.setState({solutionEditId: id})
  }

  shareState = async (ste, cb) => {
    this.setState((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        ste
      }
    }));

    cb(ste);

  }



  render(){
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile == null) {
      profile = {
        name: ""
      }
    }
    console.log("env", process.env)
    return (
      
      <div className="App">
        <Route exact path='/' render={(props) => <Home {...props} auth={this.auth} profile={profile} />} />
        <Route exact path='/signup' render={(props) => <SignUp {...props} auth={this.auth} shareState={this.shareState} />} />
        <Route exact path='/createorg' render={(props) => <CreateOrg {...props} auth={this.auth} shareState={this.shareState} />} />
        <Route exact path='/authload' render={(props) => <AuthLoad {...props} auth={this.auth} />} />
        <Route exact path='/onboarding' render={(props) => <OnBoard {...props} auth={this.auth} />} />
        <Route exact path='/join-org' component={JoinOrg}/>
        <Route exact path='/bm-homepage' render={(props) => <BoardMemberHub {...props} auth={this.auth}/>}/>
        <Route exact path='/issue-log' render={(props) => <IssueLog {...props} auth={this.auth}/>}/>
        <Route exact path='/issue/:id' render={(props) => <ViewIssue {...props} auth={this.auth}/>}/>
        <Route exact path='/scheduled' render={(props) => <Scheduled {...props} solutions={this.state.solutions} solutionsLoaded={this.state.solutionsLoaded} update={this.updateSolutionEditId} auth={this.auth}/>}/>
        <Route exact path='/CreateEventForm' render={(props) => <CreateEventForm {...props} name={this.state.solution} date={this.state.date} time={this.state.time} organizationId={this.state.orgID} handleChange={this.handleInputChange} />}/>
        <Route exact path='/events/:id' render={(props) => <EditEventForm  solutionEditId={this.state.solutionEditId} {...props}/>} />
        <Route exact path='/visits' render={(props) => <Visits {...props} auth={this.auth}/>}/>
        <Route exact path='/payments' render={(props) => <Payments {...props} auth={this.auth}/>}/>
      </div>
    );
  }
}

export default App;
