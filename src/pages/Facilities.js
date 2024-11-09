import styles from '../assets/styles/Header.module.css';
import homeStyles from '../assets/styles/Home.module.css';
import FacilitiesList from '../components/FacilitiesList.js';
import SearchBar from '../components/SearchBar';
import Home from "./Home.js";
import Clubs from "./Clubs.js";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from 'react';

function Facilities() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={homeStyles.container}>
      <Router>
        <header className={styles.header}>
          <nav className={styles.navbar}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/">Facilities</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/clubs">Clubs</Link>
              </li>
              <li className={styles.navItem}>Courses</li>
              <li className={styles.navItem}>Instructors</li>
            </ul>
          </nav>
        </header>
        <div className={homeStyles.centerContent}>
          <h1 className={homeStyles.centerContent}>Facilities offered by the university!</h1>
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
        <FacilitiesList searchText={searchText} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Facilities;
