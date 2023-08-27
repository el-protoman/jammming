import React from 'react';
import styles from '../styles/Components.module.css';
import Tracklist from './Tracklist';

// SearchResults component
function SearchResults({ tracks, onAdd }) {
  const handleAddTrack = (track) => {
    onAdd(track);
  };

  return (
    <div className={styles.searchResults}>
      <h2>Search Results</h2>
      <Tracklist tracks={tracks} onAdd={handleAddTrack} />
    </div>
  );
}

export default SearchResults;
