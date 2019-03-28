import React, { Component } from 'react';
import axios from '../axiosInstance';
// import axiox as axios2 from 'axios';
// import useFormInput from './useFormInput';
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
        role: "",
        organizationName: "",
        img: ""
      }
      this.orgs = []
    }

    componentWillMount() {
      const userProfile = JSON.parse(localStorage.getItem('profile'));
      const profName = userProfile.name.split(" ");
      console.log(profName);
      const email = userProfile.email;
      if (profName) {
        let firstName = profName[0];
        let lastName = profName[1];
        let img = userProfile.picture;
        this.setState({
          firstName, lastName, img
        });
      }
      if (email) {
        this.setState({
          username: email
      })
    }
  }

  componentDidMount() {
    axios.get('organizations').then(res => {
      console.log(res.data.organizations);
      this.orgs = res.data.organizations;
    }).catch(err => {
      console.log(err);
    })
  }

    clearState = () => {
      this.setState({
        username: "",
        firstName: "",
        lastName: "",
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

      console.log(this.state);

      const tempResponse = await axios.post(`users/register`, this.state);

      console.log(tempResponse);

      this.clearState();
    };

    render() {
       return (
       <div>
         <div className="avitar" style={this.state.img ? {backgroundImage: `url(${this.state.img})`, backgroundSize: 'cover', width: '100px', height: '100px', borderRadius: '50px'} : null }>
         </div>
        <h1>Welcome, {this.state.firstName} - please tell us a little more about yourself...</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <input required name="username" value={this.state.username} type="email" placeholder="Email or Phone" onChange={this.change} />
            <input required name="firstName" value={this.state.firstName} type="text" placeholder="First Name..." onChange={this.change} />
            <input required name="lastName" value={this.state.lastName} type="text" placeholder="Last Name..." onChange={this.change} />
            <select required name="role" onChange={this.change} value={this.state.role}>
              <option hidden>role...</option>
              {roles.map(role => {
                return <option value={role}>{role}</option>
              })}
            </select>
            {this.state.role === "School administrator" ? <div>
            <input type="checkbox" name="createOrg" /> <span>Adding an organization?</span> </div> : null
            }
            <select required name="organizationName" onChange={this.change} value={this.state.organizationName}>
              <option hidden>organization...</option>
              {this.orgs.map(org => {
                return <option value={org.name}>{org.name}</option>
              })}
            </select>
          </div>
          <button>Submit</button>
        </form>
        <NavLink className='land-link' to="/">Back to home</NavLink>
        </div>

      )
    }

}
