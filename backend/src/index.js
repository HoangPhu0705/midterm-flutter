const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

const { ZingMp3 } = require("zingmp3-api-full");
const db = require('./firebase');
app.use(cors());
app.use(express.json()); 



app.get('/soundcharm/api/recent-songs', async (req, res) =>{
  try {
      const homeData = await ZingMp3.getHome();
      
      const items = homeData.data.items[2].items.all;
      const songs =  await Promise.all(items.map(async (item) => {
          var songData = await ZingMp3.getSong(item.encodeId);
          var audioUrl = songData.data?.['128'];
          if (audioUrl) {
              return {
                  id: item.encodeId,
                  title: item.title,
                  artist: item.artistsNames,
                  albumArtUrl: item.thumbnailM,
                  audioUrl: audioUrl,
              };
          }
      })).then(results => results.filter(Boolean));
      res.json(songs);

  } catch (err) {
      console.error(err);
  }
})

app.post('/soundcharm/api/add-favorite', async (req, res) => {
  try {
    const { userId, song } = req.body;

    if (!userId || !song) {
      return res.status(400).json({ error: 'userId and song are required' });
    }

    const favoriteRef = db.collection('users').doc(userId).collection('favorites').doc(song.id);
    await favoriteRef.set(song);

    res.status(200).json({ message: 'Song added to favorites' });
  } catch (error) {
    console.error('Error adding favorite song:', error);
    res.status(500).json({ error: 'Failed to add favorite song' });
  }
});


app.get('/soundcharm/api/favorites/:userId', async (req, res) => {
  try {
      const { userId } = req.params;

      if (!userId) {
          return res.status(400).json({ error: 'userId is required' });
      }

      const favoritesRef = db.collection('users').doc(userId).collection('favorites');
      const snapshot = await favoritesRef.get();
      
      if (snapshot.empty) {
          return res.status(200).json([]);
      }

      const favorites = snapshot.docs.map(doc => doc.data());
      res.status(200).json(favorites);
  } catch (error) {
      console.error('Error fetching favorite songs:', error);
      res.status(500).json({ error: 'Failed to fetch favorite songs' });
  }
});

app.delete('/soundcharm/api/favorites/:userId/:songId', async (req, res) => {
  try {
    const { userId, songId } = req.params;

    if (!userId || !songId) {
      return res.status(400).json({ error: 'userId and songId are required' });
    }

    const favoriteRef = db.collection('users').doc(userId).collection('favorites').doc(songId);
    const snapshot = await favoriteRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: 'Favorite song not found' });
    }

    await favoriteRef.delete();

    res.status(200).json({ message: 'Favorite song deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite song:', error);
    res.status(500).json({ error: 'Failed to delete favorite song' });
  }
});



app.listen(port, () =>
    console.log(`http://localhost:${port}`)
);
