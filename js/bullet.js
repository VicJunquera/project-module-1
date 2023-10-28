class Bullet {
  constructor(container, player, angle) {
    this.container = container;
    this.width = 14;
    this.height = 14;
    this.speed = 15;
    this.x = player.x + player.width / 2;
    this.y = player.y + player.height / 2;
    this.angle = angle;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundImage = "url(./assets/bullet.gif)";
    this.element.style.objectFit = "cover";

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
