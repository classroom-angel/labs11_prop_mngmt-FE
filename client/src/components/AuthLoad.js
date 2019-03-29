import React, { Component } from 'react';

export default class AuthLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    if (this.props.auth.isAuth()) {
      this.props.history.push("/")
    } else {
      this.props.auth.handleAuth();
    }
  }

  render() {
    return(
      <div>
        <h1>Loading :) ...</h1>
      </div>
    )
  }
}
