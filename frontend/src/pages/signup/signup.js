import React, { useState } from 'react';
import styles from './Frame.module.css';
import axios from 'axios';

function Photosign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newUser = {
      email,
      password
    };

    axios.post('http://localhost:3005/api/v1/photographers', newUser)
      .then(() => {
        alert("Photographer Signed Up");
        window.location = `/signup/createprofile/${email}`;
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.signup}>
        Photographer Sign Up
      </div>
      <div className={styles.inputContainer}>
        <input
          type='text'
          placeholder='Email'
          className={styles.inputField} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.inputField}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.signupButton} onClick={sendData}>
        Sign Up
      </button>
    </div>
  );
}

export default Photosign;
