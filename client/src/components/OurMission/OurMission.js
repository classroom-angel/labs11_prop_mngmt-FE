import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import kidsinclass from '../../img/kidsinclass.jpg';
import oneboyinclass from '../../img/oneboyinclass.jpg';
import groupofkids from '../../img/groupofkids.jpg';
import './OurMission.css';

class OurMission extends Component {
  render() {
    const imgstyle = { width: '250px', height: '200px', marginRight: '15px' };
    return (
      <div className="mission container" style={{ margin: '15px auto' }}>
        <div>
          <h3>Our Mission</h3>
          <h5>
            We help you meet classroom needs so you can focus on what really
            matters.
          </h5>
          <div>
            <div className="pictures">
              <img style={imgstyle} src={kidsinclass} alt="kidsinclass" />
              <img style={imgstyle} src={oneboyinclass} alt="oneboyinclass" />
              <img style={imgstyle} src={groupofkids} alt="groupofkids" />
            </div>
            <p>
              In the past, teachers, and administrators had to submit issues by
              sending emails to their board members that would, unfortunately,
              get lost due to email traffic most of the time. We've created an
              application for you to easily submit issues and provide board
              members with easy access to get them solved in a short amount of
              time.Never again will you have to worry about waiting long for a
              response , as Classroom Angel is here fix every issue in the
              classroom.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default OurMission;
