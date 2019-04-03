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
<<<<<<< HEAD
      console.log(profName);
=======
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
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
<<<<<<< HEAD
      console.log(res.data.organizations);
=======
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
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

      } else {
        this.props.history.push("/createorg");
      }
    }

    onSubmit = async event => {
      if (this.state.creating) {
        this.props.history.push("/createorg")
      }
      event.preventDefault();

      console.log(this.state);

      // const tempResponse = await axios.post(`users/register`, this.state);
      //
      // console.log(tempResponse);

      this.props.shareState(this.state, this.callback);

      this.clearState();

    };

    render() {
       return (
       <div>
<<<<<<< HEAD
         <div className="avitar" style={this.state.img ? {backgroundImage: `url(${this.state.img})`, backgroundSize: 'cover', width: '100px', height: '100px', borderRadius: '50px'} : null }>
=======
         <div className="avatar" style={this.state.img ? {backgroundImage: `url(${this.state.img})`, backgroundSize: 'cover', width: '100px', height: '100px', borderRadius: '50px'} : null }>
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
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
<<<<<<< HEAD
            {this.state.role === "School administrator" ? <div>
            <input type="checkbox" name="createOrg" /> <span>Adding an organization?</span> </div> : null
            }
            <select required name="organizationName" onChange={this.change} value={this.state.organizationName}>
=======
            {!this.state.creating && <select required name="organizationName" onChange={this.change} value={this.state.organizationName}>
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
              <option hidden>organization...</option>
              {this.orgs.map(org => {
                return <option value={org.name}>{org.name}</option>
              })}
<<<<<<< HEAD
            </select>
=======
            </select>}
            {this.state.role === "School administrator" ? <div>
            <input type="checkbox" name="createOrg" onClick={this.toggleCreate} /> <span>Create new organization?</span> </div> : null
          }
>>>>>>> 96d5928d566d5f88f230157490147dd19660315c
          </div>
          <button>Submit</button>
        </form>
        <NavLink className='land-link' to="/">Back to home</NavLink>
        </div>

      )
    }

}
