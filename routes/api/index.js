const router = require('express').Router();
const notes = require('./noteroutes');

router.use('/notes', notes);
 

module.exports = router;