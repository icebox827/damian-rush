import Phaser from 'phaser';
import gameState from './boot';

class Title extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' })
  }

  create() {
    this.add.text(160, 50, 'Damian Rush', { fontSize: '48px', fill: 'Blue', fontFamily: 'bold' });
    this.add.text(207, 120, 'Enter your name', { fontSize: '22px', fill: 'green' });
 
    const input = document.createElement('input');
    const btn = document.createElement('button');

    input.id = 'input';
    btn.id = 'btn';
    btn.type = 'button';
    btn.textContent = 'Start';

    document.body.appendChild(input);
    document.body.appendChild(btn);
  }

  update(){
    document.getElementById('btn').onclick = () => {
      if (document.getElementById('input').value !== '') {
        this.name = document.getElementById('input').value;
        gameState.name = this.name;
        this.scene.start('Game');
        document.getElementById('input').remove();
        document.getElementById('btn').remove();
      } else {
        this.add.text(90, 320, 'Please enter your name!', { fontSize: '22px', fill: 'red' });
      }
    };
  }
}

export default Title;