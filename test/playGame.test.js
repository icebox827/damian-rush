import '@babel/polyfill';
import 'regenerator-runtime/runtime';

import Phaser from 'phaser';
import PlayGame from '../src/scene/game';

it('should be a subclass of Phaser', () => {
  expect(PlayGame.prototype instanceof Phaser.Scene).toBe(true);
});