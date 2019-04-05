import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import PAYMENT_SERVER_URL from '../constants/server';
import STRIPE_PUBLISHABLE from '../constants/stripe';

const CURRENCY = 'USD';

const Checkout = props => (
  <StripeCheckout
    name={props.name}
    description={props.description}
    amount={props.amount}
    token={props.sendToken(props)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    label={props.label}
  />
);


/* Token helpers */

const successPayment = data => {
  alert('Payment Sucessful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const subscribe = ({ description }) => token => {
  return axios
    .post(`${PAYMENT_SERVER_URL}/api/subscribe`, {
      description,
      source: token.id
    })
    .then(successPayment)
    .catch(errorPayment);
};

const connect = ({ amount, description, stripeAccount }) => token => {
  return axios
    .post(`${PAYMENT_SERVER_URL}/api/payment/connect`, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount,
      destination: stripeAccount[0]
    })
    .then(successPayment)
    .catch(errorPayment);
};

export { subscribe, connect };

export default Checkout;
