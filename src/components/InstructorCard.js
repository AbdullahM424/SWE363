import React from 'react';
import styles from '../assets/styles/InstructorCard.module.css';

function InstructorCard({ name, department, rating }) {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.department}>{department}</p>
            </div>
            <hr className={styles.divider} />
            <div className={styles.rating}>
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={index < rating ? styles.filledStar : styles.emptyStar}>★</span>
                ))}
            </div>
        </div>
    );
}

export default InstructorCard;

