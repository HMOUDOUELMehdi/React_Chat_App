import  {  useContext } from "react";
import {  useNavigate } from 'react-router-dom';
import style from '../StyleHome.module.css';
import { UserContext } from "../../App";

const Navbar = () => {

    const {userData,setUserData } = useContext(UserContext)

    const history = useNavigate();

    async function  Logout() {
      setUserData({
        ...userData,
        validlogin: false,
      });
        history('/login')
       deleteFirstUser();
    }

    async function deleteFirstUser() {
        try {
          // Fetch the list of current users
          const currentUsersResponse = await fetch('http://localhost:3000/currentuser');
          const currentUsersData = await currentUsersResponse.json();
      
          // Check if there are current users
          if (currentUsersData.length > 0) {
            // Get the ID of the first current user
            const firstCurrentUserId = currentUsersData[0].id;
      
            // Delete the first current user
            const response = await fetch(`http://localhost:3000/currentuser/${firstCurrentUserId}`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
              console.log('First current user deleted successfully');
              // Perform any additional actions after deletion if needed
            } else {
              console.error('Failed to delete first current user');
            }
          } else {
            console.warn('No current users found to delete');
          }
        } catch (error) {
          console.error('Error deleting first current user:', error);
        }
      }
      
    return (
        <>
                 <div className={style.navbar} >
        {/*je mettre la classe className={style.logo} dans div et dans span j'ajoute  className={style.marchall}  */}
               <div className={style.logo}><span className={style.marchall} > MaRR Shall </span></div>
                <div className={style.user} >
                    <span style={{position:'relative',top:'-10px',fontWeight:"bold",color:"wihte",marginLeft:'5px'}}  >{userData.name}</span>
                    <img style={{width:'60px',height:'60px'}} src={userData.avatar} alt="" />
                    <div className={style.userbutton}> <button onClick={Logout } >Log Out</button></div>
                </div>
            </div>
        </>
    );
}

export default Navbar;

// src/App.jsx 
// src/Home pages/slidbar/Navbar.jsx
// src/Main pages/Login.jsx