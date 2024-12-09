import React, { useState, useEffect } from 'react';
import MaterialItem from '../components/MaterialItem';
import UploadFile from '../components/UploadFile';
import styles from '../assets/styles/MaterialStudy.module.css';
import examsIcon from '../assets/images/MatiralStudyImages/exam.png';
import uploadIcon from '../assets/images/MatiralStudyImages/cloud-computing.png';
import Header from '../components/common/Header';

const OldExamsPage = ({ isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [file, setFile] = useState(null);

  const [data, setData] = useState({ "Old Exams": [] });

  const icons = {
    "Old Exams": examsIcon,
  };

  // Fetch the list of exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('/download-old-exams'); 
        
        if (!response.ok) {
          throw new Error('Failed to fetch old exams');
        }
        const exams = await response.json();
        setData({ "Old Exams": exams });
      } catch (error) {
        console.error(error);
      }
    };
    fetchExams();
  }, []);

  const handleDelete = async (index) => {
    const exam = data["Old Exams"][index];
     try {
       const response = await fetch(`/download-old-exams/${exam._id}`, { method: 'DELETE' });
       if (!response.ok) throw new Error('Failed to delete exam');
     } catch (error) {
       console.error(error);
       return;
     }
  };

  const handleDownload = (item) => {
    //trigger the file download
    window.location.href = `/download-old-exams/${item._id}`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    try {
      const response = await fetch('/upload-old-exams', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Upload success:', result);

      // refetch the exams list to show the added exam
      const refreshed = await fetch('/download-old-exams');
      if (!refreshed.ok) {
        throw new Error('Failed to refetch exams after upload');
      }
      const refreshedExams = await refreshed.json();
      setData({ "Old Exams": refreshedExams });

      setFileTitle('');
      setFileDescription('');
      setFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Error uploading file');
    }
  };

  return (
    <div className={styles.main}>
      <Header />
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