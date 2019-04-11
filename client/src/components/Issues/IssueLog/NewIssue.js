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
  <Card
    style={{
      order: '-1',
      width: '350px',
      height: '400px',
      border: '2px solid #00b8d4'
    }}
  >
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
      <label>
        <input
          type="checkbox"
          id="isVisit"
          name="isVisit"
          value={true}
          onChange={visitChange}
          sytle={{ color: 'black' }}
        />
        <span>isVisit</span>
      </label>
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
      <Button type="submit" waves="light" className="cyan darken-4">
        Submit
        <Icon right>send</Icon>
      </Button>
    </form>
  </Card>
);

export default NewIssue;
