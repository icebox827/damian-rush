/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import Phaser from 'phaser';
import gameState from './boot';
import * as api from '../api';

class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  create() {
    this.mountainGroup = this.physics.add.group();
    this.cloudGroup = this.physics.add.group();

    const scoreText = this.add.text(150, 100, 'Score: 0', {
      fontSize: '24px',
      fill: 'white',
      fontStyle: 'bold',
    });

    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });
    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.coinGroup = this.add.group({
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });
    this.coinPool = this.add.group({
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    this.fireGroup = this.add.group({
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });
    this.firePool = this.add.group({
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });

    this.addMountains();
    this.addClouds();
    this.addedPlatforms = 0;
    this.playerJumps = 0;
    this.addPlatform(1510, 1510 / 2, 700 * gameState.platformVerticalLimit[1]);

    this.player = this.physics.add.sprite(
      gameState.playerStartPosition,
      gameState.score,
      700 * 0.7,
      'damian',
    );

    this.player.setGravityY(gameState.playerGravity);
    this.player.setDepth(2);
    this.player.setData('score', 0);
    this.player.setData('name', '');
    this.dying = false;

    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function () {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    },
    null,
    this);

    this.physics.add.overlap(this.player, this.coinGroup, function (player, coin) {
      gameState.score = player.getData('score');
      gameState.score += 10;
      scoreText.setText(`Score: ${gameState.score}`);
      player.setData('score', gameState.score);
      this.tweens.add({
        targets: coin,
        y: coin.y - 100,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        callbackScope: this,
        onComplete() {
          this.coinGroup.killAndHide(coin);
          this.coinGroup.remove(coin);
        },
      });
    },
    null,
    this);
    this.physics.add.overlap(this.player, this.fireGroup, function (player, fire) {
      this.dying = true;
      this.scene.start('GameOver');
    },
    null,
    this);

    this.input.on('pointerdown', this.jump, this);
  }

  addMountains() {
    const rightmostMountain = this.getRightmostMountain();
    if (rightmostMountain < 1510 * 2) {
      const mountain = this.physics.add.sprite(
        rightmostMountain + Phaser.Math.Between(100, 350),
        700 + Phaser.Math.Between(0, 100),
        'mountain',
      );
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameState.mountainSpeed * -1);
      this.mountainGroup.add(mountain);
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(Phaser.Math.Between(0, 3));
      this.addMountains();
    }
  }

  getRightmostMountain() {
    let rightmostMountain = -200;
    this.mountainGroup.getChildren().forEach((mountain) => {
      rightmostMountain = Math.max(rightmostMountain, mountain.x);
    });
    return rightmostMountain;
  }

  addClouds() {
    const rightmostCloud = this.getRightmostCloud();
    if (rightmostCloud < 1510 * 2) {
      const cloud = this.physics.add.sprite(
        rightmostCloud + Phaser.Math.Between(50, 250),
        700 + Phaser.Math.Between(0, 80),
        'cloud',
      );
      cloud.setOrigin(1, 2);
      cloud.body.setVelocityX(gameState.cloudSpeed * -1);
      this.cloudGroup.add(cloud);
      if (Phaser.Math.Between(0, 1)) {
        cloud.setDepth(1);
      }
      cloud.setFrame(Phaser.Math.Between(0, 3));
      this.addClouds();
    }
  }

  getRightmostCloud() {
    let rightmostCloud = -200;
    this.cloudGroup.getChildren().forEach((cloud) => {
      rightmostCloud = Math.max(rightmostCloud, cloud.x);
    });
    return rightmostCloud;
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms++;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(
        Phaser.Math.Between(
          gameState.platformSpeedRange[0],
          gameState.platformSpeedRange[1],
        ) * -1,
      );
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameState.spawnRange[0],
      gameState.spawnRange[1],
    );
    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameState.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(posX, posY - 96, 'coin');
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play('rotate');
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }
      if (Phaser.Math.Between(1, 100) <= gameState.firePercent) {
        if (this.firePool.getLength()) {
          const fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          fire.y = posY - 46;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(
            posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth),
            posY - 46,
            'fire',
          );
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true);
          fire.anims.play('burn');
          fire.setDepth(2);
          this.fireGroup.add(fire);
        }
      }
    }
  }

  jump() {
    if (
      !this.dying
      && (this.player.body.touching.down
      || (this.playerJumps > 0 && this.playerJumps < gameState.jumps))
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameState.jumpForce * -1);
      this.playerJumps++;
      this.player.anims.stop();
    }
  }

  update() {
    if (this.player.y > 700) {
      this.dying = true;
      this.scene.start('GameOver');
    }
    this.player.x = gameState.playerStartPosition;
    let minDistance = 1510;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function (platform) {
      const platformDistance = 1510 - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);
    this.coinGroup.getChildren().forEach(function (coin) {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);
    this.fireGroup.getChildren().forEach(function (fire) {
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);
    this.mountainGroup.getChildren().forEach(function (mountain) {
      if (mountain.x < -mountain.displayWidth) {
        const rightmostMountain = this.getRightmostMountain();
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
        mountain.y = 700 + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    }, this);
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(
        gameState.platformSizeRange[0],
        gameState.platformSizeRange[1],
      );
      const platformRandomHeight = gameState.platformHeighScale
        * Phaser.Math.Between(
          gameState.platformHeightRange[0],
          gameState.platformHeightRange[1],
        );
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = 700 * gameState.platformVerticalLimit[0];
      const maxPlatformHeight = 700 * gameState.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap,
        minPlatformHeight,
        maxPlatformHeight,
      );
      this.addPlatform(
        nextPlatformWidth,
        1510 + nextPlatformWidth / 2,
        nextPlatformHeight,
      );
    }
  }
}
export default PlayGame;