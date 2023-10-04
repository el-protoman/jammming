import React, { useState } from 'react';
import { TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
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
      <Typography variant="h2">
        <TextField
          type="text"
          value={updatedPlaylistName} // Use updatedPlaylistName here
          onChange={handlePlaylistNameChange} // Update the function name
        />
      </Typography>
      <Tracklist tracks={playlistTracks} onRemove={handleRemoveTrack} /> {/* Use handleRemoveTrack here */}
      <div className={styles.playlistURIs}>
        <Typography variant="h3">Playlist URIs added:</Typography>
        <List>
          {playlistURIs.map(uri => (
            <ListItem key={uri}>
              <ListItemText primary={uri} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Playlist;
