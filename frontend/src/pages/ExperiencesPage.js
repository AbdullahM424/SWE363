import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MaterialItem from '../components/MaterialItem';
import ExperienceModal from '../components/ExperienceModal';
import styles from '../assets/styles/MaterialStudy.module.css';
import experienceIcon from '../assets/images/MatiralStudyImages/experience.png';
import uploadIcon from '../assets/images/MatiralStudyImages/cloud-computing.png';
import UploadExperiences from '../components/UploadExperiences';
import Header from '../components/common/Header';

const ExperiencesPage = ({ intitial }) => {
  const location = useLocation();
  const { courseName } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [experienceTitle, setExperienceTitle] = useState('');
  const [experienceDescription, setExperienceDescription] = useState('');
  const [experienceTotal, setExperienceTotal] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [isAdmin,setAdmin] = useState(intitial);
  console.log(courseName)
  // Fetch experiences from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`/api/experiences/${courseName}`); // Adjust endpoint as needed
        if (!response.ok) throw new Error("Failed to fetch experiences.");
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };  
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

    fetchExperiences();
  }, []);

  // Handle new experience submission (admin-only)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(experienceTotal)
    if (!experienceTitle || !experienceDescription || !experienceTotal) {
      alert("All fields are required.");
      return;
    }

    try {
      const newExperience = {
        courseName:courseName,
        title: experienceTitle,
        description: experienceDescription,
        total: experienceTotal,
      };

      const response = await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExperience),
      });

      if (!response.ok) throw new Error("Failed to add experience.");
      const createdExperience = await response.json();
      setExperiences((prevExperiences) => [...prevExperiences, createdExperience]);
      setExperienceTitle('');
      setExperienceDescription('');
      setExperienceTotal('');
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  // Handle experience deletion (admin-only)
  const handleDelete = async (experienceId) => {
    if (!isAdmin) {
      alert("You don't have permission to perform this action.");
      return;
    }

    try {
      const response = await fetch(`/api/experiences/${experienceId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Failed to delete experience.");
      setExperiences((prevExperiences) => prevExperiences.filter((exp) => exp._id !== experienceId));
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  // Handle rating submission
  const handleRating = async (experienceId, rating) => {
    try {
      const response = await fetch(`/api/experiences/rate/${experienceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) throw new Error("Failed to update rating.");
      const updatedExperience = await response.json();

      setExperiences((prevExperiences) =>
        prevExperiences.map((exp) =>
          exp._id === updatedExperience._id ? updatedExperience : exp
        )
      );
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.itemList}>
        {experiences.map((item, index) => (
          <MaterialItem
            key={item._id}
            item={item}
            index={index}
            icon={experienceIcon}
            isAdmin={isAdmin}
            layoutType={"Experiences"}
            onDelete={() => handleDelete(item._id)}
            onRate={(i)=> console.log(">>>>")}
            onOpenModal={setSelectedExperience}
          />
        ))}
      </div>

      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onRate={(rating) => handleRating(selectedExperience._id, rating)}
        />
      )}

      { (
        <div className={styles.uploadSection}>
          <span className={styles.uploadText}>
            <b>Do you have an experience to share?</b>
          </span>
          <img
            src={uploadIcon}
            alt="Upload icon"
            className={styles.uploadIcon}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}

      <UploadExperiences
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        experienceTitle={experienceTitle}
        setExperienceTitle={setExperienceTitle}
        experienceDescription={experienceDescription}
        setExperienceDescription={setExperienceDescription}
        experienceTotal={experienceTotal}
        setExperienceTotal={setExperienceTotal}
      />
    </div>
  );
};

export default ExperiencesPage;
;                                                                                                                            // UploadFormModal.js
