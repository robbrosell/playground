const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'songs.json');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function loadSongs() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function saveSongs(songs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(songs, null, 2));
}

// Ensure writes to the data file don't race each other.
let writeQueue = Promise.resolve();
function withSongs(mutator) {
  writeQueue = writeQueue.then(() => {
    const songs = loadSongs();
    const result = mutator(songs);
    saveSongs(songs);
    return result;
  });
  return writeQueue;
}

app.get('/api/songs', (req, res) => {
  const songs = loadSongs().sort((a, b) => b.votes - a.votes);
  res.json(songs);
});

app.post('/api/songs', async (req, res) => {
  const { title, artist } = req.body || {};
  if (!title || !title.trim() || !artist || !artist.trim()) {
    return res.status(400).json({ error: 'title and artist are required' });
  }
  const newSong = {
    id: crypto.randomUUID(),
    title: title.trim(),
    artist: artist.trim(),
    votes: 0,
  };
  await withSongs((songs) => songs.push(newSong));
  res.status(201).json(newSong);
});

app.post('/api/songs/:id/vote', async (req, res) => {
  const { id } = req.params;
  const result = await withSongs((songs) => {
    const song = songs.find((s) => s.id === id);
    if (!song) return null;
    song.votes += 1;
    return song;
  });
  if (!result) return res.status(404).json({ error: 'song not found' });
  res.json(result);
});

app.delete('/api/songs/:id', async (req, res) => {
  const { id } = req.params;
  const result = await withSongs((songs) => {
    const index = songs.findIndex((s) => s.id === id);
    if (index === -1) return false;
    songs.splice(index, 1);
    return true;
  });
  if (!result) return res.status(404).json({ error: 'song not found' });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Song voting app running at http://localhost:${PORT}`);
});
