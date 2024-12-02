import React, { useState } from 'react';
import MaterialItem from '../components/MaterialItem';
import ExperienceModal from '../components/ExperienceModal';
import styles from '../assets/styles/MaterialStudy.module.css';
import experienceIcon from '../assets/images/MatiralStudyImages/experience.png';
import uploadIcon from '../assets/images/MatiralStudyImages/cloud-computing.png';
import UploadExperiences from '../components/UploadExperiences';
import Header from '../components/common/Header';

const ExperiencesPage = ({ isAdmin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [experienceTitle, setExperienceTitle] = useState('');
    const [experienceDescription, setExperienceDescription] = useState('');


    const [data, setData] = useState({
        "Experiences": [
          { title: "Experience 1", description: "Details of Experience 1", total: "100", rating: 3 },
          { title: "Experience 2", description: "Details of Experience 2", total: "90", rating: 5 },
          { title: "Experience 3", description: "Details of Experience 3", total: "95", rating: 0 },
          { title: "Experience 4", description: "Details of Experience 4", total: "88", rating: 4 },
          { title: "Experience 5", description: "Details of Experience 5", total: "91", rating: 3 },
          { title: "Experience 6", description: "Details of Experience 6", total: "100", rating: 5 },
          { title: "Experience 7", description: "Details of Experience 7", total: "85", rating: 1 },
          { title: "Experience 8", description: "Details of Experience 8", total: "92", rating: 3 }
          
        ]
      });

    const icons = {
        "Experiences": experienceIcon
      };
      
    const handleDelete = (index) => {
        const newData = data["Experiences"].filter((_, i) => i !== index);
        setData({ ...data, ["Experiences"]: newData });
      };

    const handleRating = (rating) => {
        setSelectedExperience((prevExperience) => {
          const updatedExperience = { ...prevExperience, rating };
          const updatedData = data["Experiences"].map((exp) =>
            exp.title === updatedExperience.title ? updatedExperience : exp
          );
          setData({ ...data, "Experiences": updatedData });
          return updatedExperience;
        });
      };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setExperienceTitle('');
        setExperienceDescription('');
        setIsModalOpen(false);
      };

    const handleDownload = (item) => {
        const fileContent = `Title: ${item.title}\nDescription: ${item.url}`;
        const blob = new Blob([fileContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = `${item.title}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        URL.revokeObjectURL(url);
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
          onDownload={handleDownload}
          onOpenModal={setSelectedExperience}
        />
      ))}
    </div>

    {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onRate={handleRating}
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
        setFileDescription={setExperienceDescription}
      />
    </div>

    
  );
};

export default ExperiencesPage;
