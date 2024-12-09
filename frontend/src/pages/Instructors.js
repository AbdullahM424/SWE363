import React, { useState, useEffect } from "react";
import Header from "../components/common/Header.js";
import styles from "../assets/styles/Instructors.module.css";
import InstructorCard from "../components/InstructorCard.js";
import InstructorModal from "../components/InstructorModal.js";

function Instructors() {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructors, setInstructors] = useState([]); // State to hold instructors data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch instructors from the backend
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch("/api/Instructor"); // Backend API endpoint
        if (!response.ok) throw new Error("Failed to fetch instructors");
        const data = await response.json();
        console.log(data+"here")
        setInstructors(data);
        console.log(instructors.length+"here")

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  const openModal = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const closeModal = () => {
    setSelectedInstructor(null);
  };

  if (loading) return <p>Loading instructors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.scrollableGrid}>
        <div className={styles.grid}>
          {instructors.map((instructor, index) => (
            <div key={index} style={{ "--card-index": index }}>
              <InstructorCard
                name={instructor.name}
                department={instructor.department}
                rating={instructor.rating}
                onClick={() => openModal(instructor)}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedInstructor && (
        <InstructorModal
          instructor={selectedInstructor}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Instructors;
