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
    this.rotation = 0;
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
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.container.appendChild(this.element);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x > this.container.offsetWidth) {
      this.x = -this.width;
    } else if (this.x < -this.width) {
      this.x = this.container.offsetWidth;
    }

    if (this.y > this.container.offsetHeight) {
      this.y = -this.height;
    } else if (this.y < -this.height) {
      this.y = this.container.offsetHeight;
    }

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.bullets.forEach((bullet) => {
      bullet.move();
    });
    this.cleanup();
    this.animate();
  }

  animate() {
    if (this.movements.up === true && this.movements.right === true) {
      this.rotatePlayer(45);
    }
    if (this.movements.right === true && this.movements.down === true) {
      this.rotatePlayer(135);
    }
    if (this.movements.down === true && this.movements.left === true) {
      this.rotatePlayer(-135);
    }
    if (this.movements.left === true && this.movements.up === true) {
      this.rotatePlayer(-45);
    }
  }

  shoot() {
    this.bullets.push(
      new Bullet(this.container, this.x, this.y, this.rotation)
    );

    this.canShoot = false;

    setTimeout(() => {
      this.canShoot = true;
    }, 100);
  }

  setListeners() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowUp":
          this.vy = -5;
          this.movements.up = true;
          this.rotatePlayer(0);
          break;
        case "ArrowRight":
          this.vx = 5;
          this.movements.right = true;
          this.rotatePlayer(90);
          break;
        case "ArrowDown":
          this.vy = 5;
          this.movements.down = true;
          this.rotatePlayer(180);
          break;
        case "ArrowLeft":
          this.vx = -5;
          this.movements.left = true;
          this.rotatePlayer(-90);
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
      }
    });
    window.addEventListener("click", (e) => {
      if (this.canShoot) {
        this.shoot();
      }
    });
  }

  rotatePlayer(degrees) {
    this.rotation = degrees;
    this.element.style.transform = `rotate(${degrees}deg)`;
    this.element.style.transition = "0.1s";
    return this.rotation;
  }

  cleanup() {
    const filteredBullets = this.bullets.filter((bullet) => {
      return (
        bullet.x < this.container.offsetWidth &&
        bullet.x > -5 &&
        bullet.y < this.container.offsetHeight &&
        bullet.y > -5
      );
    });

    this.bullets = filteredBullets;
  }
}
