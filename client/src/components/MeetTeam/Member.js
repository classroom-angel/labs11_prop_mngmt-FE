import React from 'react';

const Member = ({ firstName, lastName, src, gitHub, linkedIn }) => (
  <div
    className={`${firstName.toLowerCase()} col s4`}
    style={{ margin: '15px' }}
  >
    <h5>{`${firstName} ${lastName}`}</h5>
    <img
      style={{ width: '200px', height: '200px' }}
      src={src}
      alt={firstName.toLowerCase()}
    />
    <a target="_blank" href={gitHub}>
      <i
        style={{ color: '#e57373', margin: '10px' }}
        class="fab fa-github-square fa-2x"
      />
    </a>
    <a target="_blank" href={linkedIn}>
      <i class="fab fa-linkedin fa-2x cyan-text" />
    </a>
  </div>
);

export default Member;
