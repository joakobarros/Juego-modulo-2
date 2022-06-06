var player;
var stars;
var bombs;
var cursors;
var score;
var gameOver;
var scoreText;
var cosos;
var scoreTime;
var scoreTimeText;
var timedEvent;

// Clase Play, donde se crean todos los sprites, el escenario del juego y se inicializa y actualiza toda la logica del juego.
export class nivel3 extends Phaser.Scene {
  
  constructor() {
    super("nivel3");
  }

  init(data) {
    score = data.score;
  }

  preload() {
    this.load.tilemapTiledJSON("map3", "public/assets/tilemaps/Nivel3.json");
    this.load.image("fondo", "public/assets/images/AtlasFondo.png");
    this.load.image("plataformas", "public/assets/images/plataforma2.png");
  }

  onSecond() {
    if (! gameOver)
    {       
        scoreTime = scoreTime - 1; // One second
        scoreTimeText.setText('Time: ' + scoreTime);
        if (scoreTime == 0) {
            timedEvent.paused = true;
            this.scene.start(
              "Retry",
              { score: score } // se pasa el puntaje como dato a la escena RETRY
            );
     }            
    }
  }

  create() {

    timedEvent = this.time.addEvent({ 
      delay: 1000, 
      callback: this.onSecond, 
      callbackScope: this, 
      loop: true 
    });

    const map = this.make.tilemap({ key: "map3" });
    const tilesetBelow = map.addTilesetImage("AtlasFondo", "fondo");
    const tilesetPlatform = map.addTilesetImage("plataforma2","plataformas");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("fondo", tilesetBelow, 0, 0);
    const worldLayer = map.createLayer("plataformas", tilesetPlatform, 0, 0);
    const objectsLayer = map.getObjectLayer("objetos");

    worldLayer.setCollisionByProperty({ collider: true });

    // Find in the Object Layer, the name "dude" and get position
    const spawnPoint = map.findObject("objetos", (obj) => obj.name === "player");

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Input Events
    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }

    // grupos
    stars = this.physics.add.group();
    cosos = this.physics.add.group();
    bombs = this.physics.add.group();


    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "estrella": {
          var star = stars.create(x, y, "estrella");
          star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          break;
        }
        case "coso": {
          var coso = cosos.create(x, y, "coso");
          coso.setBounceY(1);
          coso.setCollideWorldBounds(true);
          coso.setVelocity(Phaser.Math.Between(-150, 150), 20);
          coso.allowGravity = false;
          break;
        }
        case "bomba": {
          var bomb = bombs.create(x, y, "bomba");
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.allowGravity = false;
          break;
        }
      }
    })

    scoreTime = 120;
    scoreTimeText = this.add.text(500, 6, "Time:" +scoreTime, {
      fontSize: "32px",
      fill: "#FFFFFF",
    });

    scoreText = this.add.text(30, 6, "score: " + score, {
      fontSize: "32px",
      fill: "#FFFFFF",
    });

    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(stars, worldLayer);
    this.physics.add.collider(bombs, worldLayer);
    this.physics.add.collider(cosos, worldLayer);

    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.overlap(player, cosos, this.collectCosos, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    gameOver = false;
    
  }

  update() {
    if (gameOver) {
      return;
    }


    if (cosos.countActive(true) === 0 && stars.countActive(true) === 0) { 
        setTimeout(() => {
            this.scene.start(
              "victoria",{ score: score });
          }, 1000);
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
    }
  }

  collectStar(_player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);
  }

  collectCosos (_player, cosos) {
    cosos.disableBody(true, true);
    score += 15;
    scoreText.setText('Score: ' + score);
}

  hitBomb (player, bombs) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameOver = true;

    setTimeout(() => {
      this.scene.start(
        "Retry",{ score: score });
    }, 1000);
  }
}
