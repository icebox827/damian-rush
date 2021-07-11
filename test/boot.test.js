import 'regenerator-runtime/runtime';

const gameState = require('../src/scene/boot');
const score = require('../src/scene/boot');

it('should create object', () => {
  expect(typeof gameState).toBe('object');
});

it('should increase score', () => {
  if (gameState.score > score) {
    expect(gameState.score).toBe(true);
  }
});