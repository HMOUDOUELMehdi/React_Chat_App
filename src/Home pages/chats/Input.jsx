import React, { useContext, useEffect, useState } from 'react';
import style from '../StyleHome.module.css';


import { UserContext } from '../Home';

const Input = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [CurrUser, SetCurrentUser] = useState('');
  const [RecieveUser, SetRecieveUser] = useState('');
  const [MessageContenet, SetMessageContenet] = useState('');
  const [AllFreind, SetAllFreind] = useState(userData.AllUsers);

  // Get id value of the current user from the URL and set it in CurrUser state
  const CurrentUser = async () => {
    const response = await fetch("http://localhost:3000/currentuser");
    const data = await response.json();
    SetCurrentUser(data[0].id);
  };

  useEffect(()=>{
    SetRecieveUser(userData.id);
  },[MessageContenet])

  useEffect(() => {
    // Call the function when the component mounts
    CurrentUser();
    SetRecieveUser(userData.id);
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  const handleClick = () => {
    SetRecieveUser(userData.id);
    // Call the Content function only if RecieveUser is not empty
    (RecieveUser && MessageContenet )&& Content();
    // console.log(userData.AllUsers)
  };
  useEffect(() => {
    // console.log('All Users:', userData.AllUsers);
    SetAllFreind(userData.AllUsers);
  }, [userData.AllUsers]);

  const handleClickAll = async () => {
    // Check if AllFreind is not empty
    if (AllFreind && AllFreind.length > 0) {
      const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
  
      // Iterate over each friend and send a separate message
      for (const friend of AllFreind) {
        const response = await fetch("http://localhost:3000/messages", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: CurrUser,
            receiver: friend.id,
            text: MessageContenet,
            timestamp: timestamp, // Include the timestamp in the message data
          }),
        });
  
        if (!response.ok) {
          console.error('Failed to send message to', friend.id);
          return; // Stop further iterations if one request fails
        }
      }
  
      // All messages were sent successfully
      SetRecieveUser(userData.id);
      SetMessageContenet(''); // Clear the input after sending
    } else {
      console.warn('AllFreind is empty or undefined. Unable to send messages.');
    }
  };
  

  function HandleChange(e) {
    SetMessageContenet(e.target.value); // Fix the syntax error here
  }

  const Content = async () => {
    const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
    const response = await fetch("http://localhost:3000/messages", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: CurrUser,
        receiver: RecieveUser,
        text: MessageContenet,
        timestamp: timestamp, // Include the timestamp in the message data
      }),
    });
  
    if (response.ok) {
      SetRecieveUser(userData.id);
      SetMessageContenet(''); // Clear the input after sending
    } else {
      console.error('Failed to send message');
    }
  };
  

  return (
    <>
      <div className={style.input}>
        <input type="text" placeholder="Type Something ..." value={MessageContenet} onChange={HandleChange} />
        <div className={style.send}>
          <button onClick={handleClick}>Send</button>
          <button onClick={handleClickAll}>To All</button>
        </div>
      </div>
    </>
  );
};

export default Input;
