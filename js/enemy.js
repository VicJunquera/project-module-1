class Enemy {
    constructor(container) {
        this.container = container;
        this.width = 50;
        this.height = 50;
        
        this.vx = 0;
        this.vy = 0;

        const boardWidth = this.container.offsetWidth;
        const boardHeight = this.container.offsetHeight;


        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.background = `url(./assets/enemy.png)`;
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundPosition = "center";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = Math.random() * (boardWidth - 20) + 'px';
        this.element.style.top = Math.random() * (boardHeight - 20) + 'px';


        this.container.appendChild(this.element);
        this.updateDirection();
        this.move();
  
    }

    move () {
        const speed = 1;
        const angle = Math.random() * 360;
        const deltaX = Math.cos(angle * (Math.PI / 180)) * speed;
        const deltaY = Math.sin(angle * (Math.PI / 180)) * speed;

        const currentX = parseFloat(this.element.style.left);
        const currentY = parseFloat(this.element.style.top);

        this.element.style.left = currentX + deltaX + 'px';
        this.element.style.top = currentY + deltaY + 'px';

        requestAnimationFrame(() => this.move());
    }

    updateDirection() {
        setInterval(() => {
            this.move();
        }, 3000);
    }

}

