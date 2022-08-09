const { Player } = require("../models/player.js");

const hostGame = (games) => (req, res) => {
  const { username } = req.session;
  const player = new Player(username);
  const game = games.createGame();

  game.addPlayer(player);
  const gameId = game.gameId;

  req.session.gameId = gameId;
  req.session.game = game;
  res.redirect(`/lobby/${gameId}`);
  return;
};

module.exports = { hostGame };
