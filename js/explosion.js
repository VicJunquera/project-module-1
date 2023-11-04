class Explosion {
  constructor(container, x, y) {
    this.container = container;
    this.x = x - 10;
    this.y = y - 10;
    this.duration = 500;
    this.img = `url(./assets/explosion.gif)`;
    this.createExplosionElement();
  }
  createExplosionElement() {
    this.element = document.createElement("div");
    this.element.className = "explosion";
    this.element.style.position = "absolute";
    this.element.style.background = this.img;
    this.element.style.backgroundSize = "cover";
    this.element.style.width = "100px";
    this.element.style.height = "100px";
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.container.appendChild(this.element);

    setTimeout(() => {
      this.removeExplosion();
    }, this.duration);
  }

  removeExplosion() {
    this.element.remove();
  }
}
