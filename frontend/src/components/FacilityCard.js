import React, { useState } from 'react';
import styles from '../assets/styles/FaqCard.module.css';

function FacilityCard({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.card}>
            <div onClick={toggleAnswer} className={styles.cardHeader}>
                <span>{question}</span>
                <button className={styles.button}>
                    {isOpen ? '-' : '+'}
                </button>
            </div>
            {isOpen && <div className={styles.answer}>{answer}</div>}
        </div>
    );
}

export default FacilityCard;