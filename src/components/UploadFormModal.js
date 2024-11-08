// UploadFormModal.js
import React from 'react';
import styles from '../assets/styles/MaterialStudy.module.css';


const UploadFormModal = ({ isOpen, onClose, onSubmit, fileTitle, setFileTitle, fileDescription, setFileDescription, setFile, layoutType }) => (
  isOpen && (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{layoutType === "Experiences" ? "Share Your Experience" : "Submit Material"}</h2>
        <form onSubmit={onSubmit}>
          <label>
            {layoutType === "Experiences" ? "Experience Title:" : "File Title:"}
            <input
              type="text"
              value={fileTitle}
              onChange={(e) => setFileTitle(e.target.value)}
              required
            />
          </label>
          {layoutType === "Experiences" && (
            <label>
              Total:
              <input
                type="text"
                placeholder="Enter the total number (e.g., 100)"
                required
              />
            </label>
          )}
          <label>
            {layoutType === "Experiences" ? "Describe Your Experience:" : "Description:"}
            <textarea
              value={fileDescription}
              onChange={(e) => setFileDescription(e.target.value)}
              required
            />
          </label>
          {layoutType !== "Experiences" && (
            <label>
              Upload File:
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </label>
          )}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
);

export default UploadFormModal;