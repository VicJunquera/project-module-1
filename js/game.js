class Game {
    constructor(container) {
        this.container = container;
        this.player = new Player(this.container);
    }
    
    start() {
    this.intervalId = setInterval(() => {
        this.update()

    }, 1000/36)
    }

    update () {
        this.player.move()

    }
}