import '@babel/polyfill';
import 'regenerator-runtime/runtime';
import Phaser from 'phaser';
import Title from '../src/scene/game';

it('should be a subclass of Phaser', () => {
  expect(Title.prototype instanceof Phaser.Scene).toBe(true);
});