const express = require('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json');

const PORT = 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => { //everything else — ignores everything after /
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
