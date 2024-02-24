import React, { useState, useEffect } from 'react';
import styles from './Frame.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreatePrf() {
  const { email } = useParams();
  const [first_name, setfirstName] = useState();
  const [last_name, setlastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [years_of_experience, setYearsofexperience] = useState('');
 // const [image, setImage] = useState(null);

  // const [userData, setUserdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  //upload profile picture
    // const handleImageChange = (e) => {
    //   const file = e.target.files[0];
    //   setImage(file);
    // };  

    
    //Get the photographer details using email as a parameter
    useEffect( () => { 
      axios.get(`http://localhost:3005/api/v1/photographers/${email}`)
        .then((response) => {
        //  console.log(response.data);
          const userData = response.data
          setfirstName(userData?.first_name)
          setlastName(userData.last_name)
          setCity(userData?.city)
          setPhone(userData?.phone)
          setYearsofexperience(userData?.years_of_experience)
          setIsLoading(false)
          
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          setIsLoading(false)
        });
    },[email]);

 
    
  
    
    
    async function sendData(e) {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('city', city);
      formData.append('years_of_experience', years_of_experience);
      // if (image) {
      //   formData.append('image', image);
      // }
    
      await axios
        .put('http://localhost:3005/api/v1/photographers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        })
        .then(() => {
          alert('Photographer details added');
          window.location = `/login/profile/${email}`;
        })
        .catch((err) => {
          alert(err);
        });
    }
  

  return (
    <div className={styles.container}>
      {isLoading ? (<p>Loading</p>):(
<>
<div className={styles.formGroup}>
        <label className={styles.label}>First Name</label>
        <input type="text" className={styles.input} value={first_name} onChange={(e) => setfirstName(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Last Name</label>
        <input type="text" className={styles.input} value={last_name} onChange={(e) => setlastName(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>City</label>
        <input type="text" className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Telephone</label>
        <input type="text" className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <div className={styles.email}>{email}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Experience (Year)</label>
        <input type="text" className={styles.input} value={years_of_experience}  onChange={(e) => setYearsofexperience(e.target.value)} />
      </div>
      <div className={styles.buttonsContainer}>
          <button className={styles.done} onClick={sendData}>
              Done
         </button>
          <button className={styles.done}>
                    <Link to={`/login/profile/${email}`}>Back</Link>
          </button>
      </div>   
        {/* <input type="file" id="image" className={styles.upload} onChange={handleImageChange} /> */}

</>

      )}
      
      
    </div>
  );
}

export default CreatePrf;

