// Clubs.js
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/common/Header.js";
import styles from "../assets/styles/Clubs.module.css";
import ClubCard from '../components/ClubCard.js';

function Clubs() {
    const [clubNames, setClubNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClubs, setFilteredClubs] = useState([]);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
    };

    useEffect(() => {
        const fetchClubNames = async () => {
            try {
                const response = await fetch('/api/clubs/clubnames');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched club names:', data); // Debugging log
                setFilteredClubs(data); // Initialize filteredClubs with the fetched data
                setClubNames(data);
            } catch (error) {
                console.error('Error fetching club names:', error);
            }
        };

        fetchClubNames();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    useEffect(() => {
        // Update filteredClubs whenever clubNames or searchTerm changes
        setFilteredClubs(
            clubNames.filter((club) => club && club.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, clubNames]);

    return (
        <div className={styles.container}>
            <Header />
            <Link to="/newClub" className={styles.addClubButton}>
                Add your own club?
            </Link>
            <div className={styles.scrollableGrid}>
                {/* Centered Search Bar */}
                <input
                    type="text"
                    placeholder="Search clubs..."
                    className={styles.searchBar}
                    value={searchTerm}
                    onChange={handleSearch}
                />

                {/* Clubs Grid */}
                <div className={styles.clubsGrid}>
                    {filteredClubs.map((club, index) => (
                        <Link
                            to="/clubProfile"
                            style={{ textDecoration: 'none' }}
                            key={index}
                            state={{ clubName: club }}
                        >
                            <ClubCard name={club} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Clubs;
