const Score = require('../models/scoreModel');

exports.addScore = async (req, res) => {
  const { userId, score, gameTime } = req.body;
  try {
    const newScore = await Score.create({ user_id: userId, score, game_time: gameTime });
    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateScore = async (req, res) => {
  const { score, gameTime } = req.body;
  try {
    const scoreRecord = await Score.findByPk(req.params.id);
    if (!scoreRecord) {
      return res.status(404).json({ error: 'Score not found' });
    }
    scoreRecord.score = score || scoreRecord.score;
    scoreRecord.game_time = gameTime || scoreRecord.game_time;
    await scoreRecord.save();
    res.status(200).json(scoreRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getScores = async (req, res) => {
  try {
    const scores = await Score.findAll();
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteScore = async (req, res) => {
  try {
    const score = await Score.findByPk(req.params.id);
    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }
    await score.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
