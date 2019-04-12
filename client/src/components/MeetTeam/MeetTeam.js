import React, { Component } from 'react';
import alec from '../../img/alec.png';
import grant from '../../img/grant.png';
import john from '../../img/john.png';
import jordan from '../../img/jordan.png';
import rachel from '../../img/rachel.png';
import './MeetTeam.css';
import { Card, CardTitle, Col } from 'react-materialize';

class MeetTeam extends Component {
  render() {
    const imgstyle = { width: '200px', height: '200px' };
    return (
      <div className="meet-team">
        <div>
          <h3 style={{ textAlign: 'center' }}>Meet The Team</h3>
        </div>
        <div className="row valign-wrapper center-align">
          <div className="alec col s5" style={{ margin: '15px' }}>
            <Col>
              <Card
                className="cyan lighten-4"
                style={{ margin: '15px' }}
                header={<CardTitle />}
                title="Aleczander Jordan"
                reveal={
                  <p style={{ textAlign: 'left' }}>
                    Alec is a Software Engineer who specializes in Front End Web
                    Dev. He hopes to one day work at a top company like Google
                    or DeepMind and maybe start his own business. In his free
                    time, he enjoys filmmaking, health and fitness and learning
                    about A.I.
                  </p>
                }
              >
                <img style={imgstyle} src={alec} alt="alec" />
                <p>
                  <a target="_blank" href="https://github.com/TheDeterminator">
                    <i
                      style={{ color: 'black', margin: '10px' }}
                      class="fab fa-github-square fa-2x"
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/alec-jordan1/"
                  >
                    <i
                      style={{ color: ' #0077B5' }}
                      className="fab fa-linkedin fa-2x"
                    />
                  </a>
                </p>
              </Card>
            </Col>
          </div>
          <div className="grant col s5" style={{ margin: '15px' }}>
            <Col>
              <Card
                className="cyan lighten-4"
                style={{ margin: '15px' }}
                header={<CardTitle />}
                title="Grant Reighard"
                reveal={
                  <p style={{ marginTop: '30px', textAlign: 'left' }}>
                    Like most Lambda school students, Grant comes from a
                    non-traditional Computer Science background. He has a BA in
                    Film and Media Arts from Temple University. He enjoys
                    playing, watching, and developing video games.
                  </p>
                }
              >
                <img style={imgstyle} src={grant} alt="grant" />
                <p>
                  <a
                    target="_blank"
                    href="https://www.github.com/grantreighard"
                  >
                    <i
                      style={{ color: 'black', margin: '10px' }}
                      class="fab fa-github-square fa-2x"
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/grantreighard"
                  >
                    <i
                      style={{ color: ' #0077B5' }}
                      className="fab fa-linkedin fa-2x"
                    />
                  </a>
                </p>
              </Card>
            </Col>
          </div>
          <div className="john col s5" style={{ margin: '15px' }}>
            <Col>
              <Card
                className="cyan lighten-4"
                style={{ margin: '15px' }}
                header={<CardTitle />}
                title="John O'Rourke"
                reveal={
                  <p>
                    Besides programming, John likes to hike, learn new things ,
                    and play games.
                  </p>
                }
              >
                <img style={imgstyle} src={john} alt="john" />
                <p>
                  <a target="_blank" href="https://github.com/johnoro">
                    <i
                      style={{ color: 'black', margin: '10px' }}
                      class="fab fa-github-square fa-2x"
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/john-o-rourke"
                  >
                    <i
                      style={{ color: ' #0077B5' }}
                      className="fab fa-linkedin fa-2x"
                    />
                  </a>
                </p>
              </Card>
            </Col>
          </div>
        </div>
        <div className="row valign-wrapper center-align">
          <div className="jordan col s5" style={{ margin: '15px' }}>
            <Col>
              <Card
                className="cyan lighten-4"
                style={{ margin: '15px' }}
                header={<CardTitle />}
                title="Jordan Massingill"
                reveal={
                  <p style={{ marginTop: '30px', textAlign: 'left' }}>
                    Texan, tenacious, and technically savvy. Background in
                    biological and social sciences, future in full-stack
                    engineering. Strong love of music, the ocean, furbabies of
                    all kinds, and STEM
                  </p>
                }
              >
                <img style={imgstyle} src={jordan} alt="jordan" />
                <p>
                  <a
                    target="_blank"
                    href="https://github.com/jordan-massingill"
                  >
                    <i
                      style={{ color: 'black', margin: '10px' }}
                      class="fab fa-github-square fa-2x"
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/jordan-massingill/"
                  >
                    <i
                      style={{ color: ' #0077B5' }}
                      className="fab fa-linkedin fa-2x"
                    />
                  </a>
                </p>
              </Card>
            </Col>
          </div>
          <div className="rachel col s5" style={{ margin: '15px' }}>
            <Col>
              <Card
                className="cyan lighten-4"
                style={{ margin: '15px' }}
                header={<CardTitle />}
                title="Rachel DiCesare"
                reveal={
                  <p style={{ marginTop: '30px', textAlign: 'left' }}>
                    Rachel comes from a non-tradional Computer Science
                    background. After working with children for 5 years , she
                    was ready for a big change.Rachel loves building projects
                    with her technical skills and imagination.
                  </p>
                }
              >
                <img style={imgstyle} src={rachel} alt="rachel" />
                <p>
                  <a target="_blank" href="https://github.com/RachelDiCesare93">
                    <i
                      style={{ color: 'black', margin: '10px' }}
                      class="fab fa-github-square fa-2x"
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/racheldicesare"
                  >
                    <i
                      style={{ color: ' #0077B5' }}
                      className="fab fa-linkedin fa-2x"
                    />
                  </a>
                </p>
              </Card>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default MeetTeam;
