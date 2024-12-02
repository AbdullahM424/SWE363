import React from 'react';
import styles from '../assets/styles/MaterialStudy.module.css';

const UploadFile = ({ isOpen, onClose, onSubmit, fileTitle, setFileTitle, fileDescription, setFileDescription, setFile }) => (
  isOpen && (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Submit Material</h2>
        <form onSubmit={onSubmit}>
          <label>
            File Title:
            <input
              type="text"
              value={fileTitle}
              onChange={(e) => setFileTitle(e.target.value)}
              required
            />
          </label>

          <label>
            File Description:
            <textarea
              value={fileDescription}
              onChange={(e) => setFileDescription(e.target.value)}
              required
            />
          </label>

          <label>
              Upload File:
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
           </label>

          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
);

export default UploadFile;