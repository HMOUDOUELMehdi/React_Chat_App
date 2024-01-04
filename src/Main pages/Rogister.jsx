import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import video from "./logRebacground/reg.mp4";

export default function Register() {
  const history = useNavigate();
  // All this input empty
  const initialUserState = {
    name: '',
    email: '',
    password: '',
    avatar: '',
    freinds:[]
  };

  // state 
  const [users, setUsers] = useState(initialUserState); // object for get all the value for input
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  // function for make the value of input inside values of object {users}
  function handleChange(e) {
    const { value, name } = e.target;

    setUsers((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // check password input
    if (name === 'password') {
      validatePassword(value);
    }
  }

  function validatePassword(value) {
    const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // check if this input valid by test the reguler exeprition
    if (!passwordTest.test(value)) {
      setPasswordError(
        'Password must contain at least 8 characters, including letters, numbers, and special characters.'
      );
    } else {
      setPasswordError('');
    }
  }

  //  useEffect for check if the email already exist 
  useEffect(() => {
    async function checkEmail() {
      try {
        const response = await fetch(`http://localhost:3000/users?email=${users.email}`); // the url
        const data = await response.json();

        if (data.length > 0) { 
          setEmailError('Email already exists');
        } else {
          setEmailError('');
        }
      } catch (error) {
        console.error('Error checking email:', error);
      }
    }

    checkEmail();
  }, [users.email]);

  //  this function run whene i submit the form
  const handleSignUp = async (e) => {
    e.preventDefault();

    // check if the inputs are empty
    if (users.name === '' || users.email === '' || users.password === '' ) {
      showAlert('error', 'All inputs are required');
      return;
    }

    // here if everything is good the (passwordError || emailError) both return false so condition return false so no block for code
    if (passwordError || emailError) {
      showAlert('error', 'Invalid password or existing email. Cannot submit the form.');
      return; // the block of code
    }

    try {
      const response = await fetch('http://localhost:3000/users', {// this is url whene i wont to send data 
        method: 'POST', // post request for send data
        headers: {
          'Content-Type': 'application/json', // It informs the server that the data being sent in the request body is in JSON format
        },
        body: JSON.stringify(users), // data json format
      });

      if (response.ok) {
        // If the user has chosen a picture, update the user data and send it to the server
        if (users.avatar) { // if avatar has some value
          const userDataWithPicture = { ...users, avatar: users.avatar }; // get the prev values of users (...users) and avatar give him a new value 
          // and value of userDataWithPicture  is same value of users
          await fetch(`http://localhost:3000/users/${userDataWithPicture.id}`, { // search for id of user in file json server 
            method: 'PUT', // if find the user the PUT method update the value of avatar for new avatar
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDataWithPicture),
          });
        }

        //  alert for success registring
        Swal.fire({
          icon: 'success',
          title: 'Alert',
          text: 'Registration successful',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            history('/login'); // navigate to the login page
          }
        });
        clearForm(); // make all the inputs empty
      } else {
        const errorData = await response.json();
        showAlert('error', `Registration failed: ${errorData.message}`); // whene something is wrong
      }
    } catch (error) {
      showAlert('error', 'Something went wrong');
    }
  };

  // the function for alert sweet
  const showAlert = (icon, text) => {
    Swal.fire({
      icon,
      title: 'Alert',
      text,
      confirmButtonText: 'OK',
    });
  };

  const clearForm = () => {
    setUsers(initialUserState);
  };

  // function for avatars 
  function ShowAvatars() {
    const pictures = [ // array of images
      'src/Main pages/Avatars/1.png',
      'src/Main pages/Avatars/2.jpg',
      'src/Main pages/Avatars/3.jpeg',
      'src/Main pages/Avatars/4.jpeg',
      'src/Main pages/Avatars/5.jpg',
      'src/Main pages/Avatars/6.jpeg',
      'src/Main pages/Avatars/7.jpg',
      'src/Main pages/Avatars/8.jpg',
    ];
  
    const inputOptions = pictures.map((picture, index) => ( // just map for the url imgs and return him inside the img tag
      `<img src="${picture}" width="100" height="70" alt="Picture ${index + 1}"> `
    ));
  
    Swal.fire({
      title: 'Select a picture',
      input: 'radio', // input type radio
      width: 1000,
      inputOptions: {
        ...inputOptions, // passed the value of (inputOptions) like an option for any input radio
      },
      inputValidator: (result) => { // value selected
        if (!result) { // result in the inputValidator function represents the user's choice in the SweetAlert modal
          return 'You need to choose a picture';
        }
      },
      showCancelButton: true, // Displays the cancel button.
      confirmButtonText: 'Select', // Sets the text for the confirmation button
    }).then((result) => { // this blook is exesuted after i click ok btn 
      if (result.isConfirmed) { // checks if the user clicked the "Confirm" button
        const selectedIndex = result.value;// the index of the selected picture in radio btn
        const selectedPicture = pictures[selectedIndex]; //  this line retrieves the URL of the selected picture from the pictures array.
        // Update the users state with the selected picture
        setUsers((prevUsers) => ({ ...prevUsers, avatar: selectedPicture }));
      }
    });
  }
  
  
  

  return (
    <div className={styles.restContainer}>
    <video className={styles.bgVideo} playsInline autoPlay muted loop>
      <source src={video} type="video/mp4" />
    </video>
    <div className={styles.forContainer}>
      <span className={styles.logo}>MaR Shall</span>
      <span className={styles.title}>Register</span>
      <div style={{ color: 'red' }}>{passwordError}</div>
      <div style={{ color: 'red' }}>{emailError}</div>
      <form onSubmit={handleSignUp}>
        <input type="text" value={users.name} name="name" onChange={handleChange} placeholder="Display Name" />
        <input type="email" value={users.email} name="email" onChange={handleChange} placeholder="Email" />
        <input type="password" value={users.password} name="password" onChange={handleChange} placeholder="Password" />
        <input type="button" value="Choose Avatar" name="avatar" onClick={ShowAvatars} />
        <p>{users.avatar}</p>
        <button type="submit">Sign Up</button>
      </form>
      <p>
      <h4>You already have an account? <Link to="/login">Login</Link></h4>
      </p>
    </div>
  </div>
  );
}


                                                                         
