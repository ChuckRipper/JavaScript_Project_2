const Score = require('../models/scoreModel');

exports.addScore = async (userId, score, gameTime) => {
  return await Score.create({ user_id: userId, score, game_time: gameTime });
};

exports.updateScore = async (scoreId, score, gameTime) => {
  const scoreRecord = await Score.findByPk(scoreId);
  if (!scoreRecord) {
    throw new Error('Score not found');
  }
  scoreRecord.score = score || scoreRecord.score;
  scoreRecord.game_time = gameTime || scoreRecord.game_time;
  return await scoreRecord.save();
};

exports.getScores = async () => {
  return await Score.findAll();
};

exports.deleteScore = async (scoreId) => {
  const score = await Score.findByPk(scoreId);
  if (!score) {
    throw new Error('Score not found');
  }
  return await score.destroy();
};
