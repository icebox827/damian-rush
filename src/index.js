import Phaser from 'phaser';
import Preload from './scene/preload';
import Game from './scene/game';
import Title from './scene/title'

window.onload = function() {
  const config = {
    type: Phaser.AUTO,
    width: 1510,
    height: 700,
    scene: {
      Preload,
      Game,
      Title
    },
    dom: {
      createContainer: true,
    },
    backgroundColor: 0x444484,
    physics: {
      default: "arcade"
    }
  }
  const game = new Phaser.Game(config);
  window.focus();
}