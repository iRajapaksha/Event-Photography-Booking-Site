// import React from 'react';
// import styles from './Frame.module.css';
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
import React from 'react';
import styles from './Frame.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// //http://localhost:3005/api/v1/photographers


const Profile = () => {
  const { email } = useParams();
    const [userData, setUserdata] = useState(null);
    const [isLoading,setIsLoading]= useState(true)
  
    useEffect(() => {
      // Make a request to your API to fetch user details using the email parameter
      axios.get(`http://localhost:3005/api/v1/photographers/${email}`)
        .then((response) => {
          console.log(response.data);
          setUserdata(response.data);
          
          setIsLoading(false) 
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          setIsLoading(false)
        });
    }, [email]);
  
    console.log(userData);  

  return (
    <div className={styles.profileParent}>
      <div className={styles.profile}>Profile</div>
      {isLoading ? (<p>Loading..</p>):(
        <>
         {/* <div className={styles.profilePictureContainer}>
        <img
          className={styles.profilePicture}
          src={`http://localhost:3005/uploads/events${userData?.image}`}
          alt="Profile "
        />
        </div> */}
        <Link to={`/signup/updateprofile/${email}`}>Edit Info</Link>

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
          <span className={styles.infoLabel}>Experience(Year):</span>
          <span className={styles.infoValue}>{userData?.years_of_experience}</span>
        </div>
      </div>
        
        </>
      )}
      <div className={styles.addEvent}>
        <Link to={`/login/profile/addevent/${email}`}>Add Event</Link>
      </div>
      <div className={styles.allEvents}>
        <Link to={`/login/profile/eventlist/${email}`}>All Events</Link>
      </div>
    </div>
  );
};

export default Profile;
