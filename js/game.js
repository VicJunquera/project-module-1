class Game {
  constructor(container) {
    this.container = container;
    this.player = new Player(this.container);
    this.score = new Score(this.container, this.player.hits);
    this.enemies = [];
    this.enemyBoss = [];

   /* setInterval(() => {
      this.enemies.push(new Enemy(this.container));
    }, 3000);

    setInterval(() => {
      this.enemies.push(new Enemy2(this.container));
    }, 1200);*/

    setInterval(() => {
      if (!this.enemyBoss.length) {
        this.enemyBoss.push(new Enemy3(this.container));
      }
    }, 5000);
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

      collidedEnemy.element.style.display = "none";
      this.player.hits--;
    }

    // EnemyBoss - player collision
    const collidedBoss = this.enemyBoss.find((enemy) => {
      return enemy.didCollide(this.player);
    });

    if (collidedBoss) {
      this.enemyBoss = this.enemyBoss.filter((enemy) => {
        return enemy !== collidedBoss;
      });

      collidedBoss.element.style.display = "none";
      this.player.hits--;
    }

    // bullet - enemy collision
    this.player.bullets.find((bullet) => {
      this.enemies.find((enemy) => {
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
      // Create an array to store bullets that need to be removed
      const bulletsToRemove = [];

      // bullet - enemyBoss collision
      this.player.bullets = this.player.bullets.filter((bullet) => {
        const collidedBoss = this.enemyBoss.find((enemy) => {
          if (enemy.didCollide(bullet)) {
            enemy.hits++; // Increase the hit count of the enemyBoss
            if (enemy.hits >= 10) {
              enemy.deactivate();
              enemy.element.remove(); // Remove the Enemy3
              enemy.enemyBullets.forEach((enemyBullet) => {
                enemyBullet.element.remove();
              });
  
            }
            bullet.element.remove(); // Remove the bullet
            return true; // Return true to remove the bullet
          }
          return false;
        });

        // Return true to remove the bullet only if it hit an enemyBoss
        return !collidedBoss;
      });

      // Remove defeated Enemy3 from the enemyBoss array
      this.enemyBoss = this.enemyBoss.filter((enemy) => enemy.hits < 10);

      // Remove bullets that need to be removed
      bulletsToRemove.forEach((bullet) => {
        bullet.element.remove();
        this.player.bullets = this.player.bullets.filter(
          (bul) => bul !== bullet
        );
      });
    });
  }

  update() {
    this.player.move();
    this.enemies.forEach((enemy) => {
      enemy.move();
    });

    this.enemyBoss.forEach((enemy) => {
      enemy.move();
    });

    this.checkCollisions();
    this.cleanup();
  }
}