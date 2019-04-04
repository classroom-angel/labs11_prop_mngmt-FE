import React from 'react'
import Connect from './Connect';
import Sidebar from './Sidebar/Sidebar';
import Checkout from './Checkout';
import axios from 'axios';
import '../App.css'

class Payments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      accountId: ""
    }
  }

  componentDidMount = () => {
    let code = this.getCredentials();

    let sendObj = {
      client_secret: process.env.REACT_APP_STRIPE_DEV_KEY,
      code: code,
      grant_type: "authorization"
    }

    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    }

    if (code) {
      axios.post('https://connect.stripe.com/oauth/token', sendObj, headers)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: [e.target.value]})
  }

  getCredentials = () => {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });

    const code = vars["code"];
    console.log(code);
    return code;
  }

  render() {
    
    return (
        <div className="page-container">
          <Sidebar />
            <div className="checkout right-side">

            <h1>Upgrade Account</h1>
            <Checkout
              name={'10+ Teachers'}
              description={'Subscribe to get more teachers'}
              amount={29.99}
           />
          <h1>Pay a contractor</h1>
          <p>Step 1: Send this link to your contractor via email to get them connected to our platform (needs to happen only once):</p>
          <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_EotNW2K6Nn9nRDf9grdRR6gBaySaVZ3d&scope=read_write">https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_EotNW2K6Nn9nRDf9grdRR6gBaySaVZ3d&scope=read_write</a>
           <p>Step 2: Fill out this form with the amount you're sending and the contractor's Stripe account number (starts with 'acct_').</p>
           <form>
            <input name="amount" placeholder="Amount to send" value={this.state.amount} onChange={this.handleChange}/>
            <input name="accountId" placeholder="Contractor's Stripe Account ID" value={this.state.accountId} onChange={this.handleChange}/>
           </form>
            <p>Step 3: Pay</p>
           <Connect
            name="Pay a contractor"
            description=""
            amount={Number(this.state.amount)}
            stripeAccount={this.state.accountId}
           />
        </div>
     </div>
    );

}
}

export default Payments;
