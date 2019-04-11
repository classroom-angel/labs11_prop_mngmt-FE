import React from 'react';
import { Button, Card, Icon } from 'react-materialize';
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
  <Card style={{ order: '-1' }}>
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
      <Button type="submit" waves="light">
        Submit
        <Icon right>send</Icon>
      </Button>
    </form>
  </Card>
);

export default NewIssue;
