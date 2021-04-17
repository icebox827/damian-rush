import Phaser from 'phaser';

class Preload extends Phaser.Scene {
  constructor(){
    super(Preload);
  }
  preload(){
    this.load.image('background', 'assets/img/bg.png');
    this.load.image('platform', 'assets/img/platform.png');
    this.load.spritesheet('damian', 'assets/img/damian.png',
    { frameWidth: 32, frameHeight: 48 });
    this.load.image('coin', 'assets/img/coin.png');
    this.load.image('trap', 'assets/img/trap.png');
  }
}

export default Preload;