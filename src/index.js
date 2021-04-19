import Phaser from 'phaser'
import Preload from './scene/preload'
// import PlayGame from './scene/game';
// import Title from './scene/title'
import gameState from './scene/boot'

let game;

window.onload = function () {
  const config = {
    type: Phaser.AUTO,
    width: 1510,
    height: 700,
    scene: [Preload, PlayGame],
    backgroundColor: 0x0c88c7,
    physics: {
      default: 'arcade'
    },
    dom: {
      createContainer: true,
    },
  }
  game = new Phaser.Game(config);
  window.focus();
}

class PlayGame extends Phaser.Scene {
  constructor () {
    super('PlayGame')
  }
  create () {
    this.mountainGroup = this.add.group()

    this.platformGroup = this.add.group({
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform)
      }
    })

    this.platformPool = this.add.group({
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform)
      }
    })

    this.coinGroup = this.add.group({
      removeCallback: function (coin) {
        coin.scene.coinPool.add(coin)
      }
    })

    this.coinPool = this.add.group({
      removeCallback: function (coin) {
        coin.scene.coinGroup.add(coin)
      }
    })

    this.trapGroup = this.add.group({
      removeCallback: function (trap) {
        trap.scene.trapPool.add(trap)
      }
    })
  
    this.trapPool = this.add.group({
      removeCallback: function (trap) {
        trap.scene.trapGroup.add(trap)
      }
    })

    this.fireGroup = this.add.group({
      removeCallback: function (fire) {
        fire.scene.firePool.add(fire)
      }
    })

    this.firePool = this.add.group({
      removeCallback: function (fire) {
        fire.scene.fireGroup.add(fire)
      }
    })

    this.addMountains()

    this.addedPlatforms = 0

    this.playerJumps = 0

    this.addPlatform(
      game.config.width,
      game.config.width / 2,
      game.config.height * gameState.platformVerticalLimit[1]
    )

    this.player = this.physics.add.sprite(
      gameState.playerStartPosition,
      game.config.height * 0.7,
      'damian'
    )
    this.player.setGravityY(gameState.playerGravity)
    this.player.setDepth(2)

    this.dying = false

    this.platformCollider = this.physics.add.collider(
      this.player,
      this.platformGroup,
      function () {
        if (!this.player.anims.isPlaying) {
          this.player.anims.play('run')
        }
      },
      null,
      this
    )

    this.physics.add.overlap(
      this.player,
      this.coinGroup,
      function (player, coin) {
        this.tweens.add({
          targets: coin,
          y: coin.y - 100,
          alpha: 0,
          duration: 800,
          ease: 'Cubic.easeOut',
          callbackScope: this,
          onComplete: function () {
            this.coinGroup.killAndHide(coin)
            this.coinGroup.remove(coin)
          }
        })
      },
      null,
      this
    )

    this.physics.add.overlap(
      this.player,
      this.fireGroup,
      function (player, fire) {
        this.dying = true
        this.player.anims.stop()
        this.player.setFrame(2)
        this.player.body.setVelocityY(-200)
        this.physics.world.removeCollider(this.platformCollider)
      },
      null,
      this
    )

    this.physics.add.overlap(
      this.player,
      this.trapGroup,
      function (player, trap) {
        this.dying = true
        this.player.anims.stop()
        this.player.setFrame(2)
        this.player.body.setVelocityY(-200)
        this.physics.world.removeCollider(this.platformCollider)
      },
      null,
      this
    )

    this.input.on('pointerdown', this.jump, this)
  }

  addMountains () {
    let rightmostMountain = this.getRightmostMountain()
    if (rightmostMountain < game.config.width * 2) {
      let mountain = this.physics.add.sprite(
        rightmostMountain + Phaser.Math.Between(100, 350),
        game.config.height + Phaser.Math.Between(0, 100),
        'mountain'
      )
      mountain.setOrigin(0.5, 1)
      mountain.body.setVelocityX(gameState.mountainSpeed * -1)
      this.mountainGroup.add(mountain)
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1)
      }
      mountain.setFrame(Phaser.Math.Between(0, 3))
      this.addMountains()
    }
  }

  getRightmostMountain () {
    let rightmostMountain = -200
    this.mountainGroup.getChildren().forEach(function (mountain) {
      rightmostMountain = Math.max(rightmostMountain, mountain.x)
    })
    return rightmostMountain
  }

  addPlatform (platformWidth, posX, posY) {
    this.addedPlatforms++
    let platform
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst()
      platform.x = posX
      platform.y = posY
      platform.active = true
      platform.visible = true
      this.platformPool.remove(platform)
      let newRatio = platformWidth / platform.displayWidth
      platform.displayWidth = platformWidth
      platform.tileScaleX = 1 / platform.scaleX
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, 'platform')
      this.physics.add.existing(platform)
      platform.body.setImmovable(true)
      platform.body.setVelocityX(
        Phaser.Math.Between(
          gameState.platformSpeedRange[0],
          gameState.platformSpeedRange[1]
        ) * -1
      )
      platform.setDepth(2)
      this.platformGroup.add(platform)
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameState.spawnRange[0],
      gameState.spawnRange[1]
    )

    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameState.coinPercent) {
        if (this.coinPool.getLength()) {
          let coin = this.coinPool.getFirst()
          coin.x = posX
          coin.y = posY - 96
          coin.alpha = 1
          coin.active = true
          coin.visible = true
          this.coinPool.remove(coin)
        } else {
          let coin = this.physics.add.sprite(posX, posY - 96, 'coin')
          coin.setImmovable(true)
          coin.setVelocityX(platform.body.velocity.x)
          coin.anims.play('rotate')
          coin.setDepth(2)
          this.coinGroup.add(coin)
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameState.firePercent) {
        if (this.firePool.getLength()) {
          let fire = this.firePool.getFirst()
          fire.x =
            posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth)
          fire.y = posY - 46
          fire.alpha = 1
          fire.active = true
          fire.visible = true
          this.firePool.remove(fire)
        } else {
          let fire = this.physics.add.sprite(
            posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth),
            posY - 46,
            'fire'
          )
          fire.setImmovable(true)
          fire.setVelocityX(platform.body.velocity.x)
          fire.setSize(8, 2, true)
          fire.anims.play('burn')
          fire.setDepth(2)
          this.fireGroup.add(fire)
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameState.trapPercent) {
        if (this.trapPool.getLength()) {
          let trap = this.trapPool.getFirst()
          trap.x =
            posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth)
          trap.y = posY - 46
          trap.alpha = 1
          trap.active = true
          trap.visible = true
          this.trapPool.remove(trap)
        } else {
          let trap = this.physics.add.sprite(
            posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth),
            posY - 46,
            'trap'
          )
          trap.setImmovable(true)
          trap.setVelocityX(platform.body.velocity.x)
          trap.setSize(8, 2, true)
          trap.anims.play('rotate')
          trap.setDepth(2)
          this.trapGroup.add(trap)
        }
      }
    }
  }

  jump () {
    if (
      !this.dying &&
      (this.player.body.touching.down ||
        (this.playerJumps > 0 && this.playerJumps < gameState.jumps))
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0
      }
      this.player.setVelocityY(gameState.jumpForce * -1)
      this.playerJumps++

      this.player.anims.stop()
    }
  }

  update () {
    if (this.player.y > game.config.height) {
      this.scene.start('PlayGame')
    }

    this.player.x = gameState.playerStartPosition

    let minDistance = game.config.width
    let rightmostPlatformHeight = 0
    this.platformGroup.getChildren().forEach(function (platform) {
      let platformDistance =
        game.config.width - platform.x - platform.displayWidth / 2
      if (platformDistance < minDistance) {
        minDistance = platformDistance
        rightmostPlatformHeight = platform.y
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform)
        this.platformGroup.remove(platform)
      }
    }, this)

    this.coinGroup.getChildren().forEach(function (coin) {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin)
        this.coinGroup.remove(coin)
      }
    }, this)

    this.fireGroup.getChildren().forEach(function (fire) {
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire)
        this.fireGroup.remove(fire)
      }
    }, this)

    this.trapGroup.getChildren().forEach(function (fire) {
      if (trap.x < -trap.displayWidth / 2) {
        this.trapGroup.killAndHide(trap)
        this.trapGroup.remove(trap)
      }
    }, this)

    this.mountainGroup.getChildren().forEach(function (mountain) {
      if (mountain.x < -mountain.displayWidth) {
        let rightmostMountain = this.getRightmostMountain()
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350)
        mountain.y = game.config.height + Phaser.Math.Between(0, 100)
        mountain.setFrame(Phaser.Math.Between(0, 3))
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1)
        }
      }
    }, this)

    if (minDistance > this.nextPlatformDistance) {
      let nextPlatformWidth = Phaser.Math.Between(
        gameState.platformSizeRange[0],
        gameState.platformSizeRange[1]
      )
      let platformRandomHeight =
        gameState.platformHeighScale *
        Phaser.Math.Between(
          gameState.platformHeightRange[0],
          gameState.platformHeightRange[1]
        )
      let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight
      let minPlatformHeight =
        game.config.height * gameState.platformVerticalLimit[0]
      let maxPlatformHeight =
        game.config.height * gameState.platformVerticalLimit[1]
      let nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap,
        minPlatformHeight,
        maxPlatformHeight
      )
      this.addPlatform(
        nextPlatformWidth,
        game.config.width + nextPlatformWidth / 2,
        nextPlatformHeight
      )
    }
  }
}
