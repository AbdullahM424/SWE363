import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/CoursePage.module.css';
import slidesIcon from '../assets/images/MatiralStudyImages/book.png';
import examsIcon from '../assets/images/MatiralStudyImages/exam.png';
import experienceIcon from '../assets/images/MatiralStudyImages/experience.png';
import deleteIcon from '../assets/images/MatiralStudyImages/removed.png';
import {Link} from "react-router-dom";
import Header from '../components/common/Header';
import { useNavigate } from 'react-router-dom';

const CoursePage = ({ intitial }) => {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isAdmin,setAdmin] = useState(intitial);
  useEffect(()=>{
    const getType =async ()=>{
      try{
        const token = localStorage.getItem("token");
        const response = await fetch("/api/users/type",{
          headers:{
            "x-auth":token
          },
        });
        const data  = await response.json();
        const type = data.type;
        console.log(type)
        if(type==="admin"){
          setAdmin(true)
        }
        else{
          setAdmin(false)
        }
      }
      catch(err){
        console.log(err.message)
      }
     
    } 

    getType();
  },[]);

  //Fetch the backnd of the courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses/allCourses'); 
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data); 
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);
  
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    window.history.pushState(null, '', window.location.pathname); // Push new history state
  };


  const handleDeleteClick = (event, course) => {
    event.stopPropagation();
    setCourseToDelete(course.courseName);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch('/api/courses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseName: courseToDelete }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseName !== courseToDelete)
      );
      setShowConfirmation(false);
      setCourseToDelete(null);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setCourseToDelete(null);
  };

  useEffect(() => {
    // Listener for back button press
    const handlePopState = () => {
      setSelectedCourse(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToExperiencePage = () => {
      console.log(selectedCourse)
      navigate('/experience', { state: { courseName: selectedCourse } }); // Pass selectedCourse using state
  
  };

  return (
    <div>
      <Header></Header>
    <div className={styles.container}>
      <div className={`${styles.courseList} ${selectedCourse ? styles.mobileHidden : ''}`}>
        <h2 className={styles.courseTitle}>Available Courses</h2>
        <input
          type="text"
          placeholder="Search for a course..."
          className={styles.searchBox}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.courseItems}>
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className={styles.courseItem}
              onClick={() => handleCourseSelect(course.courseName)}
            >
              <span>{course.courseName}</span>
              {isAdmin && (
                <img
                  src={deleteIcon}
                  alt="Delete Course"
                  className={styles.deleteIcon}
                  onClick={(event) => handleDeleteClick(event, course)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {showConfirmation && (
        <div className={styles.confirmationModal}>
          <p>
            Are you sure you want to delete <strong>{courseToDelete}</strong>?
            <br />
            This will remove all materials for this course.
          </p>
          <button onClick={confirmDelete} className={styles.confirmButton}>Confirm</button>
          <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
        </div>
      )}

      <div className={`${styles.rightPanel} ${!selectedCourse && styles.mobileHidden}`}>
        {selectedCourse ? (
          <>
            <h1 className={styles.selectedCourseTitle}>{selectedCourse}</h1>
            <div className={styles.layoutOptions}>
              <Link to ="/slides" style={{textDecoration:"none"}}>
              <div className={styles.option} onClick={() => console.log("Slides Notes Selected")}>
                <img src={slidesIcon} alt="Slides Notes" />
                <p className={styles.choiceText}>Slides Notes</p>
              </div></Link>

              <Link to ="/oldExams" style = {{textDecoration:"none"}}>
              <div className={styles.option} onClick={() => console.log("Old Exams Selected")}>
                <img src={examsIcon} alt="Old Exams" />
                <p className={styles.choiceText}>Old Exams</p>
              </div>
              </Link>
             <div className={styles.option} onClick={goToExperiencePage}>
                <img src={experienceIcon} alt="Experiences" />
                <p className={styles.choiceText}>Experiences</p>
              </div>
              
              
            </div>
          </>
        ) : (
          <div className={styles.welcomeMessage}>Welcome to KFUPM Kickstart<br /><br />Select a course to view content</div>
        )}
      </div>
    </div>
    </div>

  );
};

export default CoursePage;
