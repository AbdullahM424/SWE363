// FacilitiesList.js - Component that displays a list of facilities filtered by search text.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/FacilitiesList.module.css';

function FacilitiesList({ searchText = '' }) {
  // List of facilities available
  const facilities = [
    'Building-5',
    'Building-11',
    'Building-22',
    'Stadium',
    'Building-24',
    'Building-76'
  ];

  // Filter facilities based on search text
  const filteredFacilities = facilities.filter(facility =>
    facility.toLowerCase().includes(searchText.toLowerCase())
  );

  const navigate = useNavigate();

  // Handle click on a facility to navigate to its detailed info page
  const handleFacilityClick = (facility) => {
    navigate(`/facility-info/${facility}`);
  };

  return (
    <div className={styles.facilitiesList}>
      {/* Render each filtered facility as a card */}
      {filteredFacilities.map((facility, index) => (
        <div
          key={index}
          className={styles.facilityCard}
          onClick={() => handleFacilityClick(facility)}
        >
          <div className={styles.facilityInfo}>
            <span className={styles.facilityName}>{facility}</span>
            <button className={styles.viewInfoButton}>view info</button>
            <button className={styles.iconButton}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FacilitiesList;
