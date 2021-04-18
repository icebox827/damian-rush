import Phaser from 'phaser';
import Preload from './scene/preload';
import Game from './scene/game';

window.onload = function() {
  const config = {
    type: Phaser.AUTO,
    width: 1510,
    height: 700,
    scene: {
      Preload,
      Game,
    },
    backgroundColor: 0x444484,
    physics: {
      default: "arcade"
    }
  }
  const game = new Phaser.Game(config);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);

  function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
  }
}