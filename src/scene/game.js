import Phaser from 'phaser';
import gameState from './boot';
import Preload from './preload';

class PlayGame extends Phaser.Scene {
  constructor () {
    super('PlayGame')
  }

  create() {
    this.mountainGroup = this.add.group();

    this.platformGroup = this.add.group({
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform)
      }
    });

    this.platformPool = this.add.group({
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform)
      }
    });
  }

  update() {

  }
  
}

export default PlayGame;