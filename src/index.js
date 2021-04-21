import Phaser from 'phaser';
import Title from './scene/title';
import Preload from './scene/preload';
import PlayGame from './scene/game';
import GameOver from './scene/gameOver';

window.onload = function () {
  const config = {
    type: Phaser.AUTO,
    width: 1510,
    height: 700,
    scene: [Title, Preload, PlayGame, GameOver],
    backgroundColor: 0x0c88c7,
    physics: {
      default: 'arcade',
      matter: {
        debug: true,
      },
    },
    dom: {
      createContainer: true,
    },
  };
  const game = new Phaser.Game(config);
};