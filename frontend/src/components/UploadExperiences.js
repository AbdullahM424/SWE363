// UploadFormModal.js
import React from 'react';
import styles from '../assets/styles/MaterialStudy.module.css';

const UploadExperiences = ({ isOpen, onClose, onSubmit, experienceTitle, setExperienceTitle, experienceDescription, setExperienceDescription,experienceTotal,setExperienceTotal}) => (
  isOpen && (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Share Your Experience</h2>
        <form onSubmit={onSubmit}>
          <label>
              Experience Title:
              <input
                type="text"
                value={experienceTitle}
                onChange={(e) => setExperienceTitle(e.target.value)}
                required
            />
          </label>
        
          <label>
              Total:
              <input
                type="text"
                placeholder="Enter the total number(e.g.,100)"
                onChange={(e) => setExperienceTotal(e.target.value)}
                required
              />
           </label>

          <label>
            Describe Your Experience:
            <textarea
              value={experienceDescription}
              onChange={(e) => setExperienceDescription(e.target.value)}
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

export default UploadExperiences;