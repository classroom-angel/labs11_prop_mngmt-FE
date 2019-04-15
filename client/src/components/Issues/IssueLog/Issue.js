import React from 'react';
import { NavLink } from 'react-router-dom';
import Comments from '../Comments';

import { Button, Card, Chip } from 'react-materialize';

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
    // <a href={`/issue/${issue.id}`}>
    <Card
      key={issue.id}
      className=""
      style={{ width: '350px', border: '1px solid #8d8d8d' }}
    >
      <p
        style={{
          textAlign: 'left',
          fontSize: '18px'
        }}
      >
        {issue.name}
        <span>
          <Button
            onClick={deleteIssue}
            value={issue.id}
            className="red darken-4"
            style={{ margin: '5px 10px', float: 'right' }}
          >
            X
          </Button>
        </span>
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
              <Chip key={tag.id} className="cyan lighten-5">
                {tag.name}
              </Chip>
            );
          })}
      </div>
      {/* <Button
        onClick={() => toggleShowComments(issue.id)}
        value={issue.id}
        className="cyan lighten-3"
      >
        Show Comments
      </Button> */}
      {/* {showCommentsObj[`issue${issue.id}`] ? ( */}
      {/* <div> */}
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
      {/* </div> */}
      {/* ) : null} */}
      <NavLink to={`/issue/${issue.id}`}>
        <Button value={issue.id} className="cyan lighten-2">
          View/Update
        </Button>
      </NavLink>
    </Card>
    // </a>
  );
  // }
};

export default Issue;
