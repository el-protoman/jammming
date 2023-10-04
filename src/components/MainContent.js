// MainContent.js
import React from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Playlist from '../components/Playlist';
import Tracklist from '../components/Tracklist';
import styles from '../styles/Home.module.css';
import { Button, Grid } from '@mui/material';

const MainContent = ({
  searchResults,
  addTrackToPlaylist,
  updateSearchResults,
  playlistName,
  playlistTracks,
  updatePlaylistName,
  removeTrackFromPlaylist,
  playlistURIs,
  savePlaylist,
  updateTopTracks,
  topTracks,
  updateRecommendedTracks,
  updateRecommendedTracksPlaylist,
  recommendedTracks,
}) => {
  return (
    <div className={styles.mainContent}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar onSearch={updateSearchResults} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SearchResults tracks={searchResults} onAdd={addTrackToPlaylist} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrackFromPlaylist}
            playlistURIs={playlistURIs}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={savePlaylist}>SAVE PLAYLIST TO SPOTIFY</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={updateTopTracks}>Get Top Tracks</Button>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.topTracks}>
            <h3>Top Tracks</h3>
            <Tracklist tracks={topTracks} onAdd={addTrackToPlaylist} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={updateRecommendedTracks}>Get Recommendations</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={updateRecommendedTracksPlaylist}>Get Recommendations based on Playlist</Button>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.recommendedTracks}>
            <h3>Recommended Tracks</h3>
            <Tracklist tracks={recommendedTracks} onAdd={addTrackToPlaylist} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContent;
