import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosInstance';
import { Modal, Button } from 'react-materialize';

export default class CreateOrg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: '',
      orgCity: '',
      orgCountry: ''
    };
  }

  change = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  goHome = () => {
    this.props.history.push('/')
  }

  submit = async e => {
    e.preventDefault();
    const org = await axios.post('/organizations', {
      name: this.state.orgName,
      city: this.state.orgCity,
      country: this.state.orgCountry,
      expectedHours: 0
    });
    console.log(org);
    this.props.shareState(
      {
        organizationName: org.data.organization.name,
        orgId: org.data.organization.id
      },
      ste => {
        this.setState({
          orgName: '',
          orgCity: '',
          orgCountry: ''
        });
        this.props.history.push('/authload');
      }
    );
  };

  render() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    return (
      <div>
      {profile.role !== "School administrator" && <Modal id='modal1' options={{dismissible: false, onCloseEnd: () => this.goHome()}} open actions={[<Button onClick={this.goHome}>Close</Button>]}>Sorry! You don't have access to this area :)</Modal>}
        <h1>Create an organization</h1>
        <p>
          Once you create a school, you can invite members, send notifications,
          and start conversations
        </p>
        <form onSubmit={this.submit}>
          <input
            required
            onChange={this.change}
            type="text"
            placeholder="Organization name..."
            name="orgName"
            value={this.state.orgName}
          />
          <input
            required
            onChange={this.change}
            type="text"
            placeholder="Organization city..."
            name="orgCity"
            value={this.state.orgCity}
          />
          <input
            required
            onChange={this.change}
            type="text"
            placeholder="Organization country"
            name="orgCountry"
            value={this.state.orgCountry}
          />
          <button type="submit">Create</button>
        </form>

        {/* JOIN ORGANIZATION */}
        <p>
          Looking for an organization?{' '}
          <Link to="/signup">Join an organization</Link>
        </p>
      </div>
    );
  }
}
