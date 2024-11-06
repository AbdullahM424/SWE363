import React from 'react';
import Header from "../components/common/Header.js"
import styles from "../assets/styles/Clubs.module.css"
import ClubCard from '../components/ClubCard.js';

function Clubs(){
    const dummyClubs = [
        { name: "Chess Club", url: "https://example.com/chess-club" },
        { name: "Science Club", url: "https://example.com/science-club" },
        { name: "Art Club", url: "https://example.com/art-club" },
        { name: "Music Club", url: "https://example.com/music-club" },
        { name: "Drama Club", url: "https://example.com/drama-club" },
        { name: "Photography Club", url: "https://example.com/photography-club" },
        { name:"Sports",url:"https://example.com/photography-club"}
        
    ];
    return(
        <div className={styles.container}>
            <Header></Header>
            <button className={styles.addClubButton}>Add your own club?</button>
            <div className= {styles.clubsGrid}>
            {dummyClubs.map((club,index)=>{
                return <ClubCard key = {index} name = {club.name} index = {index}></ClubCard>
            })}
            </div>
           
        </div>
    );

}

export default Clubs;