import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Frame.module.css';

const Profile = () => {
  const { email } = useParams();
  const [userData, setUserdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3005/api/v1/photographers/${email}`)
      .then((response) => {
        setUserdata(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setIsLoading(false);
      });
  }, [email]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Profile</h1>
      </div>
      {isLoading ? (
        <div className={styles.loadingSpinner}></div>
      ) : (
        <div className={styles.profileContent}>
          {/* <div className={styles.profilePictureContainer}>
            <img
              className={styles.profilePicture}
              src={`http://localhost:3005/uploads/events${userData?.image}`}
              alt="Profile"
            />
          </div> */}
          <div className={styles.profileInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>First Name:</span>
              <span className={styles.infoValue}>{userData?.first_name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Last Name:</span>
              <span className={styles.infoValue}>{userData?.last_name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>City:</span>
              <span className={styles.infoValue}>{userData?.city}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Telephone:</span>
              <span className={styles.infoValue}>{userData?.phone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{userData?.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Experience (Years):</span>
              <span className={styles.infoValue}>{userData?.years_of_experience}</span>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Link to={`/signup/updateprofile/${email}`} className={styles.button}>Edit Info</Link>
            <Link to={`/login/profile/addevent/${email}`} className={styles.button}>Add Event</Link>
            <Link to={`/login/profile/eventlist/${email}`} className={styles.button}>All Events</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
