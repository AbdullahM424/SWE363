import React, { useState,useEffect } from 'react';
import MaterialItem from '../components/MaterialItem';
import UploadFile from '../components/UploadFile';
import styles from '../assets/styles/MaterialStudy.module.css';
import slidesIcon from '../assets/images/MatiralStudyImages/book.png';
import uploadIcon from '../assets/images/MatiralStudyImages/upload.png';
import Header from '../components/common/Header';

const SlideNotesPage = ({ intitial }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isAdmin,setAdmin] = useState(intitial);
  // Dummy data and icon selection
  const [data, setData] = useState({
    "Slides Notes": [
      { title: "Slide Note 1", url: "Description of Slide Note 1" },
      { title: "Slide Note 2", url: "Description of Slide Note 2" },
      { title: "Slide Note 3", url: "Description of Slide Note 1" },
      { title: "Slide Note 4", url: "Description of Slide Note 2" },
      { title: "Slide Note 5", url: "Description of Slide Note 1" },
      { title: "Slide Note 6", url: "Description of Slide Note 2" },
      { title: "Slide Note 7", url: "Description of Slide Note 1" },
      { title: "Slide Note 8", url: "Description of Slide Note 2" },
      { title: "Slide Note 9", url: "Description of Slide Note 1" },
      { title: "Slide Note 10", url: "Description of Slide Note 2" },
    ]
  });
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

  const icons = {
    "Slides Notes": slidesIcon,
  };

  const handleDelete = (index) => {
    const newData = data["Slides Notes"].filter((_, i) => i !== index);
    setData({ ...data, ["Slides Notes"]: newData });
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
        <Header></Header> 
      <div className={styles.itemList}>
        {data["Slides Notes"].map((item, index) => (
          <MaterialItem
            key={index}
            item={item}
            index={index}
            icon={icons["Slides Notes"]}
            isAdmin={isAdmin}
            layoutType={"Slides Notes"}
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

export default SlideNotesPage;