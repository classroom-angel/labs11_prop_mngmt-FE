import React from 'react';
import '../../../App.css';

const IssueBtn = ({ onClick, issueId, action }) => (
  <button
    className="btn cyan same-button"
    onClick={onClick}
    value={issueId}
    style={{ margin: '5px 10px' }}
  >
    {action} Issue
  </button>
);

export default IssueBtn;
