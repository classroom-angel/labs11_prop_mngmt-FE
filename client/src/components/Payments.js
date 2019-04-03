import React from 'react'
import Sidebar from './Sidebar';
import Checkout from './Checkout';
import Connect from './Connect';
import Sidebar from './Sidebar/Sidebar';
import Checkout from './Checkout';

import '../App.css'

class Payments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      accountId: ""
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: [e.target.value]})
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
           <form>
            <input name="amount" placeholder="Amount to send" value={this.state.amount} onChange={this.handleChange}/>
            <input name="accountId" placeholder="Contractor's Stripe Account ID" value={this.state.accountId} onChange={this.handleChange}/>
           </form>

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
