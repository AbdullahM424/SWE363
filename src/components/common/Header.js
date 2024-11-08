import React from 'react';
import styles from "../../assets/styles/Header.module.css"; 
import {Link} from "react-router-dom";


function Header(){
    return (
        <div className={styles.header}>
          <button className={styles.headerButton}>Facilities</button>
         
          <button className={styles.headerButton}>Clubs</button>
         
         
          <button className={styles.headerButton}>Courses</button>
          
          <button className={styles.headerButton}>Instructors</button>
          
          
        </div>
      );
}

export default Header;