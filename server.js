///// global includes //// 
const express = require('express'); 
const path = require('path'); 
const api = require('./routers/index'); 
const app = express();
const PORT = process.env.PORT || 3008;
app.use(express.json()); 
app.use(express.static('public'));
app.use('/api', api); 


/// route from main page to notes page ///
app.get('/notes', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});


/// activate server to listen /// 
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));