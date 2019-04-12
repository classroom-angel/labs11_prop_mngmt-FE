import React from 'react';
import { Button, Card, Icon, RadioGroup } from 'react-materialize';
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
    <Card style={{ width: '350px', border: '2px solid #00b8d4' }}>
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
        {/*<RadioGroup
          name="issueStatus"
          onChange={handleChange}
          label="Status"
          options={options}
          />*/}
        <br />
        <Uploader uploading={uploading} imgAdder={imgAdder} />
        <Button type="submit" waves="light" className="cyan darken-4">
          Submit
          <Icon right>send</Icon>
        </Button>
      </form>
    </Card>
  );
};

export default NewIssue;
