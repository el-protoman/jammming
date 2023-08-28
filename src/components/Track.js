import React from 'react';
import styles from '../styles/Components.module.css';
  
// Track component
const Track = ({ track }) => {
  const artistName = track.artist ? track.artist : track.artists[0].name;
  const albumName = track.album.name ? track.album.name : track.album;

  return (
    <div>
      <h3>{track.name}</h3>
      <p>{artistName}</p>
      <p>{albumName}</p>
    </div>
  );
};

export default Track;
