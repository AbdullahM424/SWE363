// MaterialList.js
import React, { useState } from 'react';
import MaterialItem from '../components/MaterialItem';
import ExperienceModal from '../components/ExperienceModal';
import UploadFormModal from '../components/UploadFormModal';
import styles from '../assets/styles/MaterialStudy.module.css';
import slidesIcon from '../assets/images/MatiralStudyImages/book.png';
import examsIcon from '../assets/images/MatiralStudyImages/exam.png';
import experienceIcon from '../assets/images/MatiralStudyImages/experience.png';
import uploadIcon from '../assets/images/MatiralStudyImages/cloud-computing.png';
import Header from "../components/common/Header.js"

const MaterialList = ({ selectedLayout, isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [file, setFile] = useState(null);

  // Dummy data and icon selection
  const [data, setData] = useState({
    "Slides Notes": [
      { title: "Slide Note 1", url: "Description of Slide Note 1" },
      { title: "Slide Note 2", url: "Description of Slide Note 2" },
      { title: "Slide Note 3", url: "Description of Slide Note 1" },
      { title: "Slide Note 4", url: "Description of Slide Note 2" }
    ],
    "Old Exams": [
      { title: "Old Exam 1", url: "Description of Old Exam 1" },
      { title: "Old Exam 2", url: "Description of Old Exam 2" },
      { title: "Old Exam 3", url: "Description of Old Exam 1" },
      { title: "Old Exam 4", url: "Description of Old Exam 2" }
    ],
    "Experiences": [
      { title: "Experience 1", description: "Details of Experience 1", total: "100", rating: 3 },
      { title: "Experience 2", description: "Details of Experience 2", total: "90", rating: 5 },
      { title: "Experience 3", description: "Details of Experience 1", total: "100", rating: 0 },
      { title: "Experience 4", description: "Details of Experience 2", total: "90", rating: 1 }
    ]
  });
  //dummy Icons
  const icons = {
    "Slides Notes": slidesIcon,
    "Old Exams": examsIcon,
    "Experiences": experienceIcon
  };
  
  const handleDelete = (index) => {
    const newData = data[selectedLayout].filter((_, i) => i !== index);
    setData({ ...data, [selectedLayout]: newData });
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
    setFileTitle('');
    setFileDescription('');
    setFile(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.main}>
        <Header></Header>
      <div className={styles.itemList}>
        {data[selectedLayout].map((item, index) => (
          <MaterialItem
            key={index}
            item={item}
            index={index}
            icon={icons[selectedLayout]}
            isAdmin={isAdmin}
            layoutType={selectedLayout}
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
        <span className={styles.uploadText}><b>Do you want to upload a file?</b></span>
        <img
          src={uploadIcon}
          alt="Upload icon"
          className={styles.uploadIcon}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <UploadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        fileTitle={fileTitle}
        setFileTitle={setFileTitle}
        fileDescription={fileDescription}
        setFileDescription={setFileDescription}
        setFile={setFile}
      />
    </div>
  );
};

export default MaterialList;