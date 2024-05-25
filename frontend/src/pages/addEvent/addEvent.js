import React, { useState, useEffect } from 'react';
import styles from './Frame.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AddEvent = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [event, setEvent] = useState('');
  const [images, setImages] = useState([null, null, null, null]);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/api/v1/photographers/${email}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [email]);

  const handleImageChange = (e, index) => {
    const newImage = e.target.files[0];
    const updatedImages = [...images];
    updatedImages[index] = newImage;
    setImages(updatedImages);
  };

  const sendData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('event_name', event);
    formData.append('first_name', userData.first_name);
    formData.append('last_name', userData.last_name);
    formData.append('city', userData.city);
    formData.append('phone', userData.phone);
    formData.append('email', userData.email);
    formData.append('years_of_experience', userData.years_of_experience);

    images.forEach((image, index) => {
      if (image) {
        formData.append(`images`, image);
      }
    });

    axios
      .post('http://localhost:3005/api/v1/events', formData)
      .then(() => {
        alert('Event added successfully');
        window.location = `/login/profile/${email}`;
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className={styles.addEventContainer}>
      <h1 className={styles.title}>Add Event</h1>
      <form onSubmit={sendData} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="event" className={styles.label}>Event Name</label>
          <input
            type="text"
            id="event"
            className={styles.input}
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
        </div>
        {images.map((_, index) => (
          <div className={styles.formGroup} key={index}>
            <input
              type="file"
              id={`image${index}`}
              className={styles.fileInput}
              onChange={(e) => handleImageChange(e, index)}
            />
            <label htmlFor={`image${index}`} className={styles.fileInputLabel}>
              {`Upload Image ${index + 1}`}
            </label>
          </div>
        ))}
        <div className={styles.buttonsContainer}>
          <button type="submit" className={styles.button}>Done</button>
          <Link to={`/login/profile/${email}`} className={styles.button}>Back</Link>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
