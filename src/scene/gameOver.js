/* eslint-disable no-plusplus */
/* eslint-disable no-return-await */
import Phaser from 'phaser';
import * as api from '../api';
import '@babel/polyfill';
import 'regenerator-runtime/runtime';

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.text(655, 50, 'Game Over', { fontSize: '48px', fill: 'black', fontFamily: 'bold' });

    const result = async () => await api.getScore();

    const display = async () => {
      const scores = await result();
      for (let i = 0; i < scores.length; i++) {
        this.add.text(180, 50, 'Leaderboard Score');
        this.add.text(200, i * -50, `${scores[i].user}'s Score is ${scores[i].score}`);
      }
      this.add.text(180, 50, 'Leaderboard Score');
    };
    display();
  }
}

export default GameOver;