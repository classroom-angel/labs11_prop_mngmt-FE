/* eslint no-restricted-globals: 0 */
import auth0 from 'auth0-js';
import React, { Component } from 'react';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    // this.getProfile = this.getProfile.bind(this);
    this.login = this.login.bind(this);
  }
    auth0 = new auth0.WebAuth ({
        domain: 'classroomangel.auth0.com',
        clientID:'aCRKf9uUYcF1v2gFUZf0s3PZtxy6uwvn',
        redirectUri: 'http://localhost:3000/authload',
        responseType: 'token id_token',
        // audience: 'classroomangel.auth0.com/userinfo',
        scope: 'openid profile email firstName'
    });

    userProfile = JSON.parse(localStorage.getItem('profile'));


    // getProfile(cb) {
    //   const tok = localStorage.getItem('access_token');
    //     this.auth0.client.userInfo(tok, (err, profile) => {
    //       console.log(profile);
    //         if (profile) {
    //             this.userProfile = profile;
    //             localStorage.setItem('profile', JSON.stringify(profile));
    //         } else {
    //           console.log("NO PROFILE!!")
    //         }
    //         cb(err, profile);
    //      });
    //  }

    login() {
        this.auth0.authorize();
    }

    logout() {
     localStorage.clear();
     this.userProfile = null;
    }

    handleAuth = () => {
      this.auth0.parseHash((err, authResults) => {
        console.log(authResults);
        if (authResults && authResults.accessToken && authResults.idToken) {
          let expires = JSON.stringify((authResults.expiresIn * 1000) + new Date().getTime());
          localStorage.setItem('access_token', JSON.stringify(authResults.accessToken));
          localStorage.setItem('expires', expires);
          localStorage.setItem('profile', JSON.stringify(authResults.idTokenPayload));
          location.pathname= "/signup";
        } else if (err) {
          location.pathname = "/";
          console.log(err);
        }
      })
    }

    isAuth = () => {
      let expires_at = JSON.parse(localStorage.getItem('expires'));
      return expires_at > new Date().getTime();
    }
}
