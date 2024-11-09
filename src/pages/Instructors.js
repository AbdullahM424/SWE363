import React, { useState } from 'react';
import Header from "../components/common/Header.js";
import styles from "../assets/styles/Instructors.module.css";
import InstructorCard from '../components/InstructorCard.js';
import InstructorModal from '../components/InstructorModal.js';

function Instructors(){
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const instructors = [
        { name: "Ahmed", department: "ICS", rating: 5 },
        { name: "Sarah", department: "Math", rating: 4 },
        { name: "John", department: "Physics", rating: 3 },
        { name: "Emily", department: "Chemistry", rating: 5 },
        { name: "Michael", department: "Biology", rating: 4 },
        { name: "Sophia", department: "CS", rating: 5 },
        { name: "David", department: "Economics", rating: 3 },
        { name: "Olivia", department: "English", rating: 4 },
        { name: "James", department: "History", rating: 5 },
        { name: "Isabella", department: "Psychology", rating: 4 },
        { name: "Benjamin", department: "Geography", rating: 3 },
        { name: "Mia", department: "Philosophy", rating: 5 },
        { name: "William", department: "Art", rating: 4 },
        { name: "Ava", department: "Music", rating: 5 },
        { name: "Henry", department: "Political Science", rating: 3 },
        { name: "Evelyn", department: "Sociology", rating: 4 },
        { name: "Alexander", department: "Anthropology", rating: 5 },
        { name: "Charlotte", department: "Law", rating: 4 },
        { name: "Daniel", department: "Engineering", rating: 5 },
        { name: "Grace", department: "Environmental Science", rating: 4 },
    ];

    const openModal = (instructor) => {
        setSelectedInstructor(instructor);
    };

    const closeModal = () => {
        setSelectedInstructor(null);
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.scrollableGrid}>
                <div className={styles.grid}>
                    {instructors.map((instructor, index) => (
                        <div key={index} style={{ '--card-index': index }}>
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
