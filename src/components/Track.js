import React from 'react';
import styles from '../styles/Components.module.css';
  
// Track component
const Track = ({ track }) => (
  <div>
    <h3>{track.name}</h3>
    <p>{track.artist}</p>
    <p>{track.album}</p>
  </div>
);

export default Track;
