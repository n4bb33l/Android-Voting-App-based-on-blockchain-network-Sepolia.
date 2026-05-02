const Poll = require('../models/Poll');
const { hashVoterId } = require('../utils/hashUtils');
// const { contract } = require('../config/blockchain'); // later

const getActivePolls = async (req, res, next) => {
  try {
    const now = new Date();
    const polls = await Poll.find({
      visible: true,
      startTime: { $lte: now },
      endTime: { $gte: now }
    }).select('-__v');

    res.json(polls);
  } catch (err) {
    next(err);
  }
};

const getPollById = async (req, res, next) => {
  try {
    const poll = await Poll.findOne({ pollId: req.params.pollId });
    if (!poll || !poll.visible) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json(poll);
  } catch (err) {
    next(err);
  }
};

const voteOnPoll = async (req, res, next) => {
  try {
    const { optionIndex } = req.body;
    const pollId = req.params.pollId;
    const userId = req.user.userId;

    // TODO: call blockchain smart contract here
    // const voterHash = hashVoterId(userId, pollId);
    // await contract.castVote(pollId, voterHash, optionIndex);

    res.json({ message: 'Vote submitted (blockchain integration pending)' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getActivePolls, getPollById, voteOnPoll };