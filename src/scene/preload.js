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
    this.load.spritesheet('trap', 'assets/img/trap.png', {
      frameWidth: 40,
      frameHeight: 70,
    });
    this.load.image('mountain', 'assets/img/bg.png', {
      frameWidth: 512,
      frameHeight: 512,
    });
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
    
    this.scene.start('PlayGame');
  }
}
export default Preload;