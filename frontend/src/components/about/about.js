import React, { Component } from 'react';
import styles from './About.module.css';

class About extends Component {
  render() {
    return (
      <div className={styles.about}>
        <div className={styles.about1}>
          <span>About</span>
          <span className={styles.span}>{` `}</span>
        </div>
        <div className={styles.welcomeToBookmyshootContainer}>
          <p className={styles.welcomeToBookmyshoot}>
            Welcome to BookMyShoot, where moments come to life through the lens!
          </p>
          <p className={styles.atBookmyshootWere}>
            At BookMyShoot, we're passionate about preserving the magic of your special moments. We believe that every event, whether it's a wedding, a milestone birthday, a corporate gathering, or any other occasion, deserves to be captured beautifully. That's why we've created the ultimate platform that connects talented photographers with clients seeking top-tier event photography services.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
