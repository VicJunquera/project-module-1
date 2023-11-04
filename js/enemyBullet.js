class EnemyBullet {
  constructor(container, x, y, angle) {
    this.container = container;
    this.width = 20;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 5;
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundImage = "url(./assets/enemybullet.gif)";
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
    const radians = this.angle;
    const dx = Math.cos(radians) * this.speed;
    const dy = Math.sin(radians) * this.speed;

    this.x += dx;
    this.y += dy;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}
