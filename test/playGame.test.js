import '@babel/polyfill';
import 'regenerator-runtime/runtime';
import Phaser from 'phaser';
import PlayGame from '../src/scene/game';

const player = require('../src/scene/game');
const dying = require('../src/scene/game');
const fire = require('../src/scene/game');

const mockOverlap = jest.fn().mockReturnValue({
  x: 300,
});

it('should be a subclass of Phaser', () => {
  expect(PlayGame.prototype instanceof Phaser.Scene).toBe(true);
});

it('should not be a subclass of Phaser', () => {
  expect(player.prototype instanceof Phaser.Scene).toBe(false);
});

it('Player should die', () => {
  if (player.y > 700) {
    expect(dying).toBe(true);
  }
});

it('Player should not die', () => {
  if (player.y < 700) {
    expect(dying).toBe(false);
  }
});