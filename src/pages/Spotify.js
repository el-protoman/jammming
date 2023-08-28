import React, { Component } from 'react';

class Spotify extends Component {
  constructor(props) {
    super(props);
    this.clientId = "046c082b14bc41eebf0a85ab6b7ba350";
    this.redirectUri = "https://jammming-dev.vercel.app/";
    this.accessToken = null;
  }

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }
    //check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      this.accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (this.accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return this.accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectUri}`;
      window.location = accessUrl;
    }
  }

  search(term) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  }

  async fetchWebApi(endpoint, method, body) {
    const accessToken = this.getAccessToken();
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async getTopTracks() {
    const response = await this.fetchWebApi(
      'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
    );
    return response.items;
  }

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch("https://api.spotify.com/v1/me", { headers: headers }) // vaja kontrollida Spotify dok
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  }

  render() {
    return null;
  }
}

export default Spotify;