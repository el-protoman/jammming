// /pages/api/spotifySearch.js
const searchSpotify = async (accessToken, searchTerm) => {
    const searchEndpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(searchTerm)}`;
    
    try {
      const response = await fetch(searchEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists.map(artist => artist.name).join(', '),
          album: track.album.name,
          uri: track.uri,
        }));
      } else {
        throw new Error('Search request failed.');
      }
    } catch (error) {
      console.error('Error searching Spotify:', error);
      return [];
    }
  };
  
  export default searchSpotify;
  