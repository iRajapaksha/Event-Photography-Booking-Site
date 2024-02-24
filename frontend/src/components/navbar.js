import React from 'react';
import styles from './navbar.module.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className={styles.navbar}>
 
      <div className={styles.bookmyshoot}>BookMyShoot</div>
      <div className={styles.home}>
        <Link to="/">Home</Link>
      </div>
      <div className={styles.services}>
        <Link to="/events">Events</Link>
      </div>
      <div className={styles.about}>
        <span>
          <Link to="/about">About</Link>
        </span>
      </div>
      <div className={styles.contact}>
        <span>
          <Link to="/contact">Contact</Link>
        </span>
      </div>
      <div className={styles.login}>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default NavBar;
