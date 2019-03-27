import React from 'react'
import Sidebar from './Sidebar';
import Checkout from './Checkout';
import '../App.css'

function Payments() {
    return (
        <div className="page-container">
       <Sidebar />
            <div className="checkout">
            <Checkout
              name={'10+ Teachers'}
              description={'Subscribe to get more teachers'}
              amount={5.00}
           />
        </div>
        </div>
    )
}

export default Payments
