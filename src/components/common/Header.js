import React from 'react';
import styles from "../../assets/styles/Header.module.css"; 
import {Link} from "react-router-dom";


function Header(){
    return (
        <div className={styles.header}>
          <button className={styles.headerButton}>Facilities</button>
          <Link to = "/clubs">
          <button className={styles.headerButton}>Clubs</button>
          </Link>
          <button className={styles.headerButton}>Courses</button>
          <Link  to = "/instructors">
          <button className={styles.headerButton}>Instructors</button>
          </Link>
          
        </div>
      );
}

export default Header;