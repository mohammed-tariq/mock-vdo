import React, { useState } from 'react' 
 const DisplayComments = ({ comment })=> {
  const [collapse,setCollapse] = useState(false)
    return (
      <div className="comment">
        <div className='d-flex'>
          <span className="profile">-</span>
          <span>@{comment.user}: </span>
          <br />
          <p className='comment-text'> {comment.text}</p>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <>
          <span className='reply-btn' onClick={()=>setCollapse(!collapse)}>Replies</span>
          <ul className="replies">
            {collapse && comment.replies.map((reply, index) => (
              <div key={index}>
                <DisplayComments comment={reply} />
              </div>
            ))}
          </ul>
          </>
        )}
      </div>
    );
  }

  export default DisplayComments;