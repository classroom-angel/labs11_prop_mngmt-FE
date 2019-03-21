import React, { Component } from 'react';
import axios from './axiosInstance';
import useFormInput from './components/useFormInput';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';

const App = props => {
  const inputs = [
    useFormInput('Username'),
    useFormInput('First name'),
    useFormInput('Last name'),
    useFormInput('Password')
  ];

  const onSubmit = async event => {
    event.preventDefault();

    const tempResponse = await axios.post(`users/register`);

    console.log(tempResponse);

    inputs.forEach(input => {
      input.value = '';
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={onSubmit}>
          <>
            {
              inputs.map(input => (
                <input {...input} />
              ))
            }
          </>
          <button>Submit</button>
        </form>
      </header>
      
      <Route exact path='/'/>
      <Route exact path='/onboarding'/>
      <Route exact path='/join-org'/>
      <Route exact path='/bm-homepage'/>
      <Route exact path='/issue-log'/>
      <Route exact path='/scheduled-issues'/>
      <Route exact path='/teacher-attendance'/>
      <Route exact path='/admin-visits'/>
      <Route exact path='/payments'/>

    </div>
  );
}

export default App;
