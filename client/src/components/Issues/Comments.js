import React from 'react';

const Comments = ({ comments, issueId, deleteComment }) => (
  <div style={{ marginTop: '20px', textAlign: 'left' }}>
    {comments
      .filter(comment => {
        return comment.issueId === issueId;
      })
      .map(comment => {
        return (
          <div
            key={comment.id}
            style={{ maxWidth: '206px', wordBreak: 'break-all' }}
          >
            {`• ${comment.content}`}
            <span
              onClick={deleteComment}
              className="delete-button"
              issue_id={comment.id}
            >
              {' '}
              X
            </span>
          </div>
        );
      })}
  </div>
);

export default Comments;
