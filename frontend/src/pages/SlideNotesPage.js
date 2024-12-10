import React, { useState, useEffect } from "react";
import MaterialItem from "../components/MaterialItem";
import UploadFile from "../components/UploadFile";
import styles from "../assets/styles/MaterialStudy.module.css";
import slidesIcon from "../assets/images/MatiralStudyImages/book.png";
import uploadIcon from "../assets/images/MatiralStudyImages/cloud-computing.png";
import Header from "../components/common/Header";

const SlideNotesPage = ({ intitial }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileTitle, setFileTitle] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isAdmin, setAdmin] = useState(intitial);
  const [data, setData] = useState({ "Slides Notes": [] });

  // Fetch slides from the server
  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/slides");
      if (!response.ok) throw new Error("Failed to fetch slides");
      const slides = await response.json();
      setData({ "Slides Notes": slides });
    } catch (error) {
      console.error("Failed to fetch slides:", error.message);
    }
  };

  // Run fetchSlides on component mount
  useEffect(() => {
    fetchSlides();
  }, []);

  // Form submission for uploading a file
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!file || !fileTitle) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", fileTitle);
    formData.append("description", fileDescription);
    formData.append("file", file);

    try {
      const response = await fetch("/api/slides/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file");

      alert("File uploaded successfully!");
      fetchSlides(); // Refresh the slides list after upload
      setFileTitle("");
      setFileDescription("");
      setFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Failed to upload the file");
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/slides/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete the slide");
      alert("Slide deleted successfully!");
      fetchSlides(); // Refresh the slides list after delete
    } catch (error) {
      console.error("Error deleting slide:", error.message);
      alert("Failed to delete the slide");
    }
  };

  // Handle download functionality
  const handleDownload = (fileUrl, title) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = title || "file";
    link.click();
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.itemList}>
        {data["Slides Notes"].length > 0 ? (
          data["Slides Notes"].map((item, index) => (
            <MaterialItem
              key={index}
              item={item}
              icon={slidesIcon}
              isAdmin={isAdmin}
              onDelete={() => handleDelete(item._id)}
              onDownload={() => handleDownload(item.fileUrl, item.title)}
            />
          ))
        ) : (
          <p>No slides available</p>
        )}
      </div>
      {isAdmin && (
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
      )}
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
