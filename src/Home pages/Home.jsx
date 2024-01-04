import React, { createContext, useState } from "react";
import SlidBar from "./slidbar/SideBar";
import Chat from "./chats/Chat";
import style from './StyleHome.module.css';
import AddFreind from '../Main pages/AddFreind';

export const UserContext = createContext(null);

const Home = () => {
    const freindData = { name: '', id:0 , avatar:'' ,AllUsers:[]};
    const [userData, setUserData] = useState(freindData);
    const UserValues = { userData, setUserData };

    // console.log(userData.AllUsers)

    return (
        <>
            <div className={style.home} >
                <div className={style.container} >
                    <UserContext.Provider value={UserValues}>
                        <SlidBar />
                        <Chat />
                        <AddFreind />
                    </UserContext.Provider>
                </div>
            </div>
        </>
    );
}

export default Home;
