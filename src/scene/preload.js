/* eslint-disable no-unused-vars */
import Phaser from 'phaser';

class Preload extends Phaser.Scene {
  constructor() {
    super('PreloadGame');
  }

  preload() {
    this.load.image('platform', 'assets/img/platform.png');
    this.load.spritesheet('damian', 'assets/img/damian.png', {
      frameWidth: 44,
      frameHeight: 45,
    });
    this.load.spritesheet('coin', 'assets/img/coin.png', {
      frameWidth: 20,
      frameHeight: 20,
    });
    this.load.spritesheet('fire', 'assets/img/fire.png', {
      frameWidth: 40,
      frameHeight: 70,
    });
    this.load.image('cloud', 'assets/img/cloud.png', {
      frameWidth: 512,
      frameHeight: 512,
    });
    this.load.image('mountain', 'assets/img/bg.png', {
      frameWidth: 512,
      frameHeight: 512,
    });

    this.load.audio('music', 'assets/audio/stardust.mp3');
  }

  create() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('damian'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin'),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });
    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 15,
      repeat: -1,
    });

    const music = this.sound.add('music', { loop: true });
    music.play('volume', { volume: 0.3 });

    this.scene.start('PlayGame');
  }
}
export default Preload;