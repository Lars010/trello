import Image from "next/image"
import { useState } from "react";
import CommentList from "./commentList";
import "./data";


function Card({ cardData, setDragged }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(cardData.title);
    const [isCommenting, setIsCommenting] = useState(false);
    const [currentComment, setCurrentComment] = useState("");
    const [commentsCount, setCommentsCount] = useState(cardData.comments ? cardData.comments.length : 0);

    function handleDragStart(event) {
        setDragged({
            data: {
             title: cardData.title,
             user: cardData.user,
             comments: cardData.comments,
             id: cardData.id,
            },
            list: event.target.closest('[data-id]').dataset.id
        })
    }


    const handleEditClick = () => setIsEditing(true);
    const handleTitleChange = (e) => setCurrentTitle(e.target.value);
    const handleSaveClick = () => {
        
        setIsEditing(false);
        console.log("Title:", currentTitle);
    }

    const handleCommentClick = () => setIsCommenting(true);
    const handleCommentChange = (e) => setCurrentComment(e.target.value);
    const handleCommentCancel = () => setIsCommenting(false);
    const handleCommentSave = () => {
        setIsCommenting(false);
        setCommentsCount(commentsCount + 1);

        if (!cardData.comments)
            cardData.comments = [];

        cardData.comments.push(currentComment);
        console.log("Comment:", currentComment);
    }
    return (
         
        <div draggable onDragStart={handleDragStart} className="flex flex-col gap-4 p-2 text-gray-900 bg-white rounded-sm">
        <div className="flex justify-between">
            {isEditing ? (
                <input className="p-2 bg-gray-200 rounded-md" type="text" value={currentTitle} onChange={handleTitleChange} />
            ) : (
                <p>
                    {currentTitle}
                </p>
            )}
            <span>
                <Image src='/edit.svg' width={20} height={20} alt='edit' onClick={handleEditClick}/>
            </span>
        </div>
        {isEditing && (
            <div className="flex justify-end">
                <button className="px-4 py-2 mr-2 text-white bg-indigo-500 rounded-md" onClick={handleSaveClick}>Save</button>
            </div>
        )}
        <div className="flex justify-between">
            <span className="flex gap-1">
            <Image src='/comment.svg' width={20} height={20} alt='comment' onClick={handleCommentClick} />
                    {commentsCount > 0 ? commentsCount : null}
                </span>
                <span>
                    {/* <Image src={user.avatar} width={20} height={20} alt='user' /> */}
                </span>
            </div>
            {isCommenting && (
                <div>
                    <textarea className="p-2 bg-gray-200 rounded-md" value={currentComment} onChange={handleCommentChange} />
                    <div className="flex justify-end">
                        <button className="px-4 py-2 mr-2 text-white bg-indigo-500 rounded-md" onClick={handleCommentSave}>Save</button>
                        <button className="px-4 py-2 text-white bg-indigo-500 rounded-md" onClick={handleCommentCancel}>Cancel</button>
                    </div>
                </div>
            )}
            <CommentList comments={ cardData.comments }/>
        </div>
    )
}

export default Card


// <div draggable onDragStart={handleDragStart} className="flex flex-col gap-4 p-2 text-gray-900 bg-white rounded-sm">
        //     <div className="flex justify-between">
        //         <p>
        //             {title}
        //         </p>
        //         <span>
        //             <Image src='/edit.svg' width={20} height={20} alt='edit' />
        //         </span>
        //     </div>
        //     <div className="flex justify-between">
        //         <span className="flex gap-1">
        //             <Image src='/comment.svg' width={20} height={20} alt='comment' />
        //             {comments.length > 0 ? comments.length : null}
        //         </span>
        //         <span>
        //             <Image src={user.avatar} width={20} height={20} alt='user' />
        //         </span>
        //     </div>
        // </div>