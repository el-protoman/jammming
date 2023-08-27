import React, { useState } from 'react';
import styles from '../styles/Components.module.css';
import Tracklist from './Tracklist';

// Playlist component
function Playlist({ playlistName, playlistTracks, onRemove, playlistURIs, onNameChange }) {
  const [updatedPlaylistName, setUpdatedPlaylistName] = useState(playlistName);

  const handlePlaylistNameChange = (event) => {
    setUpdatedPlaylistName(event.target.value);
    onNameChange(event.target.value);
  };

  const handleRemoveTrack = (track) => {
    onRemove(track);
  };

  return (
    <div className={styles.playlist}>
      <h2>
        <input
          type="text"
          value={updatedPlaylistName} // Use updatedPlaylistName here
          onChange={handlePlaylistNameChange} // Update the function name
          />
      </h2>
      <Tracklist tracks={playlistTracks} onRemove={handleRemoveTrack} /> {/* Use handleRemoveTrack here */}
      <div className={styles.playlistURIs}>
        <h3>Playlist URIs added:</h3>
        <ul>
        {playlistURIs.map(uri => (
  <li key={uri}>{uri}</li>
))}
        </ul>
      </div>
    </div>
  );
}

export default Playlist;
