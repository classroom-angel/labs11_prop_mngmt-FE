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
    <Card>
      <form className="issue-card submit-issue">
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
        {/*<select name="issueStatus" onChange={handleChange}>
          <option value="">Status...</option>
          {statuses.map((status, index) => {
            return (
              <option key={index} value={status}>
                {status}
              </option>
            );
          })}
        </select>*/}
        {/*<RadioGroup
          name="issueStatus"
          onChange={handleChange}
          label="Status"
          options={options}
          />*/}
        <br />
        <Uploader uploading={uploading} imgAdder={imgAdder} />
      </form>
    </Card>
  );
};

export default NewIssue;
