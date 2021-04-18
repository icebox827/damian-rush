import Phaser from 'phaser';
import gameState from './boot';

class Preload extends Phaser.Scene {
  constructor(){
    super('Preload');
  }
  preload(){
    this.load.image('background', 'assets/img/bg.png');
    this.load.image('platform', 'assets/img/platform.png');
    this.load.spritesheet('damian', 'assets/img/damian.png',
    { frameWidth: 32, frameHeight: 48 });
    this.load.image('coin', 'assets/img/coin.png');
    this.load.image('trap', 'assets/img/trap.png');
    this.load.image('fire', 'assets/img/fire.png');
  }

  create(){
    this.platformGroup = this.add.group({

      removeCallback: function(platform){
        platform.scene.platformPool.add(platform)
      }
    });

    this.platformPool = this.add.group({

      removeCallback: function(platform){
        platform.scene.platformGroup.add(platform)
      }
    });

    this.playerJumps = 0;
 
    this.addPlatform(game.config.width, game.config.width / 2);

    this.player = this.physics.add.sprite(gameState.playerStartPosition, game.config.height / 2, "player");
    this.player.setGravityY(gameState.playerGravity);

    this.physics.add.collider(this.player, this.platformGroup);

    this.input.on("pointerdown", this.jump, this);
  }

  update(){
    if(this.player.y > game.config.height){
        this.scene.start("Preload");
    }
    this.player.x = gameState.playerStartPosition;

    let minDistance = game.config.width;
    this.platformGroup.getChildren().forEach(function(platform){
        let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
        minDistance = Math.min(minDistance, platformDistance);
        if(platform.x < - platform.displayWidth / 2){
            this.platformGroup.killAndHide(platform);
            this.platformGroup.remove(platform);
        }
    }, this);

    if(minDistance > this.nextPlatformDistance){
        var nextPlatformWidth = Phaser.Math.Between(gameState.platformSizeRange[0], gameState.platformSizeRange[1]);
        this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
    }
}
}

export default Preload;