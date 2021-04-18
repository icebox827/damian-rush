import Phaser from 'phaser';
import gameState from './boot';

class Preload extends Phaser.Scene{
  constructor(){
    super("PreloadGame");
  }
  preload(){
    this.load.image("platform", "assets/img/platform.png");

    this.load.spritesheet("damian", "assets/img/damian.png", {
        frameWidth: 24,
        frameHeight: 48
    });

    this.load.spritesheet("coin", "assets/img/coin.png", {
        frameWidth: 20,
        frameHeight: 20
    });

    this.load.spritesheet("fire", "assets/img/fire.png", {
        frameWidth: 40,
        frameHeight: 70
    });

    this.load.spritesheet("trap", "assets/img/trap.png", {
      frameWidth: 40,
      frameHeight: 70
    });

    this.load.spritesheet("mountain", "assets/img/bg.png", {
        frameWidth: 512,
        frameHeight: 512
    });
  }
  create(){
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("damian", {
          start: 0,
          end: 1
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "rotate",
      frames: this.anims.generateFrameNumbers("coin", {
          start: 0,
          end: 5
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1
    });

    this.anims.create({
      key: "rotate",
      frames: this.anims.generateFrameNumbers("trap", {
          start: 0,
          end: 4
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1
    });

    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("fire", {
          start: 0,
          end: 4
      }),
      frameRate: 15,
      repeat: -1
    });

  this.scene.start("PlayGame");
  }
}

export default Preload;