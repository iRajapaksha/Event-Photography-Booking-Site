import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className={styles.home}>
      <img className={styles.homeIcon} alt="" src="../images/navbar/Home.png" />
      <div className={styles.bookmyshoot}>BookMyShoot</div>
      <div className={styles.memorableEventsDont1}>“Memorable events don’t just happen. They happen to be our business”</div>
      <div className={styles.haventSignUp1}>Haven’t Sign Up yet? Sign in here.</div>
      <div className={styles.signUp}>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
