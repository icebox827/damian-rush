import '@babel/polyfill';
import 'regenerator-runtime/runtime';
import Phaser from 'phaser';
import Preload from '../src/scene/game';

const music = require('../src/scene/preload');

it('should be a subclass of Phaser', () => {
  expect(Preload.prototype instanceof Phaser.Scene).toBe(true);
});

it('should not be a subclass of Phaser', () => {
  expect(music.prototype instanceof Phaser.Scene).toBe(false);
});