// ExperienceModal.js
import React from 'react';
import styles from '../assets/styles/MaterialStudy.module.css';
import starIcon from '../assets/images/MatiralStudyImages/star.png';
import emptyStarIcon from '../assets/images/MatiralStudyImages/black-star-silhouette.png';
import experienceIcon from '../assets/images/MatiralStudyImages/experience.png';

const ExperienceModal = ({ experience, onClose, onRate }) => (
  <div className={styles.experienceModal}>
    <div className={styles.experienceContent}>
      <div className={styles.experienceHeader}>
        <img src={experienceIcon} alt="User Icon" className={styles.userIcon} />
        <span>{experience.title}</span>
      </div>
      <div className={styles.experienceBody}>
        <h2>Total: {experience.total}</h2>
        <p>{experience.description}</p>
        <div className={styles.ratingSection}>
          <h3>Rate this experience:</h3>
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={i < experience.rating ? starIcon : emptyStarIcon}
              alt={`${i + 1} star`}
              className={styles.starIcon}
              onClick={() => onRate(i + 1)}
            />
          ))}
        </div>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default ExperienceModal;