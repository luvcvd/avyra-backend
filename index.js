const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * This endpoint will handle the verification process.
 * The user will input their Roblox username.
 */
app.post('/verify-roblox', async (req, res) => {
  const { robloxUsername, emojiCode } = req.body;

  try {
    // Fetch the Roblox user profile page HTML
    const response = await axios.get(`https://www.roblox.com/users/${robloxUsername}/profile`);
    
    // Scrape the bio from the profile page (this is a simplified example)
    const bio = response.data.match(/"bio":"(.*?)"/);

    if (bio && bio[1].includes(emojiCode)) {
      // Success: Bio contains the emoji code
      res.status(200).send({ message: 'Verification successful!' });
    } else {
      // Error: Emoji code not found in bio
      res.status(400).send({ message: 'Verification failed. Please ensure your bio has the correct emoji code.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
