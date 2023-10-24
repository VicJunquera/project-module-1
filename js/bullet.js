class Bullet {
  constructor(container, x, y, playerRotation) {
    this.container = container;
    this.width = 5;
    this.height = 5;
    this.speed = 5;
    this.x = x;
    this.y = y;
    this.rotation = playerRotation;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundColor = "red";
    this.element.style.borderRadius = "100%";

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.container.appendChild(this.element);

    this.move();
  }

  move() {
    const radians = (this.rotation * Math.PI) / 180;
    const dx = Math.cos(radians) * this.speed;
    const dy = Math.sin(radians) * this.speed;

    this.x += dx;
    this.y += dy;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}
