import React from 'react';
import styles from "../../assets/styles/Header.module.css"; 
import {Link} from "react-router-dom";


function Header(){
    return (
        <div className={styles.header}>

          <Link to = "/facilities">
          <button className={styles.headerButton}>Facilities</button>
          </Link>
         
   
          <Link to ="/clubs">
          <button className={styles.headerButton}>Clubs</button>
          </Link>
         
   

          <Link to="/courses">
          <button className={styles.headerButton}>Courses</button>
          </Link>
         
          
          
          <Link to = "/instructors">
          <button className={styles.headerButton}>Instructors</button>
          </Link>
          
        
          
        </div>
      );
}

export default Header;