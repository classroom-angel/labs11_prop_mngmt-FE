import React, { Component } from 'react';
import axios from '../axiosInstance';
import { Button, Modal } from 'react-materialize';
// import axiox as axios2 from 'axios';
// import useFormInput from './useFormInput';
import { NavLink } from 'react-router-dom';

const roles = ['Board member', 'Teacher', 'School administrator'];

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      role: '',
      organizationName: '',
      img: '',
      creating: false
    };
    this.orgs = [];
  }

  componentWillMount() {
    const userProfile = JSON.parse(localStorage.getItem('profile'));
    const profName = userProfile.name.split(' ');
    const email = userProfile.email;
    if (profName) {
      let firstName = profName[0];
      let lastName = profName[1];
      let img = userProfile.picture;
      this.setState({
        firstName,
        lastName,
        img
      });
    }
    if (email) {
      this.setState({
        username: email
      });
    }
  }

  componentDidMount() {
    const prof = JSON.parse(localStorage.getItem('profile'));
    if (prof.orgId) {
      this.props.history.push('/');
    }
    axios
      .get('organizations')
      .then(res => {
        this.orgs = res.data.organizations;
      })
      .catch(err => {
        console.log(err);
      });
  }

  clearState = () => {
    this.setState({
      username: '',
      firstName: '',
      lastName: '',
      role: '',
      organizationName: '',
      creating: false
    });
  };

  goHome = () => {
    this.props.history.push('/');
  };

  change = e => {
    if (
      e.currentTarget.name === 'role' &&
      e.currentTarget.value !== 'School administrator'
    ) {
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value,
        creating: false
      });
    } else {
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value
      });
    }
  };

  toggleCreate = e => {
    this.setState(prevState => ({
      ...prevState,
      creating: !prevState.creating
    }));
  };

  callback = async ste => {
    if (ste.organizationName !== '') {
      const tempResponse = await axios.post(`users/register`, ste);

      // console.log('tempResponse', tempResponse);
      let prof = JSON.parse(localStorage.getItem('profile'));
      prof.orgId = tempResponse.data.user.organizationId;
      localStorage.setItem('profile', JSON.stringify(prof));

      this.props.history.push('/authload');
    } else if (this.state.creating) {
      this.props.history.push('/createorg');
    } else {
      this.props.history.push('/signup');
    }
  };

  onSubmit = async event => {
    event.preventDefault();
    if (
      this.state.username !== '' &&
      this.state.firstName !== '' &&
      this.state.lastName !== '' &&
      this.state.role !== ''
    ) {
      const ste = {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: this.state.role,
        organizationName: this.state.organizationName
      };
      this.props.shareState(ste, this.callback);
      this.clearState();
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="container">
        <div
          className="avatar"
          style={
            this.state.img
              ? {
                  backgroundImage: `url(${this.state.img})`,
                  backgroundSize: 'cover',
                  width: '150px',
                  height: '150px',
                  borderRadius: '75px',
                  margin: '40px auto 0'
                }
              : null
          }
        />
        <h3>
          Welcome, <b>{this.state.firstName}</b>, please tell us a little more
          about yourself...
        </h3>
        <form
          className="col s12 z-depth-4"
          style={{ padding: '20px' }}
        >
          <div className="col s12 l6">
            <div className="input-field">
              <label htmlFor="username">
                Email Address
              </label>
              <input
                id="username"
                required
                name="username"
                value={this.state.username}
                type="email"
                onChange={this.change}
                className="validate"
              />
            </div>
            <div className="input-field">
              <label htmlFor="first_name">
                First Name
              </label>
              <input
                id="first_name"
                required
                name="firstName"
                value={this.state.firstName}
                type="text"
                onChange={this.change}
                className="validate"
              />
            </div>
            <div className="input-field">
              <label htmlFor="last_name">
                Last Name
              </label>
              <input
                id="last_name"
                required
                name="lastName"
                value={this.state.lastName}
                type="text"
                onChange={this.change}
                className="validate"
              />
            </div>
          </div>
          <form className="col s12 l3 left-align">
            <p>
              <b>Role...</b>
            </p>
            {roles.map(role => {
              return (
                <p>
                  <label>
                    <input
                      name="role"
                      type="radio"
                      value={role}
                      onClick={this.change}
                    />
                    <span>{role}</span>
                  </label>
                </p>
              );
            })}
          </form>
          <form className="col s12 l3 left-align">
            {!this.state.creating && (
              <div>
                <p>
                  <b>Organization...</b>
                </p>
                {this.orgs.map(org => {
                  return (
                    <p>
                      <label>
                        <input
                          name="organizationName"
                          type="radio"
                          value={org.name}
                          onClick={this.change}
                        />
                        <span>{org.name}</span>
                      </label>
                    </p>
                  );
                })}
              </div>
            )}
          </form>
          {this.state.role === 'School administrator' && (
            <div className="input-field col s12 l3">
              <label className="white-text">
                <input
                  id="create"
                  className="validate"
                  type="checkbox"
                  name="createOrg"
                  onClick={this.toggleCreate}
                />
                <span>Create new organization?</span>
              </label>
              <br />
              <br className="hide-on-large-and-up" />
            </div>
          )}
        </form>
        <Button
          className="cyan darken-2"
          waves="light"
          type="submit"
          style={{ marginTop: '20px', marginRight: '10px' }}
          onClick={this.onSubmit}
        >
          Submit
          <i class="material-icons right">send</i>
        </Button>
        <NavLink
          style={{ marginTop: '20px' }}
          className="cyan darken-2 btn"
          to="/"
        >
          Back to home
        </NavLink>
      </div>
    );
  }
}
