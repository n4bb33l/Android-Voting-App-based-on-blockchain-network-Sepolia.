const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getActivePolls, getPollById, voteOnPoll } = require('../controllers/pollController');

router.get('/', auth(['VOTER', 'ADMIN']), getActivePolls);
router.get('/:pollId', auth(['VOTER', 'ADMIN']), getPollById);
router.post('/:pollId/vote', auth(['VOTER']), voteOnPoll);

module.exports = router;