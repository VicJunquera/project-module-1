class Game {
  constructor(container) {
    this.container = container;
    this.player = new Player(this.container);
    this.enemies = [];
    this.score = new Score(this.container, this.player.hits);

    setInterval(() => {
      this.enemies.push(new Enemy(this.container));
    }, 2000);
  }

  start() {
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 30);
  }

  cleanup() {
    this.enemies.forEach((enemy) => {
      const inBoard = enemy.x + enemy.width > 0;
      if (!inBoard) {
        console.log("enemy.element", enemy.element);
        enemy.element.remove();
      }
    });

    const filteredEnemies = this.enemies.filter((enemy) => {
      return enemy.x + enemy.width > 0;
    });

    this.enemies = filteredEnemies;
  }

  checkCollisions() {
    // Enemy - player collision

    const collidedEnemy = this.enemies.find((enemy) => {
      return enemy.didCollide(this.player);
    });

    if (collidedEnemy) {
      this.enemies = this.enemies.filter((enemy) => {
        return enemy !== collidedEnemy;
      });
      this.score.score = 10;

      collidedEnemy.element.style.display = "none";
      this.player.hits--;
    }

    // bullet - enemy collision

    this.player.bullets.find((bullet) => {
      return this.enemies.find((enemy) => {
        if (enemy.didCollide(bullet)) {
          enemy.element.remove();

          this.enemies = this.enemies.filter((en) => {
            return en !== enemy;
          });

          bullet.element.remove();

          this.player.bullets = this.player.bullets.filter((bul) => {
            return bul !== bullet;
          });
        }
      });
    });
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
  update() {
    this.player.move();
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
    this.checkCollisions();
    this.cleanup();
  }
}
