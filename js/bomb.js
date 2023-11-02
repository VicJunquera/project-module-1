class Bomb {
    constructor(container) {
      this.container = container;
      this.x = 100
      this.y = 100
      this.width = 50;
      this.height = 50;
  
      this.element = document.createElement("div");
      this.element.style.position = "absolute";
      this.element.style.backgroundColor = "red";
/*      this.element.style.background = "url(./assets/bomb.gif)";
      this.element.style.objectFit = "cover"; */
  
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
  
      this.container.appendChild(this.element);
    }
    
    didCollide(obstacle) {
        const itemRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
    
        if (
          itemRect.left < obstacleRect.right &&
          itemRect.right > obstacleRect.left &&
          itemRect.top < obstacleRect.bottom &&
          itemRect.bottom > obstacleRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
}