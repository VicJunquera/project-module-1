class Player {
  constructor(container) {
    this.container = container;
    this.width = 50;
    this.height = 70;
    this.x = container.offsetWidth / 2;
    this.y = container.offsetHeight / 2;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.bullets = [];
    this.canShoot = true;
    this.rotation = 0;
    this.hits = 3;
    this.img = `url(./assets/player.gif)`;
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
    this.element.className = "player";
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
    } else if (this.movements.right === true && this.movements.down === true) {
      this.rotatePlayer(135);
    } else if (this.movements.down === true && this.movements.left === true) {
      this.rotatePlayer(-135);
    } else if (this.movements.left === true && this.movements.up === true) {
      this.rotatePlayer(-45);
    } else if (this.movements.up === true) {
      this.rotatePlayer(0);
    } else if (this.movements.right === true) {
      this.rotatePlayer(90);
    } else if (this.movements.down === true) {
      this.rotatePlayer(180);
    } else if (this.movements.left === true) {
      this.rotatePlayer(-90);
    }
  }

  shoot(e) {
    const mouseX = e.clientX - this.container.getBoundingClientRect().left;
    const mouseY = e.clientY - this.container.getBoundingClientRect().top;
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    );
    this.bullets.push(new Bullet(this.container, this, angle));
  }

  setListeners() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowUp":
          this.vy = -this.speed;
          this.movements.up = true;

          break;
        case "ArrowRight":
          this.vx = this.speed;
          this.movements.right = true;

          break;
        case "ArrowDown":
          this.vy = this.speed;
          this.movements.down = true;

          break;
        case "ArrowLeft":
          this.vx = -this.speed;
          this.movements.left = true;

          break;
        case "KeyA":
          this.vx = -this.speed;
          this.movements.left = true;

          break;

        case "KeyW":
          this.vy = -this.speed;
          this.movements.up = true;

          break;
        case "KeyD":
          this.vx = this.speed;
          this.movements.right = true;

          break;
        case "KeyS":
          this.vy = this.speed;
          this.movements.down = true;

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

        case "KeyD":
          this.vx = 0;
          this.movements.right = false;
          break;
        case "KeyA":
          this.vx = 0;
          this.movements.left = false;
          break;
        case "KeyW":
          this.vy = 0;
          this.movements.up = false;
          break;
        case "KeyS":
          this.vy = 0;
          this.movements.down = false;
          break;
        default:
      }
    });
    window.addEventListener("click", (e) => {
      if (this.canShoot) {
        this.shoot(e);
      }
    });
  }

  rotatePlayer(degrees) {
    this.rotation = degrees;
    this.element.style.transform = `rotate(${degrees}deg)`;
    this.element.style.transition = "0s";
    return this.rotation;
  }

  cleanup() {
    const filteredBullets = this.bullets.filter((bullet) => {
      return (
        bullet.x < this.container.offsetWidth &&
        bullet.x > -50 &&
        bullet.y < this.container.offsetHeight &&
        bullet.y > -50
      );
    });

    this.bullets = filteredBullets;
  }

  didCollide(enemy) {
    // Calculate the positions and dimensions of the player and the enemy
    const playerLeft = this.x;
    const playerRight = this.x + this.width;
    const playerTop = this.y;
    const playerBottom = this.y + this.height;

    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + enemy.width;
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + enemy.height;

    // Check for collision using bounding box collision detection
    if (
      playerLeft < enemyRight &&
      playerRight > enemyLeft &&
      playerTop < enemyBottom &&
      playerBottom > enemyTop
    ) {
      return true; // Collided
    }

    return false; // No collision
  }

}
