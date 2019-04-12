import React, { Component } from 'react';

export default class AuthLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.auth.isAuth()) {
      this.props.history.push('/');
    } else {
      this.props.auth.handleAuth();
    }
  }

  render() {
    const loading = 'Loading :) ...';
    return (
      <div>
        <h1>{loading}</h1>
      </div>
    );
  }
}
