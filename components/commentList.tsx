import React from 'react';

interface Comment {
    text: string;
  }
  
  interface CommentListProps {
    comments: Comment[] | undefined;
  }
  
  function CommentList({ comments }: CommentListProps) {
    if (!comments){
      return null;
     } else {
      return (
        <div className='CommentList'>
          <h3>Comment List</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
  
  export default CommentList;