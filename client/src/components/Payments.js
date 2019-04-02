import React from 'react'
import Sidebar from './Sidebar';
import Checkout from './Checkout';
import '../App.css'

function Payments() {
    return (
        <div className="page-container">
          <Sidebar />
            <div className="checkout right-side">
            <Checkout
              name={'Classroom Angel'}
              description={'Subscribe to get 10 more teachers'}
              amount={29.99}
           />
        </div>
     </div>
    );
}

export default Payments
