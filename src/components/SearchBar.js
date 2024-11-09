import React from 'react';
import homeStyles from '../assets/styles/Home.module.css';

function SearchBar({ searchText, setSearchText }) {
  return (
    <div className={homeStyles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search for a facility"
        className={homeStyles.searchBar}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
