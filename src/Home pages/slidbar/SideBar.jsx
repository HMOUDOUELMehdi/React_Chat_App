import React, { useState, useEffect, useContext } from 'react';
import style from '../StyleHome.module.css';
import Navbar from './Navbar';
import Chats from './Chats';

import { UserContext } from '../Home';

const SideBar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState();
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
 {/*
  je suis ajouter cette state pour con click sur element backround
  sera orange  const [selectedId, setSelectedId] = useState(null);
*/}
const [selectedId, setSelectedId] = useState(null);
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
    async function fetchData() {
      try {
        // Make sure currentUser is defined before fetching
        if (currentUser) {
          const response = await fetch(`http://localhost:3000/users/${currentUser}`);
          const data = await response.json();
          setUsers(data.freinds || []); // Set users to an empty array if it's undefined
          setUserData((prevUserData) => ({ ...prevUserData, AllUsers: data.freinds || [] }));
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Check if currentUser is defined before making the fetch call
    if (currentUser) {
      setInterval(fetchData, 1000);
    }
  }, [currentUser]);

  useEffect(() => {
    users && setUserData((prevUserData) => ({ ...prevUserData, AllUsers: users }));
  }, [users]);

  // Check if users is defined before filtering
  const filteredUsers = users && users.filter((user) =>
    user.name.toLowerCase().includes(input.toLowerCase())
  );
       {/*
   lecode ajouter
const handleDivClick = (userId) => {
    setSelectedId(userId === selectedId ? null : userId);}
*/}
const handleDivClick = (userId) => {
  setSelectedId(userId === selectedId ? null : userId);}
  

  return (
    <div className={style.Sidebar}>
      <Navbar />

      <div className={style.search}>
        <div className={style.searchForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Find a user"
          />
        </div>
      </div>
  {/*
 j'ajoute class className={style.bberryyggsaid}
  j'ajoute className={`${style.errr} ${user.id === selectedId ? style.clicked : ''}`}
          onClick={() => handleDivClick(user.id)}
*/}
  <div  className={style.bberryyggsaid}>
        {filteredUsers.map((user) => (
          <div  key={user.id}
          className={`${style.errr} ${user.id === selectedId ? style.clicked : ''}`}
          onClick={() => handleDivClick(user.id)}>
         <Chats  name={user.name} avatar={user.avatar} id={user.id} />
            <hr />
          </div>
        ))}
      </div>
  </div>  );
};

export default SideBar;
