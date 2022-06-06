import Button from "../js/button.js";

var score;

// Clase Retry, donde se crean los botones, el logo y el fondo del menú derrota
export class victoria extends Phaser.Scene {
  constructor() {
    super("victoria");
  }

  init(data) {
    // recupera el valor SCORE enviado como dato al inicio de la escena
    score = data.score;
  }

  create() {

    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "emojiWin"
    );
    // Texto que muestra el puntaje maximo alcanzado
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        `Puntaje alcanzado: ${score}`
      )
      .setOrigin(0.5);

    // Boton para volver a jugar
    const boton = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "Rejugar",
      this,
      () => {
        // Instrucción para pasar a la escena Play
        this.scene.start("MainMenu");
      }
    );
  }
}
