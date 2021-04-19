import Phaser from 'phaser';
import gameState from './boot';

class Title extends Phaser.Scene {
  constructor() {
    super('Title')
  }

  preload() {
    this.load.image('start', 'assets/img/start.png');
    this.load.audio('stardust', 'assets/audio/stardust.mp3');
  }

  create() {
    this.add.text(530, 50, 'Welcome to Damian Rush', { fontSize: '48px', fill: 'red', fontFamily: 'bold' });
    this.add.text(570, 120, 'Please enter your name', { fontSize: '32px', fill: 'white' })

    this.button = this.add.image(755, 300, 'start').setInteractive().on('pointerDown', () => {
      this.scene.start('preloadGame');
    });
  }

  update(){
    
  }
}

export default Title;