let { Player } = require('./Player.js');

Player.randomlyGeneratePlayers = function (quantity) {
  for (let i = 0; i < quantity; i++) {
    let player = Player(Math.random());
    player.x = Math.floor(Math.random() * 1000) + 50;
    player.y = Math.floor(Math.random() * 1000) + 50;
    player.name = "Player " + (i + 1);
  }
};

module.exports = { Player, randomlyGeneratePlayers };
