import React, { Component } from 'react';
import axios from '../axiosInstance';
import useFormInput from './useFormInput';

function signUp() {
    const inputs = [
        useFormInput('Username'),
        useFormInput('First name'),
        useFormInput('Last name'),
        useFormInput('Password')
      ];
    
      const onSubmit = async event => {
        event.preventDefault();
    
        const tempResponse = await axios.post(`users/register`);
    
        console.log(tempResponse);
    
        inputs.forEach(input => {
          input.value = '';
        })
      };

    return (
        <div>
            <h1>signUp page</h1>
<           form onSubmit={onSubmit}>
                <div>
                  {
                    inputs.map(input => (
                      <input {...input} />
                    ))
                  }
                </div>
          <button>Submit</button>
            </form>
        </div>
        
    )
}

export default signUp