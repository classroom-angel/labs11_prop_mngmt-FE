import React from 'react';
import { NavLink } from 'react-router-dom';
import Comments from '../Comments';

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
  // filters tags by filter criteria
  let truthArray = tags.filter(tag => {
    return tag.name === filterTag;
  });
  // Array that will hold whatever issue IDs are attached to filtered tags
  let testArray = [];
  truthArray.forEach(entry => {
    testArray.push(entry.issueId);
  });

  if (
    (issue.status === filterStatus.toLowerCase() || filterStatus === 'all') &&
    (testArray.includes(issue.id) || filterTag === 'all')
  )
    return (
      <div key={issue.id} className="issue-card">
        <p
          style={{
            textAlign: 'left',
            marginLeft: '20px',
            fontSize: '18px'
          }}
        >
          {issue.name}
        </p>
        <p>{issue.notes}</p>
        {/* <p>Status: {issue.status}</p> */}
        <p>Date: {issue.date}</p>
        {/* <p>Org. Id: {issue.organizationId}</p> */}
        <div>
          {tags
            .filter(function(tag) {
              return tag.issueId === issue.id;
            })
            .map(function(tag) {
              return (
                <div key={tag.id} className="tag">
                  {tag.name}
                </div>
              );
            })}
        </div>
        <button
          onClick={deleteIssue}
          value={issue.id}
          style={{ display: 'inline-block' }}
        >
          Delete
        </button>
        <NavLink to={`/issue/${issue.id}`}>
          <button value={issue.id} className="edit-issue-button">
            View/Update
          </button>
        </NavLink>
        <button
          onClick={() => toggleShowComments(issue.id)}
          value={issue.id}
          style={{ display: 'inline-block' }}
        >
          Show Comments
        </button>
        {showCommentsObj[`issue${issue.id}`] ? (
          <div>
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
        ) : null}
      </div>
    );
};

export default Issue;
