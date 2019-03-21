import React, { Component } from 'react';
// import axios from './axiosInstance';
// import useFormInput from './components/useFormInput';
// import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import onBoard from './components/onBoard';
import signUp from './components/signUp';
import home from './components/home';
import joinOrg from './components/joinOrg';
import boardMemberHub from './components/boardMember'
import issueLog from './components/issueLog';
import scheduled from './components/scheduled';
import Visits from './components/visits';
import Payments from './components/payments';

const App = props => {
  return (
    <div className="App">
      <Route exact path='/' component={home}/>
      <Route exact path='/signup' component={signUp}/>
      <Route exact path='/onboarding' component={onBoard}/>
      <Route exact path='/join-org' component={joinOrg}/>
      <Route exact path='/bm-homepage' component={boardMemberHub}/>
      <Route exact path='/issue-log' component={issueLog}/>
      <Route exact path='/scheduled' component={scheduled}/>
      {/* <Route exact path='/teacher-attendance'/> */}
      {/* <Route exact path='/admin-visits'/> */}
      <Route exact path='/visits' component={Visits}/>
      <Route exact path='/payments' component={Payments}/>
    </div>
  );
}

export default App;
