import React from 'react';

function CommentList({ comments }) {
    if (comments)
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
    else
        return null;
}

export default CommentList;