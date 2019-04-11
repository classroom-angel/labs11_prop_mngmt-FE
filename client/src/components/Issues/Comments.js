import React from 'react';

const Comments = ({ comments, issueId, deleteComment }) => (
  <div>
    {comments
      .filter(comment => {
        return comment.issueId === issueId;
      })
      .map(comment => {
        return (
          <div key={comment.id}>
            - {comment.content}
            <span
              onClick={deleteComment}
              className="delete-button"
              issue_id={comment.id}
            >
              {' '}
              x
            </span>
          </div>
        );
      })}
  </div>
);

export default Comments;
