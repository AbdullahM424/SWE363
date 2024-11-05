import React from 'react';
import styles from "../assets/styles/Home.module.css"; 
import Header from "../components/common/Header.js"
function Home(){
    return(
        <div className = {styles.container}>
            <Header></Header>
            <div className={styles.centerContent}>
                <h1>Our Services!</h1>
            </div>

        </div>

    )
}
export default Home;