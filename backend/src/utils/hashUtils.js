const crypto = require('crypto');

const hashVoterId = (userId, pollId) => {
  const secretSalt = 'some_static_or_env_salt';
  return crypto
    .createHash('sha256')
    .update(userId + pollId + secretSalt)
    .digest('hex');
};

module.exports = { hashVoterId };