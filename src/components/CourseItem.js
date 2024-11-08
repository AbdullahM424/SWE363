// CourseItem.js - A reusable component for each course in the list.
import React from 'react';
import styles from '../assets/styles/CourseItem.module.css';

function CourseItem({ courseName }) {
  return (
    // Render the course item with name and hover effects
    <div className={styles.courseItem}>
      <span>{courseName}</span>
    </div>
  );
}

export default CourseItem;
