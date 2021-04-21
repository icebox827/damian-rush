import '@babel/polyfill';
import 'regenerator-runtime/runtime';
import Phaser from 'phaser';
import GameOver from '../src/scene/game';

const result = require('../src/scene/gameOver');

it('should be a subclass of Phaser', () => {
  expect(GameOver.prototype instanceof Phaser.Scene).toBe(true);
});

it('should not be a subclass of Phaser', () => {
  expect(result.prototype instanceof Phaser.Scene).toBe(false);
});
