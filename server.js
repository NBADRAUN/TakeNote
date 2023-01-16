/// global includes and setup //// 
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
app.use(express.static('public'));







//// api routers ///// 

///main notes page route ///// 
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

/// server localhost listen //// 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
