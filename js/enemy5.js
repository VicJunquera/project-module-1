class Enemy5 {
  constructor(container, player) {
    this.container = container;
    this.player = player;
    this.width = 45;
    this.height = 55;
    this.speed = 5; // Adjust the speed as needed

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.background = `url(./assets/enemy2.gif)`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.transformOrigin = "bottom center";



    this.container.appendChild(this.element);
    this.rotateToFacePlayer();
    this.draw();
    this.move();
  }

  rotateToFacePlayer() {
    const degrees = (this.angle * 180) / Math.PI - 90;
    this.element.style.transform = `rotate(${degrees}deg)`;
  }

  move() {
    const dxMove = Math.cos(this.angle) * this.speed;
    const dyMove = Math.sin(this.angle) * this.speed;

    this.x += dxMove;
    this.y += dyMove;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.rotateToFacePlayer();
  }
  draw() {
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0: // Top edge
        x = Math.random() * (this.container.offsetWidth - this.width);
        y = -this.height;
        break;
      case 1: // Right edge
        x = this.container.offsetWidth;
        y = Math.random() * (this.container.offsetHeight - this.height);
        break;
      case 2: // Bottom edge
        x = Math.random() * (this.container.offsetWidth - this.width);
        y = this.container.offsetHeight;
        break;
      case 3: // Left edge
        x = -this.width;
        y = Math.random() * (this.container.offsetHeight - this.height);
        break;
    }

    // Calculate the angle towards the player
    const playerX = this.player.x + this.player.width / 2;
    const playerY = this.player.y + this.player.height / 2;

    const dx = playerX - (x + this.width / 2);
    const dy = playerY - (y + this.height / 2);
    const angle = Math.atan2(dy, dx);

    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  didCollide(obstacle) {
    const enemyRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      enemyRect.left < obstacleRect.right &&
      enemyRect.right > obstacleRect.left &&
      enemyRect.top < obstacleRect.bottom &&
      enemyRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
