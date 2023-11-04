class Bomb {
  constructor(container) {
    this.container = container;
    this.width = 45;
    this.height = 45;
    this.x = Math.floor(
      Math.random() * (this.container.offsetWidth - this.width)
    );
    this.y = Math.floor(
      Math.random() * (this.container.offsetHeight - this.height)
    );
    this.collected = false;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.background = "url(./assets/bomb.gif)";
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
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
