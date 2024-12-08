// MaterialItem.js
import React from 'react';
import styles from '../assets/styles/MaterialStudy.module.css';
import starIcon from '../assets/images/MatiralStudyImages/star.png';
import emptyStarIcon from '../assets/images/MatiralStudyImages/black-star-silhouette.png';
import deleteIcon from '../assets/images/MatiralStudyImages/removed.png';
import downLoadImage from '../assets/images/MatiralStudyImages/arrow.png';

const MaterialItem = ({ item, index, icon, isAdmin, layoutType, onDelete, onDownload, onOpenModal,onRate }) => (
  <div
    className={styles.item}
    onClick={layoutType === "Experiences" ? () => onOpenModal(item) : null}
  >
    <img src={icon} alt="Content icon" className={styles.icon} />
    <span className={styles.title}>{item.title}</span>

    {layoutType === "Experiences" && (
      <div className={styles.ratingDisplay}>
  {[...Array(5)].map((_, i) => (
    <img
      key={i}
      src={i < 5-item.rating ? starIcon : emptyStarIcon} // Correctly compare i with item.rating
      alt={`${i + 1} star`} // Ensure alt text is based on star count
      className={styles.starIcon}
      onClick={() => onRate(i + 1)} // Pass the correct star value (1-indexed)
    />
  ))}
</div>
    )}

    {isAdmin ? (
      <img
        src={deleteIcon}
        alt="Delete icon"
        className={styles.downloadIcon}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
    ) : layoutType !== "Experiences" && (
      <img
        src={downLoadImage}
        alt="Download icon"
        className={styles.downloadIcon}
        onClick={() => onDownload(item)}
      />
    )}
  </div>
);

export default MaterialItem;