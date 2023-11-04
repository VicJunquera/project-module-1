class Game {
  constructor(container) {
    this.container = container;
    this.player = new Player(this.container);
    this.score = new Score(this.container, this.player.hits);
    this.enemies = [];
    this.enemyBoss = [];
    this.enemyTick = 0;
    this.activeEnemyBoss = true;
    this.bombs = [];
    this.activeBomb = true;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.enemyTick++
      this.enemyAppear();
      this.update();
    }, 1000 / 30);
  }

  

  enemyAppear() {
    if (this.score.points >= 0 && this.enemyTick % 90 === 0) {
      this.enemies.push(new Enemy(this.container));
    }
    if (this.score.points >= 300 && this.enemyTick % 90 === 0) {
      this.enemies.push(new Enemy2(this.container))
    }
    if (this.score.points >= 1000 && this.enemyTick % 120 === 0) {
      this.enemies.push(new Enemy5(this.container, this.player));
    }
    if (this.score.points >= 2000 && this.enemyTick % 600 === 0) {
      this.enemies.push(new Enemy4(this.container, this.player));
    }
    if (this.score.points % 5000 === 0 && this.score.points >= 15000 && this.activeEnemyBoss) {
      this.enemyBoss.push(new Enemy3(this.container));
      this.activeEnemyBoss = false;
    }

    /*if (this.score.points === 200 && this.activeBomb){
      console.log("entra")
      this.bombs.push(new Bomb(this.container));
      this.activeBomb = false;
    }*/

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
      this.player.element.style.display = "none";

      // Después de 2 segundos, volver a mostrar al jugador
      setTimeout(() => {
        this.player.element.style.display = "block";
      }, 2000);
      this.player.hits--;
      this.score.update(this.player.hits, "enemy");
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
      this.player.element.style.display = "none";

      // Después de 2 segundos, volver a mostrar al jugador
      setTimeout(() => {
        this.player.element.style.display = "block";
      }, 2000);
      this.player.hits--;

      // Deactivate the Enemy3 when it collides with the player
      collidedBoss.deactivate();
      this.score.update(this.player.hits, "enemy");
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
          this.score.scorePoints(100);

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
              enemy.element.remove();
              this.score.scorePoints(1000); // Remove the Enemy3
              enemy.enemyBullets.forEach((enemyBullet) => {
                enemyBullet.element.remove();
              });
              this.activeEnemyBoss = true;
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

    this.enemyBoss.forEach((enemy) => {
      enemy.enemyBullets = enemy.enemyBullets.filter((enemyBullet) => {
        if (this.player.didCollide(enemyBullet)) {
          enemyBullet.element.remove();
          this.player.hits--; // Decrease player's hits
          this.score.update(this.player.hits, "enemy");
          this.player.element.style.display = "none";

          // Después de 2 segundos, volver a mostrar al jugador
          setTimeout(() => {
            this.player.element.style.display = "block";
          }, 2000);
          return false; // Remove the enemyBullet
        } else {
          return true; // Keep the enemyBullet
        }
      });
    });

    // player - bomb collision
    const collidedBomb = this.bombs.find((bomb) => {
      return bomb.didCollide(this.player);
    });
if (this.collidedBomb) {
  this.activeBomb = true;
  this.player.bombs++;
  this.score.update(this.player.bombs, "bomb");
}
  }

  cleanup() {
    this.enemies.forEach((enemy) => {
      const inBoard =
        enemy.x + enemy.width > 0 &&
        enemy.x < this.container.offsetWidth &&
        enemy.y + enemy.height > 0 &&
        enemy.y < this.container.offsetHeight;
      if (!inBoard) {
        enemy.element.remove();
      }
    });

    const filteredEnemies = this.enemies.filter((enemy) => {
      return (
        enemy.x + enemy.width > 0 &&
        enemy.x < this.container.offsetWidth &&
        enemy.y + enemy.height > 0 &&
        enemy.y < this.container.offsetHeight
      );
    });

    this.enemies = filteredEnemies;
  }

  gameOver() {
    const gameOverBoard = document.getElementById("game-over-board");
    gameOverBoard.style.display = "flex";

    const scoreContainer = document.getElementById("score-container");
    scoreContainer.textContent = `SCORE: ${this.score.points}`;


    clearInterval(this.intervalId);
  }

  update() {
    this.score.scorePoints(0);
    this.player.move();
    this.enemies.forEach((enemy) => {
      enemy.move();
    });

    this.enemyBoss.forEach((enemy) => {
      enemy.move();
    });

    this.checkCollisions();
    if (this.player.hits === 0) {
      this.gameOver();
  }
    this.cleanup();

  }
}
