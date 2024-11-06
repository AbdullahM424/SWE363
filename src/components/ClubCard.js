import React from 'react';
import styles from "../assets/styles/ClubCard.module.css";

function ClubCard(props){
    const gradientBackgrounds = [
        "linear-gradient(135deg, #4a90e2, #d3d3d3)", // Gradient blue and gray
        "linear-gradient(135deg, #e94e77, #d3d3d3)", // Gradient red and gray
        "linear-gradient(135deg, #7fd1e8, #d3d3d3)", // Gradient light blue and gray
        "linear-gradient(135deg, #333333, #d3d3d3)", // Gradient black and gray
    ];

    // Pick a random background
    const randomBackground = gradientBackgrounds[Math.floor(Math.random() * gradientBackgrounds.length)];
    return(
        <div className={styles.clubCard}   style={{
            backgroundImage: randomBackground,
            animationDelay: `${props.index * 0.2}s`, // Delay each card slightly more than the previous one
        }}>
        <h3 className={styles.clubName}>{props.name}</h3>
        </div>
    );
}

export default ClubCard;