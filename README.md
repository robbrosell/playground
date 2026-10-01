# Playground

This repository hosts a few small, independent projects.

## Standing With Her

A static multi-page site (`standing-with-her/`) for husbands of adult
clergy sexual abuse survivors. See `standing-with-her/README.md` for
details and deployment instructions. It auto-publishes to GitHub Pages
via `.github/workflows/deploy-standing-with-her.yml`.

## Song Vote

A simple web app for voting on your favorite songs.

## Features

- View songs ranked by vote count
- Vote for a song (one vote per song per browser)
- Add new songs
- Remove songs

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## Tech

- Backend: Node.js + Express, with song data persisted to `data/songs.json`
- Frontend: plain HTML/CSS/JS, no build step required
