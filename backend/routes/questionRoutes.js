const express = require('express');
const router = express.Router();
const { getQuestion, createQuestions } = require('../controllers/questionController')
const { protect } = require('../middleware/authMiddleware')

router.get('/getQuestion', protect, getQuestion)
router.get('/createQuestions', protect, createQuestions)

module.exports = router;