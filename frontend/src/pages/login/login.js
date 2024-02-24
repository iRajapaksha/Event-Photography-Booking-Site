import React, { useState } from 'react';
import styles from './Frame.module.css';
import axios from 'axios';

const Photologin = () => {
  const [email,setEmail] =useState("")
	const [password, setPassword] = useState("")

	function sendData(e){
		e.preventDefault()

		const newUser = {
			email,
			password
		}
    console.log(newUser);
		axios.post('http://localhost:3005/api/v1/photographers/login',newUser)
    .then(()=>{alert('Successfully loged in') 
    window.location=`/login/profile/${email}`
  }
    )
    .catch((err)=>{alert(err)})
    
    
  }
  return (

 <div className={styles.container}>
      <div className={styles.login}>
        Photographer Login
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
      <button className={styles.loginButton} onClick={sendData}>
        Login
      </button>
    </div> 
  );
};

export default Photologin;


