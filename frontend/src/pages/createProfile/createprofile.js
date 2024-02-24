import React, { useState } from 'react';
import styles from './Frame.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CreatePrf() {
  const { email } = useParams();
  const [first_name, setfirstName] = useState('');
  const [last_name, setlastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [years_of_experience, setYearsofexperience] = useState('');
 // const [image, setImage] = useState(null);

  // const fileInputRef = useRef(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // };

  // const handleUploadButtonClick = () => {
  //   fileInputRef.current.click(); // Trigger a click on the file input
  // };

  function sendData(e) {
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

    axios
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
      <div className={styles.formGroup}>
        <label className={styles.label}>First Name</label>
        <input type="text" className={styles.input} onChange={(e) => setfirstName(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Last Name</label>
        <input type="text" className={styles.input} onChange={(e) => setlastName(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>City</label>
        <input type="text" className={styles.input} onChange={(e) => setCity(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Telephone</label>
        <input type="text" className={styles.input} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <div className={styles.email}>{email}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Experience (Year)</label>
        <input type="text" className={styles.input} onChange={(e) => setYearsofexperience(e.target.value)} />
      </div>

      {/* <div className={styles.formGroup}>
        <label className={styles.label}>Profile Picture</label>
        <div className={styles.uploadButtonContainer}>
          <input
            type="file"
            id="image"
             className={styles.uploadInput}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button className={styles.uploadButton} onClick={handleUploadButtonClick}>
            Upload
          </button>
        </div>
      </div> */}
      <button className={styles.uploadButton} onClick={sendData}>
        Done
      </button>
    </div>
  );
}

export default CreatePrf;


