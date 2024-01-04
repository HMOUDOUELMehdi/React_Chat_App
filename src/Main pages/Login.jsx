import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { UserContext } from '../App';
import video from "./logRebacground/reg.mp4";
 
import { event } from 'jquery';
export default function Login() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    localStorage.removeItem('userData');
  }, []);

  function handleCheck(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function checkUser(event) {
    event.preventDefault();

    if (user.email === '' || user.password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Alert',
        text: 'All inputs are required',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();

      const existingUser = data.find(
        (oneUser) => oneUser.email === user.email && oneUser.password === user.password
      );

      if (existingUser) {
        setUserData({
          ...userData,
          name: existingUser.name,
          avatar: existingUser.avatar,
          email: existingUser.email,
          validLogin: true,
        });

        // Save user data to local storage
        localStorage.setItem('userData', JSON.stringify({
          name: existingUser.name,
          avatar: existingUser.avatar,
          email: existingUser.email,
          validLogin: true,
        }));

        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/currentuser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(existingUser),
            });
          } catch (error) {
            // Show generic error alert
            Swal.fire({
              icon: 'error',
              title: 'Alert',
              text: 'Something went wrong',
              confirmButtonText: 'OK',
            });
          }
        };

        fetchData();

        Swal.fire({
          icon: 'success',
          title: 'Alert',
          text: 'Login successful',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to home page
            history('/home');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Alert',
          text: 'User does not exist',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  }

  return (
    <div className={styles.loginContainer}>

    <video className={styles.bgVideo} playsInline autoPlay muted loop>
      <source src={video} type="video/mp4" />
    </video>
    <div className={styles.formContainer}>

      <span className={styles.logo}>MaR Shall</span>
      <span className={styles.title}>Login</span>
      <div>{typeof userData === 'string' ? userData : ''}</div>
      <form onSubmit={checkUser}>
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          name="email"
          onChange={handleCheck}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          name="password"
          onChange={handleCheck}
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        <h4>Don't have an account? <Link to="/register">Sign Up</Link></h4>
      </p>
    </div>
  </div>
  );
}
