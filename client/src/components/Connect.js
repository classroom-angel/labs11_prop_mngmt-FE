import React from 'react';
import axios from '../axiosInstance';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD'

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
    alert('Payment Sucessful');
};

const errorPayment = data => {
    alert('Payment Error');
};

const onToken = (amount, description, stripeAccount) => token => {
    return axios.post(`${PAYMENT_SERVER_URL}/api/payment`,
        {
            description,
            source: token.id,
            currency: CURRENCY,
            amount: fromDollarToCent(amount),
            destination: stripeAccount,
        })
        .then(successPayment)
        // .catch(errorPayment => {
        //     console.log(errorPayment)
        // });
}

    const Connect = ({ name, description, amount, stripeAccount}) =>
    <StripeCheckout
        name={name}
        description={description}
        amount={fromDollarToCent(amount)}
        token={onToken(amount, description, stripeAccount)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        label="Pay Contractor"
    />

  export default Connect;
