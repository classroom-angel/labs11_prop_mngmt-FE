import React, { Component } from 'react';
import Member from './Member';
import alec from '../../img/alec.png';
import grant from '../../img/grant.png';
import john from '../../img/john.png';
import jordan from '../../img/jordan.png';
import rachel from '../../img/rachel.png';
import './MeetTeam.css';

class MeetTeam extends Component {
  render() {
    return (
      <div className="meet-team">
        <div>
          <h3>Meet The Team</h3>
        </div>
        <div className="row valign-wrapper center-align">
          <Member
            firstName="Alec"
            lastName="Jordan"
            src={alec}
            gitHub={'https://github.com/TheDeterminator'}
            linkedIn={'https://www.linkedin.com/in/alec-jordan1'}
          />
          <Member
            firstName="Grant"
            lastName="Reighard"
            src={grant}
            gitHub={'https://www.github.com/grantreighard'}
            linkedIn={'https://www.linkedin.com/in/grantreighard'}
          />
          <Member
            firstName="John"
            lastName="O'Rourke"
            src={john}
            gitHub={'https://github.com/johnoro'}
            linkedIn={'https://www.linkedin.com/in/john-o-rourke'}
          />
        </div>
        <div className="row valign-wrapper center-align">
          <Member
            firstName="Jordan"
            lastName="Massingill"
            src={jordan}
            gitHub={'https://github.com/jordan-massingill'}
            linkedIn={'https://www.linkedin.com/in/jordan-massingill'}
          />
          <Member
            firstName="Rachel"
            lastName="DiCesare"
            src={rachel}
            gitHub={'https://github.com/RachelDiCesare93'}
            linkedIn={'https://www.linkedin.com/in/racheldicesare'}
          />
        </div>
      </div>
    );
  }
}

export default MeetTeam;
