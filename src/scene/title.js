import Phaser from 'phaser';
import gameState from './boot';

class Title extends Phaser.Scene {
  constructor() {
    super('Title')
  }

  preload() {
    this.load.audio('stardust', 'assets/audio/stardust.mp3');
  }

  create() {
    const btn = document.createElement('button');
    btn.id = 'btn';
    btn.textContent = 'Start';
    document.body.appendChild(btn);
    btn.onclick = () => {
      this.scene.start('PreloadGame');
      btn.remove();
    };

    this.add.text(530, 50, 'Welcome to Damian Rush', { fontSize: '48px', fill: 'red', fontFamily: 'bold' });
    this.add.text(570, 120, 'Please enter your name', { fontSize: '32px', fill: 'white' })
  }

  update(){
    
  }
}

export default Title;