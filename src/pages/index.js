import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'
import Playlist from '../components/Playlist'
import Spotify from './Spotify'

// App component
export default function App() {
  // Initialize state for search results
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'http://spotify.com'},
    { id: 2, name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
  ]);
  
  // Initialize state for playlist name and tracks
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistURIs, setPlaylistURIs] = useState([]);

  // Function to update search results
  const updateSearchResults = async (term) => {
    const newResults = await Spotify.search(term);
    setSearchResults(newResults);
  };
  
  // Function to update playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Function to add a track to the playlist
  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.some((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };


  const removeTrackFromPlaylist = (track) => {
    const updatedTracks = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(updatedTracks);
  };

  const savePlaylist = () => {
    const uris = playlistTracks.map(track => track.uri);
    setPlaylistURIs(uris);
    if (!playlistName) {
      // Ensure playlist name is provided
      return;
    }
    Spotify.savePlaylist(playlistName, uris)
      .then(() => {
        // Playlist saved successfully, reset state
        setPlaylistTracks([]);
        setPlaylistName('New Playlist');
        setPlaylistURIs([]);
      })
      .catch(error => {
        console.error('Error saving playlist:', error);
        // Handle the error as needed
      });
  };
  
  return (
    <div className={styles.main}>
      <h1>JaMMMing</h1>
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
    </div>
  );
}
