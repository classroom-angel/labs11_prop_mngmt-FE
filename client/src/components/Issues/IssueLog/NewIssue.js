import React from 'react';
import Uploader from '../../Uploader';

const NewIssue = ({
  postIssues,
  issueName,
  handleChange,
  issueNotes,
  visitChange,
  uploading,
  imgAdder,
  statuses
}) => (
  <form onSubmit={postIssues} className="issue-card submit-issue">
    <h1>New Issue +</h1>
    <input
      name="issueName"
      value={issueName}
      placeholder="Issue Title"
      onChange={handleChange}
    />
    <br />
    <input
      name="issueNotes"
      value={issueNotes}
      placeholder="Additional notes"
      onChange={handleChange}
    />
    <br />
    <input
      type="checkbox"
      id="isVisit"
      name="isVisit"
      value={true}
      onChange={visitChange}
    />
    <label htmlFor="isVisit">isVisit</label>
    <br />
    <select name="issueStatus" onChange={handleChange}>
      <option value="">Status...</option>
      {statuses.map((status, index) => {
        return (
          <option key={index} value={status}>
            {status}
          </option>
        );
      })}
    </select>
    <br />
    <Uploader uploading={uploading} imgAdder={imgAdder} />
    <input type="submit" />
  </form>
);

export default NewIssue;
