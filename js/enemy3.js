class Enemy3 {
  constructor(container) {
    this.container = container;
    this.width = 100;
    this.height = 100;
    this.x = this.container.offsetWidth / 2 - 50;
    this.y = -70;
    this.vy = 5;
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.background = `url(./assets/enemy3.gif)`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.hits = 0;
    this.cooldown = 0;

    // Initialize the enemyBullets array
    this.enemyBullets = [];

    // Flag to track if the enemy is active
    this.isActive = true; // Add an initial active state
    this.startShooting(); // Start shooting immediately

    this.container.appendChild(this.element);
    this.move();

    // Set up a timer to shoot every 2 seconds
    setInterval(() => {
      if (this.container.querySelector(".player") && this.isActive) {
        this.startShooting();
      }
    }, 2000); // Adjust the interval as needed (2 seconds)

    // Set up a timer to update enemy bullet positions
    setInterval(() => {
      this.updateEnemyBullets();
    }, 1000 / 30); // Adjust the interval as needed (30 frames per second)
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
      this.hits++;
      if (this.hits >= 10) {
        this.element.remove();
      }
      return true;
    }
    return false;
  }

  startShooting() {
    if (this.container.querySelector(".player")) {
      const player = this.container.querySelector(".player");
      const playerRectX = (player.getBoundingClientRect().left + 50 / 2) - this.container.getBoundingClientRect().left;
      const playerRectY = (player.getBoundingClientRect().top + 75 / 2) - this.container.getBoundingClientRect().top;
      const angle = Math.atan2(
        playerRectY - (this.y + this.height / 2),
        playerRectX - (this.x + this.width / 2)
      );

      // Create and shoot an enemy bullet
      const enemyBullet = new EnemyBullet(
        this.container,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      );

      // Add the enemy bullet to the array
      this.enemyBullets.push(enemyBullet);
    }
  }

  updateEnemyBullets() {
    // Update the position of each enemy bullet
    this.enemyBullets.forEach((enemyBullet) => {
      enemyBullet.move();
    });
  }
  // Add a method to deactivate the enemy
  deactivate() {
    this.isActive = false;
  }

  // Add a method to reactivate the enemy
  reactivate() {
    this.isActive = true;
    this.startShooting(); // Start shooting when reactivated
  }
}
