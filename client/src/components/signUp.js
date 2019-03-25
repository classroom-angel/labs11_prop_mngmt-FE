import React, { Component } from 'react';
import axios from '../axiosInstance';
import useFormInput from './useFormInput';
import { NavLink } from 'react-router-dom'

const roles = [
  "Board member",
  "Teacher",
  "School administrator"
]

export default class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "",
        organizationName: ""
      }
    }

    clearState = () => {
      this.setState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "",
        organizationName: ""
      })
    }

    change = (e) => {
      console.log(e.currentTarget.value);
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value
      });
    }

    onSubmit = async event => {
      event.preventDefault();

      const tempResponse = await axios.post(`users/register`, this.state);

      console.log(tempResponse);

      this.clearState();
    };

    render() {
      return (
        <div>
        <h1>signUp page</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <input name="username" value={this.state.username} type="email" placeholder="Email or Phone" onChange={this.change} />
            <input name="firstName" value={this.state.firstName} type="text" placeholder="First Name..." onChange={this.change} />
            <input name="lastName" value={this.state.lastName} type="text" placeholder="Last Name..." onChange={this.change} />
            <select name="role" onChange={this.change} value={this.state.role}>
              <option selected="true">role...</option>
              {roles.map(role => {
                return <option value={role}>{role}</option>
              })}
            </select>
            <input name="password" value={this.state.password} type="password" placeholder="Password..." onChange={this.change} />
            
            {/* <input name="organizationName" value={this.state.organizationName} type="text" placeholder="Organization" onChange={this.change}/> */}
          </div>
          <button>Submit</button>
        </form>
        <NavLink className='land-link' to="/">Back to home</NavLink>
        </div>

      )
    }

}
