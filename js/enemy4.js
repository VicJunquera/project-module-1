class Enemy4 {
  constructor(container, player) {
    this.container = container;
    this.player = player;
    this.width = 65;
    this.height = 45;
    this.x = this.getRandomXPosition();
    this.y = this.getRandomYPosition();

    this.scoreValue = 400;
    this.speed = 3;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.background = `url(./assets/enemy4.gif)`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.className = "enemy4";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.transformOrigin = "bottom right";

    this.container.appendChild(this.element);
    this.rotateToFacePlayer();
    this.move();
  }

  getRandomXPosition() {
    const onLeftSide = Math.random() < 0.5;
    return onLeftSide ? 0 : this.container.offsetWidth - this.width;
  }

  getRandomYPosition() {
    const onTopSide = Math.random() < 0.5;
    return onTopSide ? 0 : this.container.offsetHeight - this.height;
  }

  rotateToFacePlayer() {
    const playerX = this.player.x + this.player.width / 2;
    const playerY = this.player.y + this.player.height / 2;

    const enemyX = this.x + this.width / 2;
    const enemyY = this.y + this.height / 2;

    const dx = playerX - enemyX;
    const dy = playerY - enemyY;

    const angle = Math.atan2(dy, dx);
    const degrees = (angle * 180) / Math.PI - 90;

    this.element.style.transform = `rotate(${degrees}deg)`;
  }

  move() {
    const playerX = this.player.x + this.player.width / 2;
    const playerY = this.player.y + this.player.height / 2;

    const angle = Math.atan2(
      playerY - (this.y + this.height / 2),
      playerX - (this.x + this.width / 2)
    );

    const dx = Math.cos(angle) * this.speed;
    const dy = Math.sin(angle) * this.speed;

    this.x += dx;
    this.y += dy;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.rotateToFacePlayer();
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
