import React, { useState } from 'react';
import style from '../StyleHome.module.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css'; // for solid icons

const Message = ({ id, classs, content, avatar, timestamp, onDelete }) => {
  const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);

    const timeDifference = now - messageDate;

    if (timeDifference < 60000) {
      // Less than a minute
      return 'just now';
    } else if (timeDifference < 3600000) {
      // Less than an hour
      const minutesAgo = Math.floor(timeDifference / 60000);
      return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDifference < 86400000) {
      // Less than a day
      const hoursAgo = Math.floor(timeDifference / 3600000);
      return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    } else {
      // More than a day
      return messageDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    }
  };
  const timeAgo = calculateTimeAgo(timestamp);

  const deleteMessage = async () => {
    try {
      const response = await fetch(`http://localhost:3000/messages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Message deleted successfully
        onDelete(id); // Notify parent component to update UI
      } else {
        // Handle the case where the server returns an error
        console.error(`Failed to delete message with ID ${id}`);
      }
    } catch (error) {
      // Handle network errors
      console.error(`Error deleting message with ID ${id}`, error);
    }
  };

  return (
    <>
      <div className={style[classs]}>
        <div className={style.messageInfo}>
          <img src={avatar} alt="" />
          <span>{timeAgo}</span>
        </div>
        <div className={style.messageContent}>
          <p>{content}</p>
        </div>
        {id &&<i
          onClick={deleteMessage}
          className="fas fa-trash"
          style={{ color: 'red', position: 'relative', top: '20px', cursor: 'pointer' }}
        ></i>}
      </div>
    </>
  );
};

export default Message;
