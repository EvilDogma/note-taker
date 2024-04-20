// set up router
const router = require('express').Router();

// pull in notes router
const notesRouter = require('./notes');

// use notes router
router.use('/notes', notesRouter);

// export router
module.exports = router;