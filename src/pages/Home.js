import React from 'react';
import styles from "../assets/styles/Home.module.css"; 
import Header from "../components/common/Header.js"
import Category from "../components/Category";
function Home(){
    return(
        <div className = {styles.container}>
            <Header></Header>
            <div className={styles.centerContent}>
                <h1>Our Services!</h1> 
            </div>
            <div className={styles.categoryContainer}>
                <Category title = "Facilities"></Category>
                <Category title = "Clubs"></Category>
                <Category title = "Courses"></Category>
                <Category title = "Instructors"></Category>
                </div>

        </div>

    )
}
export default Home;