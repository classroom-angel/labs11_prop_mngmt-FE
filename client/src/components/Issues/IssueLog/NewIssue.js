import React from 'react';
import { Button, Icon } from 'react-materialize';
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
}) => {
  const options = [];
  statuses.forEach(status => options.push({ label: status, value: status }));
  return (
    <div
      className="card"
      style={{ width: '350px', border: '1px solid #8d8d8d' }}
    >
      <div className="card-content">
        <form onSubmit={postIssues} className="issue-card submit-issue">
          <h4>New Issue +</h4>
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

          {statuses.map((status, index) => {
            return (
              <input
                type="radio"
                onChange={handleChange}
                key={index}
                value={status}
              />
            );
          })}
          <br />
          <Uploader uploading={uploading} imgAdder={imgAdder} />
          {/* <div className="card-action"></div> */}
          <Button
            type="submit"
            waves="light"
            className="cyan darken-2"
            style={{ marginTop: '10px' }}
          >
            Submit
            <Icon right>send</Icon>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewIssue;
