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

        this.hits = 10


        this.container.appendChild(this.element);
        this.move();
  
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
        } else {
          return false;
        }
      }
}

