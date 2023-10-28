class Game {
  constructor(container) {
    this.container = container;
    this.player = new Player(this.container);
    this.enemies = []
    this.enemyBoss = []

    setInterval(() => {
      this.enemies.push(new Enemy(this.container));
      }, 3000);

    setInterval(() => {
      this.enemies.push(new Enemy2(this.container));
      }, 1200);

    setInterval(() => {
      this.enemies.push(new Enemy3(this.container))
    }, 1000)
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
  update() {
    this.player.move();
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
    this.checkCollisions()
    this.cleanup()
  }
}