// CoursePage.js - Main page for listing courses and providing navigation to slides, old exams, and experiences.
import React, { useState } from 'react';
import styles from '../assets/styles/CoursePage.module.css';
import SearchBar from '../components/SearchBar';
import CourseItem from '../components/CourseItem';
import { Link } from 'react-router-dom';

function CoursePage() {
  const [searchText, setSearchText] = useState('');
  
  // Array of course names to be displayed in the course list
  const courses = [
    'SWE 363',
    'IAS 212',
    'ME 210',
    'ICS 202',
    'Math 101',
    'Math 102',
    'Phys 101',
    'Phys 102',
    'ICS 108',
    'STAT 319'
  ];

  // Filter courses based on the search text
  const filteredCourses = courses.filter(course =>
    course.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Sidebar for search and course list */}
      <div className={styles.sidebar}>
        <SearchBar searchText={searchText} setSearchText={setSearchText} placeholder="Search for Course" />
        <div className={styles.courseList}>
          {/* Render a list of filtered courses */}
          {filteredCourses.map((course, index) => (
            <CourseItem key={index} courseName={course} />
          ))}
        </div>
      </div>
      {/* Main content for navigating to different resources */}
      <div className={styles.mainContent}>
        <Link to="/slides-notes" className={styles.largeButton}>
          <img src="../assets/images/slides.png" alt="Slides Notes" className={styles.buttonImage} />
          <span>Slides Notes</span>
        </Link>
        <Link to="/old-exams" className={styles.largeButton}>
          <img src="../assets/images/exams.png" alt="Old Exams" className={styles.buttonImage} />
          <span>Old Exams</span>
        </Link>
        <Link to="/experiences" className={styles.largeButton}>
          <img src="../assets/images/experiences.png" alt="Experiences" className={styles.buttonImage} />
          <span>Experiences</span>
        </Link>
      </div>
    </div>
  );
}

export default CoursePage;
