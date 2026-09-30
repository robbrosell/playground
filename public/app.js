const songListEl = document.getElementById('song-list');
const form = document.getElementById('add-song-form');
const titleInput = document.getElementById('title-input');
const artistInput = document.getElementById('artist-input');
const errorEl = document.getElementById('error-message');

const VOTED_KEY = 'songvote:voted-ids';

function getVotedIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(VOTED_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function markVoted(id) {
  const voted = getVotedIds();
  voted.add(id);
  localStorage.setItem(VOTED_KEY, JSON.stringify([...voted]));
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  setTimeout(() => { errorEl.hidden = true; }, 4000);
}

async function fetchSongs() {
  const res = await fetch('/api/songs');
  if (!res.ok) throw new Error('Failed to load songs');
  return res.json();
}

function renderSongs(songs) {
  const votedIds = getVotedIds();
  songListEl.innerHTML = '';

  if (songs.length === 0) {
    songListEl.innerHTML = '<li class="empty-state">No songs yet. Add the first one!</li>';
    return;
  }

  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.className = 'song-item';

    const alreadyVoted = votedIds.has(song.id);

    li.innerHTML = `
      <span class="song-rank">#${index + 1}</span>
      <div class="song-info">
        <div class="song-title"></div>
        <div class="song-artist"></div>
      </div>
      <span class="vote-count">${song.votes}</span>
      <button class="vote-btn" ${alreadyVoted ? 'disabled' : ''}>${alreadyVoted ? 'Voted' : 'Vote'}</button>
      <button class="delete-btn" title="Remove song">&times;</button>
    `;

    li.querySelector('.song-title').textContent = song.title;
    li.querySelector('.song-artist').textContent = song.artist;

    li.querySelector('.vote-btn').addEventListener('click', () => vote(song.id));
    li.querySelector('.delete-btn').addEventListener('click', () => removeSong(song.id));

    songListEl.appendChild(li);
  });
}

async function load() {
  try {
    const songs = await fetchSongs();
    renderSongs(songs);
  } catch (err) {
    showError(err.message);
  }
}

async function vote(id) {
  try {
    const res = await fetch(`/api/songs/${id}/vote`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to vote');
    markVoted(id);
    await load();
  } catch (err) {
    showError(err.message);
  }
}

async function removeSong(id) {
  try {
    const res = await fetch(`/api/songs/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to remove song');
    await load();
  } catch (err) {
    showError(err.message);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const artist = artistInput.value.trim();
  if (!title || !artist) return;

  try {
    const res = await fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, artist }),
    });
    if (!res.ok) throw new Error('Failed to add song');
    titleInput.value = '';
    artistInput.value = '';
    await load();
  } catch (err) {
    showError(err.message);
  }
});

load();
