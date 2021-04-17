import Phaser from 'phaser';

window.onload = function() {
  const config = {
    type: Phaser.AUTO,
    width: 1480,
    height: 750,
    scene: {

    },
    backgroundColor: 0x444444,
    physics: {
      default: "arcade"
    }
  }
  game = new Phaser.Game(config);
  window.focus();
}