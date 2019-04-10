import React, { Component } from 'react';
import schedule from '../../img/schedule.jpg';
import contractor from '../../img/contractor.jpg';
import teacher from '../../img/teacher.jpg';

class OurMission extends Component {
  render() {
    const imgstyle = { width: '200px', height: '200px' };
    return (
      <div className="mission col s4" style={{ margin: '15px' }}>
        <div>
          <h3>About Classroom Angel</h3>
          <h5>
            We help you meet classroom needs so you can focus on what really
            matters.
          </h5>
          <div>
            <p>
              In the past, teachers, and administrators had to submit issues by
              sending emails to their board members that would, unfortunately,
              get lost due to email traffic most of the time. We've created an
              application for you to easily submit issues and provide board
              members with easy access to get them solved in a short amount of
              time.
            </p>
          </div>
          <div className="pictures">
            <img style={imgstyle} src={schedule} alt="schedule" />
            <img style={imgstyle} src={contractor} alt="contractor" />
            <img style={imgstyle} src={teacher} alt="teacher" />
          </div>
        </div>
      </div>
    );
  }
}

export default OurMission;
