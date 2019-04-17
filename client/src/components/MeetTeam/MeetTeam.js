import React, { Component } from 'react';
import alec from '../../img/alec.png';
import grant from '../../img/grant.png';
import john from '../../img/john.png';
import jordan from '../../img/jordan.png';
import rachel from '../../img/rachel.png';
import './MeetTeam.css';
import { Card, CardTitle } from 'react-materialize';

class MeetTeam extends Component {
  randomOrder = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(Math.floor(Math.random() * 10));
    }
    console.log(arr);
    return arr;
  };

  render() {
    let randoms = this.randomOrder();
    const imgstyle = { width: '200px', height: '200px' };
    return (
      <div className="meet-team">
        <div>
          <h3 style={{ textAlign: 'center' }}>Meet The Team</h3>
        </div>
        <div className="cards">
          <div
            className="alec"
            style={{
              margin: '15px',
              width: '310px',
              display: 'inline-block',
              order: randoms[0]
            }}
          >
            <Card
              className="cyan lighten-4"
              style={{ margin: '15px' }}
              header={<CardTitle />}
              title="Alec Jordan"
              reveal={
                <p style={{ textAlign: 'left' }}>
                  Alec is a Software Engineer who specializes in Front End Web
                  Dev. He hopes to one day work at a top company like Google or
                  DeepMind and maybe start his own business. In his free time,
                  he enjoys filmmaking, health and fitness and learning about
                  A.I.
                </p>
              }
            >
              <img style={imgstyle} src={alec} alt="alec" />
              <p>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://github.com/TheDeterminator"
                >
                  <i
                    style={{ color: 'black', margin: '10px' }}
                    class="fab fa-github-square fa-2x"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.linkedin.com/in/alec-jordan1/"
                >
                  <i
                    style={{ color: ' #0077B5' }}
                    className="fab fa-linkedin fa-2x"
                  />
                </a>
              </p>
            </Card>
          </div>
          <div
            className="grant"
            style={{
              margin: '15px',
              width: '310px',
              display: 'inline-block',
              order: randoms[1]
            }}
          >
            <Card
              className="cyan lighten-4"
              style={{ margin: '15px' }}
              header={<CardTitle />}
              title="Grant Reighard"
              reveal={
                <p style={{ marginTop: '30px', textAlign: 'left' }}>
                  Like most Lambda school students, Grant comes from a
                  non-traditional Computer Science background. He has a BA in
                  Film and Media Arts from Temple University. He enjoys playing,
                  watching, and developing video games.
                </p>
              }
            >
              <img style={imgstyle} src={grant} alt="grant" />
              <p>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.github.com/grantreighard"
                >
                  <i
                    style={{ color: 'black', margin: '10px' }}
                    class="fab fa-github-square fa-2x"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.linkedin.com/in/grantreighard"
                >
                  <i
                    style={{ color: ' #0077B5' }}
                    className="fab fa-linkedin fa-2x"
                  />
                </a>
              </p>
            </Card>
          </div>
          <div
            className="john"
            style={{
              margin: '15px',
              width: '310px',
              display: 'inline-block',
              order: randoms[2]
            }}
          >
            <Card
              className="cyan lighten-4"
              style={{ margin: '15px' }}
              header={<CardTitle />}
              title="John O'Rourke"
              reveal={
                <p style={{ marginTop: '30px', textAlign: 'left' }}>
                  Besides programming, John likes to hike, learn new things, and
                  play games. He aspires to work remotely from a mountainous
                  beach island. He enjoys the nitty gritty when it comes to
                  coding. If you need someone adaptable, he's your guy.
                </p>
              }
            >
              <img style={imgstyle} src={john} alt="john" />
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/johnoro"
                >
                  <i
                    style={{ color: 'black', margin: '10px' }}
                    class="fab fa-github-square fa-2x"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/john-o-rourke"
                >
                  <i
                    style={{ color: ' #0077B5' }}
                    className="fab fa-linkedin fa-2x"
                  />
                </a>
              </p>
            </Card>
          </div>
          <div
            className="jordan"
            style={{
              margin: '15px',
              width: '310px',
              display: 'inline-block',
              order: randoms[3]
            }}
          >
            <Card
              className="cyan lighten-4"
              style={{ margin: '15px' }}
              header={<CardTitle />}
              title="Jordan Massingill"
              reveal={
                <p style={{ marginTop: '30px', textAlign: 'left' }}>
                  Texan, tenacious, and technically savvy. Background in
                  biological and social sciences, future in full-stack
                  engineering. Strong love of music, the ocean, furbabies of all
                  kinds, and STEM.
                </p>
              }
            >
              <img style={imgstyle} src={jordan} alt="jordan" />
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jordan-massingill"
                >
                  <i
                    style={{ color: 'black', margin: '10px' }}
                    class="fab fa-github-square fa-2x"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/jordan-massingill/"
                >
                  <i
                    style={{ color: ' #0077B5' }}
                    className="fab fa-linkedin fa-2x"
                  />
                </a>
              </p>
            </Card>
          </div>
          <div
            className="rachel"
            style={{
              margin: '15px',
              width: '310px',
              display: 'inline-block',
              order: randoms[4]
            }}
          >
            <Card
              className="cyan lighten-4"
              style={{ margin: '15px' }}
              header={<CardTitle />}
              title="Rachel DiCesare"
              reveal={
                <p style={{ marginTop: '30px', textAlign: 'left' }}>
                  Rachel has a unique and heart-warming personality that brings
                  a happy work environment for her colleagues. After working
                  with children for 5 years, she was ready for a career change
                  and came to Lambda School. Rachel loves building projects with
                  her technical skills and imagination.
                </p>
              }
            >
              <img style={imgstyle} src={rachel} alt="rachel" />
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/RachelDiCesare93"
                >
                  <i
                    style={{ color: 'black', margin: '10px' }}
                    class="fab fa-github-square fa-2x"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/racheldicesare"
                >
                  <i
                    style={{ color: ' #0077B5' }}
                    className="fab fa-linkedin fa-2x"
                  />
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default MeetTeam;
