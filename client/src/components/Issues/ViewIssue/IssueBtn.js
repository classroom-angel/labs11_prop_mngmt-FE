import React from 'react';

const IssueBtn = ({ onClick, issueId, action }) => (
  <button
    className="btn amber"
    onClick={onClick}
    value={issueId}
    style={{ margin: '5px 10px' }}
  >
    {action} Issue
  </button>
);

export default IssueBtn;
