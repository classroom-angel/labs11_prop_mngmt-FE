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
      <Card key={issue.id} className="" style={{ width: '350px' }}>
        <p
          style={{
            textAlign: 'left',
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
                <Chip key={tag.id} className="blue-grey">
                  {tag.name}
                </Chip>
              );
            })}
        </div>
        <Button
          onClick={deleteIssue}
          value={issue.id}
          className="red darken-1"
          style={{ margin: '5px 10px' }}
        >
          X
        </Button>
        <NavLink to={`/issue/${issue.id}`}>
          <Button value={issue.id} className="cyan darken-2">
            View/Update
          </Button>
        </NavLink>
        <Button
          onClick={() => toggleShowComments(issue.id)}
          value={issue.id}
          className="cyan darken-3"
        >
          Show Comments
        </Button>
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
      </Card>
    );
};

export default Issue;
