// InstructorModal.js
import React, { useState } from 'react';
import styles from '../assets/styles/InstructorModal.module.css';

function InstructorModal({ instructor, onClose }) {
    const [rating1, setRating1] = useState(0);
    const [rating2, setRating2] = useState(0);
    const [rating3, setRating3] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose(); // Close the modal on submit
    };

    const renderStars = (rating, setRating) => (
        Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={index < rating ? styles.starFilled : styles.star}
                onClick={() => setRating(index + 1)}
            >★</span>
        ))
    );

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Rate {instructor.name} from {instructor.department}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.rating}>
                        <label>Teaching Quality:</label>
                        <div>{renderStars(rating1, setRating1)}</div>
                    </div>
                    <div className={styles.rating}>
                        <label>Communication Skills:</label>
                        <div>{renderStars(rating2, setRating2)}</div>
                    </div>
                    <div className={styles.rating}>
                        <label>Knowledge of Subject:</label>
                        <div>{renderStars(rating3, setRating3)}</div>
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default InstructorModal;
