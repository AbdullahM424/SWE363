import React, { useState } from 'react';
import MaterialItem from '../components/MaterialItem';
import UploadFile from '../components/UploadFile';
import styles from '../assets/styles/MaterialStudy.module.css';
import examsIcon from '../assets/images/MatiralStudyImages/exam.png';
import uploadIcon from '../assets/images/MatiralStudyImages/cloud-computing.png';

const OldExamsPage = ({ isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [file, setFile] = useState(null);

  // Dummy data and icon selection
  const [data, setData] = useState({
    "Old Exams": [
      { title: "Old Exam 1", url: "Description of Old Exam 1" },
      { title: "Old Exam 2", url: "Description of Old Exam 2" },
      { title: "Old Exam 3", url: "Description of Old Exam 1" },
      { title: "Old Exam 4", url: "Description of Old Exam 2" },
      { title: "Old Exam 5", url: "Description of Old Exam 1" },
      { title: "Old Exam 6", url: "Description of Old Exam 2" },
      { title: "Old Exam 7", url: "Description of Old Exam 1" },
      { title: "Old Exam 8", url: "Description of Old Exam 2" }
    ]
  });

  const icons = {
    "Old Exams": examsIcon,
  };

  const handleDelete = (index) => {
    const newData = data["Old Exams"].filter((_, i) => i !== index);
    setData({ ...data, ["Old Exams"]: newData });
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


  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFileTitle('');
    setFileDescription('');
    setFile(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.itemList}>
        {data["Old Exams"].map((item, index) => (
          <MaterialItem
            key={index}
            item={item}
            index={index}
            icon={icons["Old Exams"]}
            isAdmin={isAdmin}
            layoutType={"Old Exams"}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onOpenModal={null}
          />
        ))}
      </div>

      <div className={styles.uploadSection}>
        <span className={styles.uploadText}>
          <b>Do you want to upload a file?</b>
        </span>
        <img
          src={uploadIcon}
          alt="Upload icon"
          className={styles.uploadIcon}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <UploadFile
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

export default OldExamsPage;