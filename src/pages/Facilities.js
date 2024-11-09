import React, { useState } from 'react';
import Header from "../components/common/Header.js";
import styles from "../assets/styles/FacilityCard.module.css";
import FaqCard from "../components/FaqCard.js";

function Facilities({ isAdmin }) { // Pass isAdmin prop to check if user is admin
  const [facilities, setFacilities] = useState([
    { facilitie: "Building 22", info: "Best building with all amenities and services, including a café, study rooms, and recreational areas." },
    { facilitie: "Building 23", info: "Modern building with cutting-edge research labs, lecture halls, and seminar rooms designed for collaborative learning." },
    { facilitie: "Building 4", info: "Administrative offices and student support services, offering guidance on enrollment, financial aid, and career counseling." },
    { facilitie: "Building 10", info: "Sports complex with gym, swimming pool, fitness studios, basketball courts, and areas for various fitness programs." },
    
  ]);
  
  
  const [newFacility, setNewFacility] = useState({ facilitie: "", info: "" });

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFacility((prev) => ({ ...prev, [name]: value }));
  };

  // Add new facility
  const addFacility = () => {
    if (newFacility.facilitie && newFacility.info) {
      setFacilities((prev) => [...prev, newFacility]);
      setNewFacility({ facilitie: "", info: "" });
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardContainer}>
        {facilities.map((facility, index) => (
          <FaqCard key={index} question={facility.facilitie} answer={facility.info} />
        ))}
      </div>

      {isAdmin && (
  <div className={styles.adminPanel}>
    <h3>Add a New Building</h3>
    <input
      type="text"
      name="facilitie"
      placeholder="Building Name"
      value={newFacility.facilitie}
      onChange={handleChange}
      className={styles.input}
    />
    <textarea
      name="info"
      placeholder="Building Info"
      value={newFacility.info}
      onChange={handleChange}
      className={styles.textarea}
    />
    <button onClick={addFacility} className={styles.addButton}>Add Facility</button>
  </div>
)}
    </div>
  );
}



export default Facilities;
