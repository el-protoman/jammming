import axios from 'axios';

const REDIRECT_URI = 'http://localhost:3000/callback'; // Update with your actual redirect URI
const CLIENT_ID = process.env.CLIENT_ID; // Update with your Spotify API client ID
const CLIENT_SECRET = process.env.CLIENT_SECRET; // Update with your Spotify API client secret
const SCOPE = 'user-library-read playlist-modify-public'; // Add required scopes

// Function to authenticate the user and get the access token
const authenticate = async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
      }
    );

    const { access_token, expires_in } = response.data;

    // Store access token in a secure way (e.g., database or session)
    // ...

    res.status(200).json({ access_token, expires_in });
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ error: 'Authentication failed' });
  }
};

export default authenticate;
