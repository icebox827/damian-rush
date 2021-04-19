const gameState = {
  name: '',
  score: 0,
  platformSpeedRange: [300, 300],
  cloudSpeed: 40,
  mountainSpeed: 80,
  spawnRange: [80, 300],
  platformSizeRange: [90, 300],
  platformHeightRange: [-5, 5],
  platformHeighScale: 20,
  platformVerticalLimit: [0.4, 0.8],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2,
  coinPercent: 30,
  firePercent: 25,
  trapPercent: 25,
}

export default gameState;