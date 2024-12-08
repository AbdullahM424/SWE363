import React, { useState } from 'react';
import MaterialItem from '../components/MaterialItem';
import ExperienceModal from '../components/ExperienceModal';
import styles from '../assets/styles/MaterialStudy.module.css';
import experienceIcon from '../assets/images/MatiralStudyImages/experience.png';
import uploadIcon from '../assets/images/MatiralStudyImages/cloud-computing.png';
import UploadExperiences from '../components/UploadExperiences';
import Header from '../components/common/Header';

const ExperiencesPage = ({ isAdmin }) => {
  const { state } = useLocation();
  const { selectedCourse } = state || {};
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experienceTitle, setExperienceTitle] = useState('');
  const [experienceDescription, setExperienceDescription] = useState('');
  const [experienceTotal, setExperienceTotal] = useState('');

  // Fetch experiences from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      if (!selectedCourse) return;
      try {
        const response = await fetch(`/api/experiences/${selectedCourse.name}`);
        if (!response.ok) throw new Error("Failed to fetch experiences.");
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, [selectedCourse]);

  // Handle new experience submission (admin-only)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert("You don't have permission to perform this action.");
      return;
    }

    if (!experienceTitle || !experienceDescription || !experienceTotal) {
      alert("All fields are required.");
      return;
    }

    try {
      const newExperience = {
        courseName: selectedCourse.courseName,
        title: experienceTitle,
        description: experienceDescription,
        total: experienceTotal, // Include the total field
      };

      const response = await fetch('/api/experiences/', {
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
  const handleRate = async (experienceId, userRating) => {
    try {
      const response = await fetch(`/api/experiences/rate/${experienceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: userRating }),
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
     <Header></Header> 
    <div className={styles.itemList}>
      {data["Experiences"].map((item, index) => (
        <MaterialItem
          key={index}
          item={item}
          index={index}
          icon={icons["Experiences"]}
          isAdmin={isAdmin}
          layoutType={"Experiences"}
          onDelete={handleDelete}
          onDownload={console.log("......")}
          onOpenModal={setSelectedExperience}
          onRate={(rating) => handleRate(item._id, rating)}
        />
      ))}
    </div>

    {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onRate={(rating) => handleRate(item._id, rating)}
        />
      )}

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

      <UploadExperiences
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        experienceTitle={experienceTitle}
        setExperienceTitle={setExperienceTitle}
        experienceDescription={experienceDescription}
        setExperienceDescription={setExperienceDescription}
      />
    </div>

    
  );
};

export default ExperiencesPage;
