import React, { useEffect, useState, useContext } from 'react';
import style from '../Home pages/StyleHome.module.css';
import Add from '../Home pages/chats/imgs/add.jpg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { UserContext } from '../App';

export default function AddFriend() {
  const { userData } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState('');
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCurrentUser = await fetch('http://localhost:3000/currentuser');
        const dataCurrentUser = await responseCurrentUser.json();
        setCurrentUser(dataCurrentUser[0].id);

        const responseUsers = await fetch('http://localhost:3000/users');
        const dataUsers = await responseUsers.json();
        setUsers(dataUsers);

        const responseFriends = await fetch(`http://localhost:3000/users/${currentUser}`);
        const dataFriends = await responseFriends.json();
        setFriends(dataFriends.freinds);
      } catch (error) {
        console.error(error);
        handleError(error);
      }
    };

    fetchData();
  }, [currentUser]);

  async function addFriend(id, name, avatar) {
    try {
      const user = { id, name, avatar };
  
      // Fetch the current user data
      const responseCurrentUser = await fetch(`http://localhost:3000/users/${currentUser}`);
      const dataCurrentUser = await responseCurrentUser.json();
  
      // Check if the friend is already in the list
      if (friends && dataCurrentUser.freinds.some((friend) => friend.id === user.id)) {
        Swal.fire({
          icon: 'info',
          title: 'Alert',
          text: 'Friend already added',
          confirmButtonText: 'OK',
        });
        return;
      }
  
      // Update the freinds array without deleting other properties
      const updatedUser = { ...dataCurrentUser, freinds: [...dataCurrentUser.freinds, user] };
  
      // Send the updated user data to the server
      const response = await fetch(`http://localhost:3000/users/${currentUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (response.ok) {
        // Reload the page or update the state as needed
        Swal.fire({
          icon: 'success',
          title: 'Alert',
          text: 'Friend added successfully',
          confirmButtonText: 'OK',
        })
      } else {
        handleError(response.status);
      }
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  }
  
  
  function handleError(error) {
    Swal.fire({
      icon: 'error',
      title: 'Alert',
      text: getErrorMessage(error),
      confirmButtonText: 'OK',
    });
  }

  function getErrorMessage(error) {
    if (typeof error === 'string') {
      return error;
    } else if (error instanceof Error) {
      return error.message || 'Something went wrong';
    } else {
      return 'Something went wrong';
    }
  }

  return (
    <>
       <div className={style.AddFriend}>
        <div className={style.Allfreind}>All Users</div>
     {/*   j'ajoute class className={style.Adddrendstyle}}*/}
 

        <div className={style.Adddrendstyle}>
        {Array.isArray(users) &&
          users.map(
            (user) =>
              user.email === userData.email ? (
                ''
              ) : (
                <div
                  className={style.chats}
                  key={user.id}
                  onClick={() => addFriend(user.id, user.name, user.avatar)}
                >
                  <div className={style.userChat}>
                    <img src={user.avatar} alt="" />
                    <div className={style.userChatInfo}>
                      <span>{user.name}</span>
                    </div>
                    <img
                      className={style.iconAdd}
                      style={{ width: '50px',marginLeft:'Auto', height: '50px', padding: '10px' }}
                      src={Add}
                      alt=""
                    />
                  </div>
                  <hr />
                </div>
              )
          )}
         </div>  
      </div>
    </>
  );
}
