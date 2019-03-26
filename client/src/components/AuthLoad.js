import React, { Component } from 'react';

export default class AuthLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.auth.login();
  }

  render() {
    return(
      <div>
        <h1>Loading :) ...</h1>
      </div>
    )
  }
}
