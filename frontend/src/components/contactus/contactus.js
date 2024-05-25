import React from 'react';
import styles from './ContactUs.module.css';

function ContactUs() {
  return (
    <div className={styles.contactUsContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <img className={styles.icon} src="../images/contact/email_3178158 1.png" alt="Email" />
          <p>BookMyShoot@gmail.com</p>
        </div>
        <div className={styles.contactItem}>
          <img className={styles.icon} src="../images/contact/viber_254407 1.png" alt="Phone" />
          <p>076xxxxxxx</p>
        </div>
      </div>
      <div className={styles.socialMedia}>
  
        
      </div>
    </div>
  );
}

export default ContactUs;
