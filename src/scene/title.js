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
    const input = document.createElement('input');
    input.id = 'input';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter your name');

    const btn = document.createElement('button');
    btn.id = 'btn';
    btn.textContent = 'Start';
    document.body.appendChild(btn);
    document.body.appendChild(input);

    this.add.text(530, 50, 'Welcome to Damian Rush', { fontSize: '48px', fill: 'red', fontFamily: 'bold' });
    this.add.text(570, 120, 'Please enter your name', { fontSize: '32px', fill: 'white' })
  }

  update() {
    btn.onclick = () => {
      if(document.getElementById('input').value !== '') {
        this.name = document.getElementById('input').value;
        gameState.name = this.name;
        this.scene.start('PreloadGame');
        btn.remove();
        input.remove();
      } else {
        this.add.text(690, 155, "Name can't be blank", { fontSize: '16px', fill: 'red' });
      }
    };
  }
}

export default Title;