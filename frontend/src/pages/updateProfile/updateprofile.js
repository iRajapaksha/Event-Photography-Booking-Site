import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Frame.module.css';

function CreatePrf() {
  const { email } = useParams();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [years_of_experience, setYearsOfExperience] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3005/api/v1/photographers/${email}`)
      .then((response) => {
        const userData = response.data;
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setCity(userData.city);
        setPhone(userData.phone);
        setYearsOfExperience(userData.years_of_experience);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setIsLoading(false);
      });
  }, [email]);

  async function sendData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('city', city);
    formData.append('years_of_experience', years_of_experience);

    await axios.put('http://localhost:3005/api/v1/photographers', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
      alert('Photographer details updated');
      window.location = `/login/profile/${email}`;
    })
    .catch((err) => {
      alert(err);
    });
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
         <div className={styles.loadingSpinner}></div>
       ) : (
        <form className={styles.form} onSubmit={sendData}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              className={styles.input}
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              className={styles.input}
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>City</label>
            <input
              type="text"
              className={styles.input}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Telephone</label>
            <input
              type="text"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <div className={styles.email}>{email}</div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Experience (Years)</label>
            <input
              type="text"
              className={styles.input}
              value={years_of_experience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
            />
          </div>

          <div className={styles.buttonsContainer}>
            <button type="submit" className={styles.done}>Done</button>
            <Link to={`/login/profile/${email}`} className={styles.backButton}>Back</Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreatePrf;
