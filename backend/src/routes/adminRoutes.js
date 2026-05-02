const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createPoll,
  hidePoll,
  unhidePoll,
  deletePoll,
  getAllPolls,
  getPollResults
} = require('../controllers/adminController');

router.post('/polls', auth(['ADMIN']), createPoll);
router.get('/polls', auth(['ADMIN']), getAllPolls);
router.patch('/polls/:pollId/hide', auth(['ADMIN']), hidePoll);
router.patch('/polls/:pollId/unhide', auth(['ADMIN']), unhidePoll);
router.delete('/polls/:pollId', auth(['ADMIN']), deletePoll);
router.get('/polls/:pollId/results', auth(['ADMIN']), getPollResults);

module.exports = router;