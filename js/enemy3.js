class Enemy3 {
  constructor(container) {
    this.container = container;
    this.width = 120;
    this.height = 120;
    this.x = this.container.offsetWidth / 2 - 50;
    this.y = -70;
    this.vy = 5;

    this.scoreValue = 800;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.background = `url(./assets/enemy3.gif)`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.className = "enemyBoss";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.hits = 0;
    this.cooldown = 0;

    this.enemyBullets = [];

    this.isActive = true;
    this.startShooting();

    this.container.appendChild(this.element);
    this.move();

    this.enemyShootInterval = setInterval(() => {
      if (this.container.querySelector(".player") && this.isActive) {
        this.startShooting();
      }
    }, 1000);

    setInterval(() => {
      this.updateEnemyBullets();
    }, 1000 / 30);
  }

  move() {
    this.y += this.vy;
    this.element.style.top = `${this.y}px`;

    if (this.y + this.height / 2 >= this.container.offsetHeight / 2) {
      this.y = this.container.offsetHeight / 2 - this.height / 2;
    }
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
    }
    return false;
  }

  startShooting() {
    if (this.container.querySelector(".player")) {
      const player = this.container.querySelector(".player");
      const playerRectX =
        player.getBoundingClientRect().left +
        50 / 2 -
        this.container.getBoundingClientRect().left;
      const playerRectY =
        player.getBoundingClientRect().top +
        75 / 2 -
        this.container.getBoundingClientRect().top;
      const angle = Math.atan2(
        playerRectY - (this.y + this.height / 2),
        playerRectX - (this.x + this.width / 2)
      );

      const enemyBullet = new EnemyBullet(
        this.container,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      );

      this.enemyBullets.push(enemyBullet);
    }
  }

  updateEnemyBullets() {
    this.enemyBullets.forEach((enemyBullet) => {
      enemyBullet.move();
    });
    this.cleanupEnemyBullets();
  }

  deactivate() {
    this.isActive = false;
    clearInterval(this.shootingInterval);
  }

  cleanupEnemyBullets() {
    this.enemyBullets.forEach((bullet) => {
      if (
        bullet.x < 0 ||
        bullet.x > this.container.offsetWidth ||
        bullet.y < 0 ||
        bullet.y > this.container.offsetHeight
      ) {
        bullet.element.remove();
      }
    });

    this.enemyBullets = this.enemyBullets.filter((bullet) => {
      return !(
        bullet.x < 0 ||
        bullet.x > this.container.offsetWidth ||
        bullet.y < 0 ||
        bullet.y > this.container.offsetHeight
      );
    });
  }
}
