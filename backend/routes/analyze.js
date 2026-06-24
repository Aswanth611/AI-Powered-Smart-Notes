const express = require('express');
const router = express.Router();
const { analyzeNotes } = require('../controllers/aiController');

// POST /api/analyze
router.post('/', analyzeNotes);

module.exports = router;
