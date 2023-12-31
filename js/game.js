class Game {
  constructor(container) {
    this.container = container;
    this.player = new Player(this.container, this);
    this.score = new Score(this.container, this.player.hits, this.player.bombs);
    this.enemies = [];
    this.enemyBoss = [];
    this.enemyBossMilestone = 0;
    this.enemyTick = 0;
    this.activeEnemyBoss = true;
    this.arrBombs = [];
    this.scoreBombsArr = [];
    this.activeBomb = true;
    this.bombMilestone = 0;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.enemyTick++;
      this.enemyAppear();
      this.bombAppear();
      this.update();
    }, 1000 / 30);

    const gameMusic = document.getElementById("game-music");
    gameMusic.play();
  }

  enemyAppear() {
    if (this.score.points <= 10000) {
      if (this.score.points >= 0 && this.enemyTick % 90 === 0) {
        this.enemies.push(new Enemy(this.container));
      }
      if (this.score.points >= 500 && this.enemyTick % 120 === 0) {
        this.enemies.push(new Enemy2(this.container));
      }
      if (this.score.points >= 1500 && this.enemyTick % 150 === 0) {
        this.enemies.push(new Enemy5(this.container, this.player));
      }
      if (this.score.points >= 5000 && this.enemyTick % 300 === 0) {
        this.enemies.push(new Enemy4(this.container, this.player));
      }
    } else {
      if (this.score.points >= 0 && this.enemyTick % 45 === 0) {
        this.enemies.push(new Enemy(this.container));
      }
      if (this.score.points >= 500 && this.enemyTick % 60 === 0) {
        this.enemies.push(new Enemy2(this.container));
      }
      if (this.score.points >= 1500 && this.enemyTick % 75 === 0) {
        this.enemies.push(new Enemy5(this.container, this.player));
      }
      if (this.score.points >= 5000 && this.enemyTick % 150 === 0) {
        this.enemies.push(new Enemy4(this.container, this.player));
      }
    }

    const currentMilestone = Math.floor(this.score.points / 5000);
    if (
      currentMilestone > this.enemyBossMilestone &&
      this.score.points !== 0 &&
      this.score.points >= 5000 &&
      this.activeEnemyBoss
    ) {
      this.enemyBossMilestone = currentMilestone;
      this.enemyBoss.push(new Enemy3(this.container));
      this.activeEnemyBoss = false;
    }
  }

  bombAppear() {
    const currentMilestone = Math.floor(this.score.points / 6000);

    if (
      currentMilestone > this.bombMilestone &&
      this.arrBombs.length < 1 &&
      this.score.points !== 0 &&
      !this.scoreBombsArr.includes(this.score.points)
    ) {
      this.arrBombs.push(new Bomb(this.container));
      this.bombMilestone = currentMilestone;
    }
  }

  activateBomb() {
    this.enemies.forEach((enemy) => {
      enemy.element.remove();
      new Explosion(this.container, enemy.x, enemy.y);
      this.score.scorePoints(enemy.scoreValue);
    });
    this.enemyBoss.forEach((enemy) => {
      enemy.deactivate();
      enemy.element.remove();
      new Explosion(this.container, enemy.x, enemy.y);
      this.score.scorePoints(enemy.scoreValue);
      enemy.enemyBullets.forEach((enemyBullet) => {
        enemyBullet.element.remove();
      });
      this.activeEnemyBoss = true;
    });

    this.player.bombs--;
    this.enemies = [];
    this.enemyBoss = [];
  }

  checkCollisions() {
    // Enemy - player collision

    const collidedEnemy = this.enemies.find((enemy) => {
      return enemy.didCollide(this.player);
    });

    if (collidedEnemy) {
      new Explosion(this.container, collidedEnemy.x, collidedEnemy.y);
      this.enemies = this.enemies.filter((enemy) => {
        return enemy !== collidedEnemy;
      });

      collidedEnemy.element.style.display = "none";

      this.player.hits--;
      this.score.update(this.player.hits, "enemy");
    }

    // EnemyBoss - player collision

    const collidedBoss = this.enemyBoss.find((enemy) => {
      return enemy.didCollide(this.player);
    });

    if (collidedBoss) {
      new Explosion(this.container, collidedBoss.x, collidedBoss.y);
      this.enemyBoss = this.enemyBoss.filter((enemy) => {
        return enemy !== collidedBoss;
      });
      collidedBoss.element.style.display = "none";
      this.player.hits--;
      this.score.update(this.player.hits, "enemy");
      collidedBoss.deactivate();
      collidedBoss.element.remove();
      this.score.scorePoints(collidedBoss.scoreValue);
      collidedBoss.enemyBullets.forEach((enemyBullet) => {
        enemyBullet.element.remove();
      });

      this.activeEnemyBoss = true;
    }

    // bullet - enemy collision

    this.player.bullets.find((bullet) => {
      this.enemies.find((enemy) => {
        if (enemy.didCollide(bullet)) {
          enemy.element.remove();
          new Explosion(this.container, enemy.x, enemy.y);
          this.enemies = this.enemies.filter((en) => {
            return en !== enemy;
          });

          bullet.element.remove();
          this.score.scorePoints(enemy.scoreValue);

          this.player.bullets = this.player.bullets.filter((bul) => {
            return bul !== bullet;
          });
        }
      });

      const bulletsToRemove = [];

      // bullet - enemyBoss collision

      this.player.bullets = this.player.bullets.filter((bullet) => {
        const collidedBoss = this.enemyBoss.find((enemy) => {
          if (enemy.didCollide(bullet)) {
            enemy.hits++;

            if (enemy.hits >= 30) {
              enemy.deactivate();
              enemy.element.remove();
              new Explosion(this.container, enemy.x, enemy.y);
              this.score.scorePoints(enemy.scoreValue);
              enemy.enemyBullets.forEach((enemyBullet) => {
                enemyBullet.element.remove();
              });
              this.activeEnemyBoss = true;
            }

            bullet.element.remove();
            return true;
          }

          return false;
        });

        return !collidedBoss;
      });

      this.enemyBoss = this.enemyBoss.filter((enemy) => enemy.hits <= 30);

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
          this.player.hits--;
          this.score.update(this.player.hits, "enemy");
          this.player.element.style.display = "none";

          const blinkInterval = setInterval(() => {
            this.player.element.style.display =
              this.player.element.style.display === "none" ? "block" : "none";
          }, 200);

          setTimeout(() => {
            clearInterval(blinkInterval);
            this.player.element.style.display = "block";
          }, 2000);
          return false;
        } else {
          return true;
        }
      });
    });

    // player - bomb collision

    const collidedBomb = this.arrBombs.find((bomb) => {
      return bomb.didCollide(this.player);
    });
    if (collidedBomb) {
      this.scoreBombsArr.push(this.score.points);
      if (this.player.bombs < 3) {
        this.player.bombs++;
        this.score.updateBombs(this.player.bombs);
      }

      this.arrBombs = this.arrBombs.filter((bomb) => bomb !== collidedBomb);
      collidedBomb.element.remove();
    }

    if (collidedEnemy || collidedBoss) {
      this.player.element.style.display = "none";

      const blinkInterval = setInterval(() => {
        this.player.element.style.display =
          this.player.element.style.display === "none" ? "block" : "none";
      }, 200);

      setTimeout(() => {
        clearInterval(blinkInterval);
        this.player.element.style.display = "block";
      }, 2000);
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
    gameOverBoard.style.flexDirection = "column";
    gameOverBoard.style.justifyContent = "space-around";
    gameOverBoard.style.alignItems = "center";

    const scoreContainer = document.getElementById("score-container");
    scoreContainer.textContent = `SCORE: ${this.score.points}`;

    clearInterval(this.intervalId);

    const gameMusic = document.getElementById("game-music");
    const gameOverMusic = document.getElementById("game-over-music");
    gameMusic.pause();
    gameOverMusic.play();
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
