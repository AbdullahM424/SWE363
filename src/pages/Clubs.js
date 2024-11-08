import React from 'react';
import Header from "../components/common/Header.js"
import styles from "../assets/styles/Clubs.module.css"
import ClubCard from '../components/ClubCard.js';
import  { useState } from 'react';

function Clubs(){
    const dummyClubs = [
        { name: "Chess Club", url: "https://example.com/chess-club" },
        { name: "Science Club", url: "https://example.com/science-club" },
        { name: "Art Club", url: "https://example.com/art-club" },
        { name: "Music Club", url: "https://example.com/music-club" },
        { name: "Drama Club", url: "https://example.com/drama-club" },
        { name: "Photography Club", url: "https://example.com/photography-club" },
        { name:"Sports",url:"https://example.com/photography-club"},
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClubs, setFilteredClubs] = useState(dummyClubs);
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredClubs(
            dummyClubs.filter((club) => club.name.toLowerCase().includes(term))
        );
    };
    return (
        <div className={styles.container}>
            <Header />
            <button className={styles.addClubButton}>Add your own club?</button>

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
                        <ClubCard key={index} name={club.name} url={club.url} />
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Clubs;