class Score {
  constructor(container, lifes, bombs) {
    this.container = container;
    this.lifes = lifes;
    this.bombs = bombs;
    this.bombElements = [];
    this.points = 0;
    this.width = 200;
    this.height = 100;
    this.x = 10;
    this.y = 10;

    this.element = document.createElement("div");
    this.element.id = "score";

    this.scoreTextEl = document.createElement("h2");
    this.scoreTextEl.id = "score-text";
    this.scoreTextEl.textContent = `SCORE: 0`;

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
  update(lifes, collisionType) {
    this.lifes = lifes;
    this.updateHearts(collisionType);
  }

  scorePoints(point) {
    this.points += point;

    const scoreText = document.getElementById("score-text");
    scoreText.textContent = `SCORE: ${this.points}`;
  }

  updateHearts(collisionType) {
    const heartsContainer = document.getElementById("hearts-container");
    const heartsNodes = heartsContainer.getElementsByTagName("img");

    if (collisionType === "enemy") {
      const lastHeart = heartsNodes[heartsNodes.length - 1];
      lastHeart.remove();
    }
  }
  updateBombs(bombs) {
    this.bombs = bombs;
    const bombsContainer = document.getElementById("bombs-container");
    bombsContainer.innerHTML = '';


    for (let i = 0; i < this.bombs; i++) {
      const bomb = document.createElement("img");
      bomb.src = "./assets/bomb.gif";
      bomb.style.width = "30px";
      bomb.style.height = "30px";
  
      bombsContainer.appendChild(bomb);
      this.bombElements.push(bomb);
    }
  }

  removeBomb() {
    if (this.bombElements.length > 0) {
      const bomb = this.bombElements.pop();
      bomb.remove();
    }
  }
    
}
