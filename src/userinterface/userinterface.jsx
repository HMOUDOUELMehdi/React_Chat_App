// Userinterface.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Userinterface.module.css'; // Import the CSS module
import icon from "./assets/favicon.ico";
import video from "./assets/mp4/bg.mp4";

const Userinterface = () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Chat App</title>
        <link rel="icon" type="image/x-icon" href={icon} />
      </head>
      <body>
       
         
        <div className={styles.masthead}>
           <video className={styles.bgVideo} playsInline autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
          <div className={`${styles.mastheadContent}`}>
            <div className={`${styles.container}`}>
              <h1 className={`${styles.fstItalic}`}>MaRR Shall</h1>
              <p className={`${styles.mb5}`}>Welcome To <span className={styles.marchalSpan}>MaRR ShaLL !</span>Join the conversation,connect with others,and explore endless possibilities.</p>
              <div className={styles.btnContainer}>
              <Link to="register"><button className={`${styles.btn}`}>Sign Up</button></Link>
              <Link to="login"><button className={`${styles.btn}`}>Log in</button></Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Userinterface;
