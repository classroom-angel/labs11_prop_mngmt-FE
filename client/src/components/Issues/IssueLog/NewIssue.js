import React from 'react';
import { Icon } from 'react-materialize';
import Uploader from '../../Uploader';
import { NavLink } from 'react-router-dom';
import '../../../App.css';

const NewIssue = ({
  postIssues,
  issueName,
  handleChange,
  issueNotes,
  visitChange,
  uploading,
  imgAdder,
  statuses,
  adminSelect,
  handleDropChange,
  dropDownId
}) => {
  return (
    <div
      className="card"
      style={{ width: '350px', border: '1px solid #8d8d8d' }}
    >
      <div className="card-content">
        <form
          onSubmit={postIssues}
          className={`issue-card submit-issue ${adminSelect}`}
        >
          <h4>New Issue +</h4>
          <input
            name="issueName"
            // value={issueName}
            placeholder="Issue Title"
            // onChange={handleChange}
          />
          <br />
          <input
            name="issueNotes"
            // value={issueNotes}
            placeholder="Additional notes"
            // onChange={handleChange}
          />
          <br />

          <select name="issueStatus">
            <option value="needs attention">Choose status</option>
            {statuses.map((status, index) => {
              return <option value={status}>{status}</option>;
            })}
          </select>
          <br />
          <Uploader uploading={uploading} imgAdder={imgAdder} />
          {/* <div className="card-action"> */}
          <button
            type="submit"
            waves="light"
            className="btn cyan same-button"
            style={{ marginTop: '10px' }}
          >
            Submit
            <Icon right>send</Icon>
          </button>
          {/* </div> */}
        </form>
        <NavLink to="/issue-log">Back to Issues</NavLink>
      </div>
    </div>
  );
};

export default NewIssue;
