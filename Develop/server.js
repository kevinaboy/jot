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
app.get('/api/notes', (req, res) => res.json(notesData));
app.get('*', (req, res) => { //everything else — ignores everything after /
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.post('/api/notes', (req, res) => {
  console.log(notesData)
  console.log(req.body)
  notesData.push(req.body)
  console.log(notesData)
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesData))
  res.json(req.body)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
