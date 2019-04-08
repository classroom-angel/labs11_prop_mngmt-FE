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
        img: "",
        creating: false
      }
      this.orgs = []
    }

    componentWillMount() {
      const userProfile = JSON.parse(localStorage.getItem('profile'));
      const profName = userProfile.name.split(" ");
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
      this.orgs = res.data.organizations
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
        organizationName: "",
        creating: false
      })
    }

    change = (e) => {
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value
      });
    };

    toggleCreate = (e) => {
      this.setState(prevState => ({
        ...prevState,
        creating: !prevState.creating
      }))
    }

    callback = async (ste) => {
      if (ste.organizationName !== "") {
        const tempResponse = await axios.post(`users/register`, ste);

        console.log(tempResponse);

        this.props.history.push("/authload");

      } else if (this.state.creating) {
        this.props.history.push("/createorg");
      } else {
        this.props.history.push("/signup")
      }
    }

    onSubmit = async event => {
      event.preventDefault();
      const ste = {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: this.state.role,
        organizationName: this.state.organizationName
      }
      this.props.shareState(ste, this.callback);
      this.clearState();

    };

    render() {
       return (
       <div>
         <div className="avatar" style={this.state.img ? {backgroundImage: `url(${this.state.img})`, backgroundSize: 'cover', width: '100px', height: '100px', borderRadius: '50px'} : null }>
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
            {!this.state.creating && <select required name="organizationName" onChange={this.change} value={this.state.organizationName}>
              <option hidden>organization...</option>
              {this.orgs.map(org => {
                return <option value={org.name}>{org.name}</option>
              })}
            </select>}
            {this.state.role === "School administrator" ? <div>
            <input type="checkbox" name="createOrg" onClick={this.toggleCreate} /> <span>Create new organization?</span> </div> : null
          }
          </div>
          <button>Submit</button>
        </form>
        <NavLink className='land-link' to="/">Back to home</NavLink>
        </div>

      )
    }

}
