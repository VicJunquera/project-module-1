class Enemy2 {
    constructor(container) {
        this.container = container;
        this.width = 45;
        this.height = 55;
        this.x =  Math.floor(Math.random() * (this.container.offsetWidth));
        this.y = -50;
        
        this.vy = 5;

        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.background = `url(./assets/enemy2.gif)`;
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundPosition = "center";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;


        this.container.appendChild(this.element);
        this.move();
  
    }

    move() {
        this.y += this.vy;
        this.element.style.top = `${this.y}px`;
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

