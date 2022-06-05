export class Preloads extends Phaser.Scene {

  constructor() {

    super("Preloads");
  }

  preload() {
    this.load.image("sad_cow", "public/assets/images/sad_cow.png");
    this.load.image("phaser_logo", "public/assets/images/phaser_logo.png");
    this.load.image("mainmenu_fondo","public/assets/images/fondoMM.png");
    this.load.image("fondo", "public/assets/images/AtlasFondo.png");
    this.load.image("plataforma", "public/assets/images/platafoma2.png");
    this.load.image("estrella", "public/assets/images/star.png");
    this.load.image("bomba", "public/assets/images/bomb.png");
    this.load.image("coso", "public/assets/images/coso.png");
    this.load.spritesheet("dude", "public/assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
 
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("MainMenu");
  }
}
