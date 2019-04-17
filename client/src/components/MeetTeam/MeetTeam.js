import React from 'react';
import alec from '../../img/alec.png';
import grant from '../../img/grant.png';
import john from '../../img/john.png';
import jordan from '../../img/jordan.png';
import rachel from '../../img/rachel.png';
import './MeetTeam.css';
import MemberCard from './MemberCard';

const MeetTeam = () => (
  <div className="meet-team">
    <div>
      <h3 style={{ textAlign: 'center' }}>Meet The Team</h3>
    </div>
    <div className="cards">
      <MemberCard
        name="Alec Jordan"
        src={alec}
        content="Alec is a Software Engineer who specializes in Front End Web
                Dev. He hopes to one day work at a top company like Google or
                DeepMind and maybe start his own business. In his free time, he
                enjoys filmmaking, health and fitness and learning about A.I."
        gitHub="TheDeterminator"
        linkedIn="alec-jordan1"
      />

      <MemberCard
        name="Grant Reighard"
        src={grant}
        content="Like most Lambda school students, Grant comes from a
                non-traditional Computer Science background. He has a BA in Film
                and Media Arts from Temple University. He enjoys playing,
                watching, and developing video games."
        gitHub="https://www.github.com/grantreighard"
        linkedIn="grantreighard"
      />

      <MemberCard
        name="John O'Rourke"
        src={john}
        content="Besides programming, John likes to hike, learn new things, and
                play games. He aspires to work remotely from a mountainous beach
                island. He enjoys the nitty gritty when it comes to coding. If
                you need someone adaptable, he's your guy."
        gitHub="johnoro"
        linkedIn="john-o-rourke"
      />

      <MemberCard
        name="Jordan Massingill"
        src={jordan}
        content="Texan, tenacious, and technically savvy. Background in
                biological and social sciences, future in full-stack
                engineering. Strong love of music, the ocean, furbabies of all
                kinds, and STEM."
        gitHub="jordan-massingill"
        linkedIn="jordan-massingill"
      />

      <MemberCard
        name="Rachel DiCesare"
        src={rachel}
        content="Rachel has a unique and heart-warming personality that brings a
                happy work environment for her colleagues. After working with
                children for 5 years, she was ready for a career change and came
                to Lambda School. Rachel loves building projects with her
                technical skills and imagination."
        gitHub="RachelDiCesare93"
        linkedIn="racheldicesare"
      />
    </div>
  </div>
);

export default MeetTeam;
