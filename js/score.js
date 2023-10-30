class Score {
  constructor(container, lifes) {
    this.container = container;
    this.lifes = lifes;
    this.bombs = 0;
    this.score = 0;

    this.width = 150;
    this.height = 100;
    this.x = 10;
    this.y = 10;

    this.element = document.createElement("div");
    this.element.id = "score";

    this.scoreTextEl = document.createElement("h2");
    this.scoreTextEl.id = "score-text";
    this.scoreTextEl.textContent = `SCORE: ${this.score}`;

    this.heartsContainer = document.createElement("div");
    this.heartsContainer.id = "hearts-container";
    this.bombsContainer = document.createElement("div");
    this.bombsContainer.id = "bombs-container";

    new Array(this.lifes).fill("").forEach((_) => {
      const heart = document.createElement("img");
      heart.src = "./assets/player.gif";
      heart.style.width = "30px";
      heart.style.height = "30px";

      this.heartsContainer.appendChild(heart);
    });

    new Array(this.bombs).fill("").forEach((_) => {
      const bomb = document.createElement("img");
      bomb.src = "./assets/bomb.gif";
      bomb.style.width = "30px";
      bomb.style.height = "30px";

      this.bombsContainer.appendChild(bomb);
    });

    this.element.appendChild(this.scoreTextEl);
    this.element.appendChild(this.heartsContainer);
    this.element.appendChild(this.bombsContainer);

    this.element.style.position = "absolute";

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.container.appendChild(this.element);
  }
}
