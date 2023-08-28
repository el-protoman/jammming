import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'
import Playlist from '../components/Playlist'
import Spotify from './Spotify'

const spotify = new Spotify();


// App component
export default function App() {
  // Initialize state for search results
  
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistURIs, setPlaylistURIs] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null); // Added state for current track

  // Fetch initial data when the component mounts
  useEffect(() => {
    // Fetch some initial data using a default search term or an empty term
    updateSearchResults('');
  }, []);

  // Function to update search results
  const updateSearchResults = async (term) => {
    const newResults = await spotify.search(term);
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
    spotify.savePlaylist(playlistName, uris)
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

  const updateTopTracks = async () => {
    const tracks = await spotify.getTopTracks();
    setTopTracks(tracks);
  };

  const updateRecommendedTracks = async () => {
    const recTracks = await spotify.getRecommendations(topTracks.map(track => track.id));
    setRecommendedTracks(recTracks);
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
      <button onClick={updateTopTracks}>Get Top Tracks</button>
      <div className={styles.topTracks}>
        <h3>Top Tracks</h3>
        <ul>
          {topTracks.map(track => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={updateRecommendedTracks}>Get Recommendations</button>
      <div className={styles.recommendedTracks}>
        <h3>Recommended Tracks</h3>
        <ul>
          {recommendedTracks.map(track => (
            <li key={track.id}>
              {`${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`}
              <button onClick={() => addTrackToPlaylist(track)}>Add to Playlist</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Embed Spotify Web Player */}
      {currentTrack && (
        <iframe 
          src={`https://open.spotify.com/embed/track/${currentTrack}`} 
          width="300" 
          height="380" 
          frameborder="0" 
          allowtransparency="true" 
          allow="encrypted-media">
        </iframe>
      )}
    </div>
  );
}

