import React, { useContext } from 'react';
import style from '../styleHome.module.css';
import Cam from "./imgs/cam.avif"
import Add from "./imgs/add.jpg"
import More from "./imgs/more.webp"
import Messages from './Messages';
import Input from './Input';

import { UserContext } from '../Home';

const Chat = () => {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div className={style.chat}>
      <div className={style.chatInfo}>
        <span>{userData.name}</span>
        <div className={style.Icons}>
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
