import React from 'react';
import styles from "../assets/styles/Home.module.css"; 
import Header from "../components/common/Header.js"
import Category from "../components/Category";
import {Link} from "react-router-dom";
function Home(){
    const title = "Our Services!";
    return(// the unicode "u00A0" is a white space
        <div className = {styles.container}>
            <Header></Header>
            <div className={styles.centerContent}>
                <h1>
                    {title.split("").map((letter, index) => ( //wrapping each letter with a span to control the animation
                       <span
                       key={index}
                       className={styles.animatedLetter}
                       style={{ animationDelay: `${index * 0.1}s` }} >
                       {letter === " " ? "\u00A0" : letter} 
                   </span>
                    ))}
            
                </h1>
            </div>
            <div className={styles.categoryContainer}>
                <Category title = "Facilities"></Category>
                <Link to="/clubs" style={{ textDecoration: 'none' }}>
                    <Category title="Clubs" />
                </Link>
                <Category title = "Courses"></Category>
                <Category title = "Instructors"></Category>
                </div>

        </div>

    );
}
export default Home;