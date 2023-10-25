class Game {
  constructor(container) {
    this.container = container;
    this.player = new Player(this.container);
    this.enemies = []
    
    setInterval(() => {
      this.enemies.push(new Enemy(this.container));
      }, 2000);
  
  }

  start() {
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 30);


  }

  update() {
    this.player.move();
  }
}
