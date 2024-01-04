import React, { useEffect, useState, useContext } from 'react';
import style from '../StyleHome.module.css';
import Message from './Message';

import { UserContext } from '../Home';

const Messages = () => {

  const { userData, setUserData } = useContext(UserContext);

  const [CurrUser, SetCurrentUser] = useState('');
  const [CurrUserAvatar, SetCurrentUserAvatar] = useState('');
  const [AllMessages, SetAllMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/currentuser");
      const data = await response.json();
      SetCurrentUser(data[0].id);
      SetCurrentUserAvatar(data[0].avatar);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllMessages = async () => {
      const response = await fetch("http://localhost:3000/messages");
      const data = await response.json();
      SetAllMessages(data);
    };

    setInterval(fetchAllMessages, 1000);
   
  }, []);

  // Filter and display messages with specific criteria
  const filteredMessages = AllMessages.filter
  (message => message.sender === CurrUser && message.receiver === userData.id || message.sender === userData.id && message.receiver === CurrUser);

  // console.log(userData.avatar) lastMessage

  // const filterLastMessage = AllMessages.filter
  // (message => )

  return (
    <>
      <div className={style.messages}>
        {filteredMessages.map((message, index) => {
          if (message.sender === CurrUser) {
            return <Message key={index} classs='message' content={message.text} id={message.id} avatar={CurrUserAvatar} timestamp={message.timestamp} />;
          } else if (message.sender === userData.id) {
            return <Message key={index} classs='owner' content={message.text} avatar={userData.avatar} timestamp={message.timestamp} />;
          } else {
            return null;
          }
        })}
      </div>
    </>


  );
};

export default Messages;

