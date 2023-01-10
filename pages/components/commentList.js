import React from 'react';

function CommentList({comments}) {
  return (
    <div className='CommentList'>
      <h3>Comment List</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;