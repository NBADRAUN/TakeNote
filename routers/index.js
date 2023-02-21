const express = require('express');
const notesroute = require('./notes');
const app = express();
app.use('/notes', notesroute);























module.exports = app;