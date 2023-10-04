import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Spotify from './Spotify';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Player from '../components/Player';

const spotify = new Spotify();

// App component
export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistURIs, setPlaylistURIs] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState(null);

  useEffect(() => {
    updateSearchResults('');
  }, []);

  useEffect(() => {
    if (recommendedTracks.length > 0) {
      const trackURI = recommendedTracks[0].uri;
      const trackID = trackURI.split(':').pop();
      setCurrentTrack(trackID);
    }
  }, [recommendedTracks]);

  useEffect(() => {
    const uris = playlistTracks.map((track) => track.uri);
    setPlaylistURIs(uris);
  }, [playlistTracks]);

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.some((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  // logging track updates
  useEffect(() => {
    console.log('Playlist tracks', playlistTracks);
  }, [playlistTracks]);

  useEffect(() => {
    console.log('Playlist uris', playlistURIs);
  }, [playlistURIs]);

  const updateSearchResults = async (term) => {
    const newResults = await spotify.search(term);
    setSearchResults(newResults);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const removeTrackFromPlaylist = (track) => {
    const updatedTracks = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(updatedTracks);
  };

  const savePlaylist = () => {
    if (!playlistName) {
      return;
    }
    spotify
      .savePlaylist(playlistName, playlistURIs)
      .then((playlistId) => {
        setPlaylistTracks([]);
        setPlaylistName('New Playlist');
        setPlaylistURIs([]);
        setNewPlaylist(playlistId);
      })
      .catch((error) => {
        console.error('Error saving playlist:', error);
      });
  };

  const updateTopTracks = async () => {
    const tracks = await spotify.getTopTracks();
    setTopTracks(tracks);
  };

  const updateRecommendedTracks = async () => {
    try {
      if (topTracks.length > 0) {
        const recTracks = await spotify.getRecommendations(topTracks.map((track) => track.id));
        setRecommendedTracks(recTracks);
      }
    } catch (error) {
      console.error('Error updating recommended tracks:', error);
    }
  };

  const updateRecommendedTracksPlaylist = async () => {
    try {
      if (playlistTracks.length > 0) {
        const recTracks = await spotify.getRecommendations(playlistTracks.map((track) => track.id));
        setRecommendedTracks(recTracks);
        console.log('playlist rec tracks', recTracks);
      }
    } catch (error) {
      console.error('Error updating recommended tracks based on playlist:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <MainContent
        searchResults={searchResults}
        addTrackToPlaylist={addTrackToPlaylist}
        updateSearchResults={updateSearchResults}
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        updatePlaylistName={updatePlaylistName}
        removeTrackFromPlaylist={removeTrackFromPlaylist}
        playlistURIs={playlistURIs}
        savePlaylist={savePlaylist}
        updateTopTracks={updateTopTracks}
        topTracks={topTracks}
        updateRecommendedTracks={updateRecommendedTracks}
        updateRecommendedTracksPlaylist={updateRecommendedTracksPlaylist}
        recommendedTracks={recommendedTracks}
      />
      <Player currentTrack={currentTrack} newPlaylist={newPlaylist} />
    </div>
  );
}
