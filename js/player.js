class Player {
  constructor(container) {
    this.container = container;
    this.width = 50;
    this.height = 30;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.bullets = [];
    this.canShoot = true;
    this.animationTick = 0;

    this.img = `url(./assets/player.png)`;

    this.draw();
    this.setListeners();

    this.movements = {
      left: false,
      right: false,
      up: false,
      down: false,
    };
  }

  draw() {
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.background = this.img;
    this.element.style.backgroundSize = "cover";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.container.appendChild(this.element);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.animate();
  }

  animate() {
    if(this.movements.up === true && this.movements.right === true){
        this.rotateCharacter(45)
    }
  }

  setListeners() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowUp":
          this.vy = -10;
          this.movements.up = true;
          this.rotateCharacter(0);
          break;
        case "ArrowRight":
          this.vx = 10;
          this.movements.right = true;
          this.rotateCharacter(90);
          break;
        case "ArrowDown":
          this.vy = 10;
          this.movements.down = true;
          this.rotateCharacter(180);
          break;
        case "ArrowLeft":
          this.vx = -10;
          this.movements.left = true;
          this.rotateCharacter(-90);
          break;
        default:
          return;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "ArrowRight":
          this.vx = 0;
          this.movements.right = false;
          break;
        case "ArrowLeft":
          this.vx = 0;
          this.movements.left = false;
          break;
        case "ArrowUp":
          this.vy = 0;
          this.movements.up = false;
          break;
        case "ArrowDown":
          this.vy = 0;
          this.movements.down = false;
          break;
        default:
          break;
      }
    });
  }

  rotateCharacter(degrees) {
    this.element.style.transform = `rotate(${degrees}deg)`;
    this.element.style.transition = "0.2s";
  }
}
