import React, { useContext, useState, useEffect } from 'react';
import style from '../StyleHome.module.css';

import { UserContext } from '../Home';

const Chats = ({ name, avatar, id }) => {
  const { userData, setUserData } = useContext(UserContext);
  const [AllMessages, SetAllMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [lastMessage, setLastMessage] = useState('');

  function handleUserClick(id, avatar, name) {
    setUserData((prevUserData) => ({ ...prevUserData, id, avatar, name }));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/currentuser");
        const data = await response.json();
        setCurrentUser(data[0].id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const response = await fetch("http://localhost:3000/messages");
        const data = await response.json();
        SetAllMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMessages();

    const intervalId = setInterval(fetchAllMessages, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const filteredMessages = AllMessages.filter(
      (message) =>
        (message.sender === currentUser && message.receiver === id) ||
        (message.sender === id && message.receiver === currentUser)
    );

    setLastMessage(filteredMessages.length > 0 ? filteredMessages[filteredMessages.length - 1] : '');
  }, [AllMessages, currentUser, id]);

  return (
    <div className={style.chatsAsAll}>
    <div onClick={() => handleUserClick(id, avatar, name)} className={style.chats}>
      <div className={style.userChat}>
        <img src={avatar} alt="" />
        <div className={style.userChatInfo}>
          <span>{name}</span>
          <p>
            {lastMessage &&
              (lastMessage.sender === currentUser ? (
                <div>
                  <span style={{ color: "#58ee99" }}>YOU:</span> {lastMessage.text}
                </div>
              ) : (
                <div>
                  <span style={{ color: "red" }}>{name.toUpperCase()}:</span> {lastMessage.text}
                </div>
              ))}
          </p>
        </div>
      </div>
    </div>
    <div>
    </div>
    </div>
  );
};

export default Chats;
