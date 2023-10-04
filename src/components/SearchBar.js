import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styles from '../styles/Components.module.css';

// SearchBar component
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm); // Pass the search term to onSearch
  };

  return (
    <div className={styles.searchBar}>
      <TextField
        type="text"
        label="Enter A Song, Album, or Artist"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        InputProps={{
          classes: {
            input: styles.searchInput
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>SEARCH</Button>
    </div>
  );
};

export default SearchBar;
