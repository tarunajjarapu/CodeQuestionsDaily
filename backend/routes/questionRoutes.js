const express = require('express');
const router = express.Router();
const { getQuestion, createQuestions } = require('../controllers/questionController')

router.get('/getQuestion', getQuestion)
router.get('/createQuestions', createQuestions)

module.exports = router;