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
    // When we're ready we can delete these extra state values
    this.state = {
      solutions: [],
      solutionsLoaded: false,
      orgID: 1
    }

    this.auth = new Auth(props);
  }

  componentDidMount() {
    axios.get('solutions').then(res => this.setState({solutions: res.data.solutions, solutionsLoaded: true})).catch(err => console.log(err))
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }


  render(){
    return (
      <div className="App">
        <Route exact path='/' render={(props) => <Home {...props} auth={this.auth} />} />
        <Route exact path='/signup' render={(props) => <SignUp {...props} auth={this.auth} />} />
        <Route exact path='/authload' render={(props) => <AuthLoad {...props} auth={this.auth} />} />
        <Route exact path='/onboarding' render={(props) => <OnBoard {...props} auth={this.auth} />} />
        <Route exact path='/join-org' component={JoinOrg}/>
        <Route exact path='/bm-homepage' component={BoardMemberHub}/>
        <Route exact path='/issue-log' component={IssueLog}/>
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
