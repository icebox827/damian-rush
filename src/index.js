import Phaser from 'phaser'
import Preload from './scene/preload'
import PlayGame from './scene/game';
// import Title from './scene/title'

window.onload = function () {
  const config = {
    type: Phaser.AUTO,
    width: 1510,
    height: 700,
    scene: [Preload, PlayGame],
    backgroundColor: 0x0c88c7,
    physics: {
      default: 'arcade'
    },
    dom: {
      createContainer: true,
    },
  }
  let game = new Phaser.Game(config);
  window.focus();
}