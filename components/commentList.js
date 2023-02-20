import React from 'react';

function CommentList({ comments }) {

    if (!comments)
        return null;
    else
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

export default CommentList;