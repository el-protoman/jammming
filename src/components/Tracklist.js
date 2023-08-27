import React from 'react';
import styles from '../styles/Components.module.css';
import Track from './Track';

// Tracklist component
const Tracklist = ({ tracks, onAdd, onRemove }) => (
  <div>
    {tracks.map((track) => (
      <div key={track.id} className={styles.track}>
        <Track track={track} />
        {onAdd && <button onClick={() => onAdd(track)}>Add</button>}
        {onRemove && <button onClick={() => onRemove(track)}>Remove</button>}
      </div>
    ))}
  </div>
);

export default Tracklist;
