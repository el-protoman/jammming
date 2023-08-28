// MainContent.js
import React from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Playlist from '../components/Playlist';
import Tracklist from '../components/Tracklist';
import styles from '../styles/Home.module.css';

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
  recommendedTracks,
}) => {
  return (
    <div className={styles.mainContent}>
      <SearchBar onSearch={updateSearchResults} />
      <div className={styles.sub}>
        <SearchResults tracks={searchResults} onAdd={addTrackToPlaylist} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onNameChange={updatePlaylistName}
          onRemove={removeTrackFromPlaylist}
          playlistURIs={playlistURIs}
        />
      </div>
      <button onClick={savePlaylist}>SAVE TO SPOTIFY</button>
      <button onClick={updateTopTracks}>Get Top Tracks</button>
      <div className={styles.topTracks}>
        <h3>Top Tracks</h3>
        <Tracklist tracks={topTracks} onAdd={addTrackToPlaylist} />
      </div>
      <button onClick={updateRecommendedTracks}>Get Recommendations</button>
      <div className={styles.recommendedTracks}>
        <h3>Recommended Tracks</h3>
        <Tracklist tracks={recommendedTracks} onAdd={addTrackToPlaylist} />
      </div>
    </div>
  );
};

export default MainContent;
