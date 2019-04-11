import React from 'react';

const IssueBtn = ({ onClick, issueId, action }) => (
  <button
    onClick={onClick}
    value={issueId}
    style={{ backgroundColor: 'firebrick', color: 'orange' }}
  >
    {action} Issue
  </button>
);

export default IssueBtn;
