import '@babel/polyfill';
import 'regenerator-runtime/runtime';

import Phaser from 'phaser';
import GameOver from '../src/scene/game';

it('should be a subclass of Phaser', () => {
  expect(GameOver.prototype instanceof Phaser.Scene).toBe(true);
});