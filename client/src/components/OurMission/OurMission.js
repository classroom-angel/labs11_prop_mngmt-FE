import React, { Component } from 'react';
import { Row, Col, CardPanel } from 'react-materialize';
import kidsinclass from '../../img/kidsinclass.jpg';
import oneboyinclass from '../../img/oneboyinclass.jpg';
import groupofkids from '../../img/groupofkids.jpg';
import './OurMission.css';

class OurMission extends Component {
  render() {
    const imgstyle = {
      width: '300px',
      height: '300px'
    };
    return (
      <div className="mission">
        <CardPanel
          style={{ height: 'auto', width: '80%', margin: '10px auto' }}
        >
          <h3>Our Mission</h3>
          <h5>
            We help you meet classroom needs so you can focus on what really
            matters.
          </h5>
          <div className="pictures" style={{ margin: '0 auto' }}>
            <img
              src={kidsinclass}
              alt="kids in class"
              style={{
                height: '150px',
                width: '150px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />

            <img
              src={oneboyinclass}
              alt="one boy in class"
              style={{
                height: '150px',
                width: '150px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />

            <img
              src={groupofkids}
              alt="group of kids"
              style={{
                height: '150px',
                width: '150px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            {/* <div
              style={{
                backgroundImage: `url(${kidsinclass})`,
                backgroundSize: 'cover',
                height: '200px',
                width: '200px'
              }}
            />

            <div
              style={{
                backgroundImage: `url(${oneboyinclass})`,
                backgroundSize: 'cover',
                height: '200px',
                width: '200px'
              }}
            />

            <div
              style={{
                backgroundImage: `url(${groupofkids})`,
                backgroundSize: 'cover',
                height: '200px',
                width: '200px'
              }}
            /> */}
          </div>
          <div>
            <p>
              In the past, teachers, and administrators had to submit issues by
              sending emails to their board members that would, unfortunately,
              get lost due to email traffic most of the time. We've created an
              application for you to easily submit issues and provide board
              members with easy access to get them solved in a short amount of
              time. Never again will you have to worry about waiting long for a
              response, as Classroom Angel is here fix every issue in the
              classroom.
            </p>
          </div>
        </CardPanel>
      </div>
    );
  }
}

export default OurMission;
