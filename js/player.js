class Player {
    constructor(container) {
        this.container = container;
        this.width = 50;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.bullets = [];
        this.canShoot = true;
        this.animationTick = 0;
        
        this.draw()
        this.setListeners()
    }

    draw() {
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.backgroundColor = "red"
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`

        this.container.appendChild(this.element)
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
    }
        
    setListeners() {
        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowRight":
                    this.vx = 10;
                    break;
                case "ArrowLeft":
                    this.vx = -10;
                    break;
                case "ArrowUp":
                    this.vy = -10;
                    break;
                case "ArrowDown":
                    this.vy = 10;
                    break;
                default:
                    return;

            }
        })
    

        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowRight":
                case "ArrowLeft":
                case "ArrowUp":
                case "ArrowDown":
                    this.vx = 0
                    this.vy = 0
                    break;
                default:
                    break;
            }
        })
    }
    
}