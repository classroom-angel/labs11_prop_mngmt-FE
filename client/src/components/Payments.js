import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Checkout, { subscribe, connect } from './Checkout';
import axios from '../axiosInstance';
import '../App.css';

class Payments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      accountId: ''
    };
  }

  componentDidMount = () => {
    this.getCredentials();
    const { history } = this.props;
    history.push('/');
    history.push('/payments');
    let code = localStorage.getItem('code');
    let sendObj = {
      code
    };

    if (code) {
      axios
        .post('/payment/connect', sendObj)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  getCredentials = () => {
    let vars = {};
    let parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value;
      }
    );

    const code = vars['code'];
    console.log(code);
    localStorage.setItem('code', code);
    return code;
  };

  fromDollarToCent = amount => amount * 100;

  render() {
    return (
      <div className="page-container">
        <Sidebar />
        <div className="checkout right-side">
          <h1>Upgrade Account</h1>
          <Checkout
            name={'10+ Teachers'}
            description={'Subscribe to get more teachers'}
            amount={this.fromDollarToCent(29.99)}
            sendToken={subscribe}
          />
          <h1>Pay a contractor</h1>
          <p>
            Step 1: Send this link to your contractor via email to get them
            connected to our platform (needs to happen only once):
          </p>
          <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_EotNW2K6Nn9nRDf9grdRR6gBaySaVZ3d&scope=read_write">
            https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_EotNW2K6Nn9nRDf9grdRR6gBaySaVZ3d&scope=read_write
          </a>
          <p>
            Step 2: Fill out this form with the amount you're sending and the
            contractor's Stripe account number - it starts with 'acct_'.
          </p>
          <form>
            <input
              name="amount"
              placeholder="Amount to send"
              value={this.state.amount}
              onChange={this.handleChange}
              className="paymentsInput"
            />
            <input
              name="accountId"
              placeholder="Contractor's Stripe Account ID"
              value={this.state.accountId}
              onChange={this.handleChange}
              className="paymentsInput"
            />
          </form>
          <p>Step 3: Pay</p>
          <Checkout
            name="Pay a contractor"
            description=""
            amount={this.fromDollarToCent(Number(this.state.amount))}
            stripeAccount={this.state.accountId}
            sendToken={connect}
          />
        </div>
      </div>
    );
  }
}

export default Payments;
