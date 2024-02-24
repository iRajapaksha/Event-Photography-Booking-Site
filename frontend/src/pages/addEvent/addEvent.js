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

  const handleImageChange = (e, imageIdentifier) => {
    const newImage = e.target.files[0];

    const updatedImages = [...images];
    updatedImages[imageIdentifier - 1] = newImage;
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

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

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
    <div className={styles.addEventParent}>
      <div className={styles.addEvent}>Add Event</div>
      <div className={styles.eventName}>Event Name</div>
      {/* <div className={styles.addSamples}>Add Samples</div> */}
      <input
        type="text"
        className={styles.frameChild}
        onChange={(e) => {
          setEvent(e.target.value);
        }}
      />
      <label htmlFor="image1" className={styles.frameItemLabel}>
        Upload Image 1
      </label>
      <input
        type="file"
        id="image1"
        className={styles.frameItem}
        onChange={(e) => handleImageChange(e, 1)}
      />
      <label htmlFor="image2" className={styles.frameInnerLabel}>
        Upload Image 2
      </label>
      <input
        type="file"
        id="image2"
        className={styles.frameInner}
        onChange={(e) => handleImageChange(e, 2)}
      />
      <label htmlFor="image3" className={styles.rectangleDivLabel}>
        Upload Image 3
      </label>
      <input
        type="file"
        id="image3"
        className={styles.rectangleDiv}
        onChange={(e) => handleImageChange(e, 3)}
      />
      <label htmlFor="image4" className={styles.frameChild1Label}>
        Upload Image 4
      </label>
      <input
        type="file"
        id="image4"
        className={styles.frameChild1}
        onChange={(e) => handleImageChange(e, 4)}
      />
  <div className={styles.buttonsContainer}>
  <button className={styles.done} onClick={sendData}>
    Done
  </button>
  <button className={styles.done}>
    <Link to={`/login/profile/${email}`}>Back</Link>
  </button>
</div>
    </div>
  );
};

export default AddEvent;
