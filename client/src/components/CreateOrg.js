import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosInstance';
import { Modal, Button, Input, Row, Col, Icon } from 'react-materialize';

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
      {profile.role !== "School administrator" && <Modal id='modal1' open actions={[<Button className="cyan darken-2"
      waves="light" onClick={this.goHome}>Close</Button>]}>Sorry! You don't have access to this area :)</Modal>}
        <h1>Create an organization</h1>
        <p>
          Once you create a school, you can invite members, send notifications,
          and start conversations
        </p>
        <Row>
          <form className="col s10 red lighten-3 offset-s1 z-depth-4" onSubmit={this.submit} style={{padding: '20px', marginBottom: '20px'}}>
            <Col s={12} l={8} className="input-field offset-l2">
              <label className="white-text" htmlFor="orgName">Organization Name</label>
              <input
                id="orgName"
                required
                name="orgName"
                value={this.state.orgName}
                type="text"
                onChange={this.change}
                className="validate"
              />
            </Col>
            <Col s={12} l={8} className="input-field offset-l2">
            <label className="white-text" htmlFor="orgCity">Organization City</label>
            <input
              id="orgCity"
              required
              name="orgCity"
              value={this.state.orgCity}
              type="text"
              onChange={this.change}
              className="validate"
            />
            </Col>
            <Col s={12} l={8} className="input-field offset-l2">
              <label className="white-text" htmlFor="orgCountry">Organization Country</label>
              <input
                id="orgCountry"
                required
                name="orgCountry"
                value={this.state.orgCountry}
                type="text"
                onChange={this.change}
                className="validate"
              />
            </Col>
          </form>
          <Button
          style={{margin: '10px'}}
          type="submit"
          waves="light">
            Create Organization
            <Icon right>
            send
            </Icon>
          </Button>
        </Row>

        {/* JOIN ORGANIZATION */}
        <p>
          Looking for an organization?{' '}
          <Link to="/signup">Join an existing organization</Link>
        </p>
      </div>
    );
  }
}
