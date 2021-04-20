/* eslint-disable no-plusplus */
/* eslint-disable no-return-await */
import Phaser from 'phaser';
import * as api from '../api';
import '@babel/polyfill';
import 'regenerator-runtime/runtime';
import gameState from './boot';

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.text(655, 50, 'Game Over', { fontSize: '48px', fill: 'black', fontFamily: 'bold' });
    const restartBtn = document.createElement('button');
    restartBtn.id = 'restart-btn';
    restartBtn.textContent = 'Restart';
    document.body.appendChild(restartBtn);

    restartBtn.onclick = () => {
      this.scene.start('PreloadGame');
      restartBtn.remove();
      gameState.score = 0;
    };

    const result = async () => await api.getScore();

    const display = async () => {
      const scores = await result();
      scores.sort((a, b) => b.score - a.score);
      for (let i = 0; i < 10; i += 1) {
        this.add.text(50, 40, 'Leaderboard Score :');
        this.add.text(50, 100 + (i * 50), `${scores[i].user}'s Score is ${scores[i].score}`);
      }
      this.add.text(500, 50, 'Your Score :');
      this.add.text(500, 90, gameState.score);
      if (gameState.score !== 0) {
        api.setScore(gameState.name, gameState.score);
      }
    };
    if (gameState.score !== 0) {
      display();
      this.game.sound.stopAll();
    }

    if (gameState.score === 0) {
      this.game.sound.stopAll();
    }
  }
}

export default GameOver;