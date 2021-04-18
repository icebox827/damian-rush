import Phaser from 'phaser';
import gameState from './boot';
import Preload from './preload';

class Game extends Phaser.Scene{
  constructor(){
    super('Game')
  }

  addPlatform(platformWidth, posX){
    let platform;
    if(this.platformPool.getLength()){
        platform = this.platformPool.getFirst();
        platform.x = posX;
        platform.active = true;
        platform.visible = true;
        this.platformPool.remove(platform);
    }
    else{
      platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameState.spawnRange[0], gameState.spawnRange[1]);
  }

  jump(){
    if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameState.jumps)){
      if(this.player.body.touching.down){
          this.playerJumps = 0;
      }
      this.player.setVelocityY(gameState.jumpForce * -1);
      this.playerJumps ++;
    }
  }
}

export default Game;