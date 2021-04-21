import '@babel/polyfill';
import 'regenerator-runtime/runtime';

import Phaser from 'phaser';
import Preload from '../src/scene/game';

it('should be a subclass of Phaser', () => {
  expect(Preload.prototype instanceof Phaser.Scene).toBe(true);
});