const express = require('express');
const router = express.Router();
const { getStreak, updateStreak } = require('../controllers/streakController')
const { protect } = require('../middleware/authMiddleware')

router.get('/getStreak', protect, getStreak)
router.put('/updateStreak', protect, updateStreak)

module.exports = router;