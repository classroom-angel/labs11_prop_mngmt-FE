import auth0 from 'auth0-js';


export default class Auth {
    auth0 = new auth0.WebAuth ({
        domain: 'classroomangel.auth0.com',
        clientID:'aCRKf9uUYcF1v2gFUZf0s3PZtxy6uwvn',
        redirectUri: 'http://localhost:3000/onboarding',
        responseType: 'token id_token',
        scope: 'openid profile'
    });

    userProfile = JSON.parse(localStorage.getItem('profile'));

    // if (userProfile) {
    //
    // }

    constructor() {
      this.getProfile = this.getProfile.bind(this);
    }

    getProfile(cb){
        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
                localStorage.setItem('profile', JSON.stringify(profile))
            }
            cb(err, profile);
         });
     }

    login() {
        this.auth0.authorize();
    }

    logout() {
     localStorage.clear();
     this.userProfile = null;
    }
}
