import React from 'react';
import { NavLink } from 'react-router-dom';
import Comments from '../Comments';
import VIModal from '../ViewIssue/VIModal';

import { Button, Chip } from 'react-materialize';

const Issue = ({
  issue,
  tags,
  filterTag,
  filterStatus,
  deleteIssue,
  toggleShowComments,
  showCommentsObj,
  comments,
  deleteComment,
  submitComment,
  commentsObj,
  handleCommentChange
}) => {
  return (
    <div
      key={issue.id}
      className="card medium"
      style={{
        border: '1px solid #8d8d8d',
        width: '295px',
        marginLeft: '10px',
        marginRight: '10px'
      }}
    >
      {/* <div id={`modal${issue.id}`} className="modal">
        <VIModal issueID={issue.id} />
      </div> */}

      <Button
        onClick={deleteIssue}
        value={issue.id}
        className=""
        style={{
          float: 'right',
          position: 'relative',
          left: '22px',
          bottom: '20px',
          backgroundColor: '#ee6e73'
        }}
      >
        X
      </Button>
      <div className="card-content">
        <p
          style={{
            textAlign: 'left',
            fontSize: '18px',
            maxWidth: '206px'
          }}
        >
          {issue.name}
        </p>
        <p style={{ textAlign: 'left' }}>{issue.notes}</p>
        {/* <p>Status: {issue.status}</p> */}
        <p style={{ textAlign: 'left' }}>Date: {issue.date}</p>
        {/* <p>Org. Id: {issue.organizationId}</p> */}
        <div>
          {tags
            .filter(function(tag) {
              return tag.issueId === issue.id;
            })
            .map(function(tag) {
              return (
                <Chip key={tag.id} className="amber lighten-3">
                  {tag.name}
                </Chip>
              );
            })}
        </div>
        <Comments
          comments={comments}
          issueId={issue.id}
          deleteComment={deleteComment}
        />
        <form onSubmit={e => submitComment(issue.id, e)}>
          <input
            name="comment"
            placeholder="add comment"
            value={commentsObj[`issue${issue.id}`]}
            issue_id={issue.id}
            onChange={e => handleCommentChange(issue.id, e)}
          />
        </form>
      </div>
      <div className="card-action" style={{ float: 'bottom' }}>
        {/* <NavLink to={`/issue/${issue.id}`} style={{ margin: 'auto' }}> */}
        {/* <Button value={issue.id} className="amber darken-1">
            View/Update
          </Button> */}
        <button
          className="waves-effect waves-light btn modal-trigger amber"
          data-target={`#modal${issue.id}`}
        >
          Edit
        </button>
        {/* </NavLink> */}
      </div>
    </div>
  );
  // }
};

export default Issue;
