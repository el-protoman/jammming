import React, { useState } from 'react';
import styles from '../styles/Components.module.css';

// SearchBar component
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm); // Pass the search term to onSearch
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter A Song, Album, or Artist" 
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <button onClick={handleSearch}>SEARCH</button>
    </div>
  );
};

export default SearchBar;
