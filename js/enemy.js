class Enemy {
    constructor(container) {
        this.container = container;
        this.width = 50;
        this.height = 50;
        this.x = this.container.offsetWidth
        this.y = Math.floor(Math.random() * (this.container.offsetHeight ));
        
        this.vx = -10;

        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.background = `url(./assets/enemy.png)`;
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
        this.x += this.vx;
        this.element.style.left = `${this.x}px`;
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

