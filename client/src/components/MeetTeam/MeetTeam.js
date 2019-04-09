import React, { Component } from 'react';
import alec from '../../img/alec.png';
import grant from '../../img/grant.png';
import john from '../../img/john.png';
import jordan from '../../img/jordan.png';
import rachel from '../../img/rachel.png';
import './MeetTeam.css';

class MeetTeam extends Component {
  render() {
    const imgstyle = { width: '200px', height: '200px' };
    return (
      <div className="meet-team">
        <div>
          <h3>Meet The Team</h3>
        </div>
        <div className="row valign-wrapper center-align">
          <div className="alec col s4" style={{ margin: '15px' }}>
            <h5>Alec Jordan</h5>
            <img style={imgstyle} src={alec} alt="alec" />
            <a target="_blank" href="https://github.com/TheDeterminator">
              <i
                style={{ color: '#e57373', margin: '10px' }}
                class="fab fa-github-square fa-2x"
              />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/alec-jordan1/">
              <i class="fab fa-linkedin fa-2x cyan-text" />
            </a>
          </div>
          <div className="grant col s4" style={{ margin: '15px' }}>
            <h5>Grant Reighard</h5>
            <img style={imgstyle} src={grant} alt="grant" />
            <a target="_blank" href="https://www.github.com/grantreighard">
              <i
                style={{ color: '#e57373', margin: '10px' }}
                class="fab fa-github-square fa-2x"
              />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/grantreighard">
              <i class="fab fa-linkedin fa-2x cyan-text" />
            </a>
          </div>
          <div className="john col s4" style={{ margin: '15px' }}>
            <h5>John O'Rourke</h5>
            <img style={imgstyle} src={john} alt="john" />
            <a target="_blank" href="https://github.com/johnoro">
              <i
                style={{ color: '#e57373', margin: '10px' }}
                class="fab fa-github-square fa-2x"
              />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/john-o-rourke">
              <i class="fab fa-linkedin fa-2x cyan-text" />
            </a>
          </div>
        </div>
        <div className="row valign-wrapper center-align">
          <div className="jordan col s4" style={{ margin: '15px' }}>
            <h5>Jordan Massingill</h5>
            <img style={imgstyle} src={jordan} alt="jordan" />
            <a target="_blank" href="https://github.com/jordan-massingill">
              <i
                style={{ color: '#e57373', margin: '10px' }}
                class="fab fa-github-square fa-2x"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/jordan-massingill/"
            >
              <i class="fab fa-linkedin fa-2x cyan-text" />
            </a>
          </div>
          <div className="rachel col s4" style={{ margin: '15px' }}>
            <h5>Rachel DiCesare</h5>
            <img style={imgstyle} src={rachel} alt="rachel" />
            <a target="_blank" href="https://github.com/RachelDiCesare93">
              <i
                style={{ color: '#e57373', margin: '10px' }}
                class="fab fa-github-square fa-2x"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/racheldicesare"
            >
              <i className="fab fa-linkedin fa-2x cyan-text" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MeetTeam;
