import Sprite from "./Sprite.js";

const image = new Image(50, 50);
image.src = "./assets/tank.png";

class Tank extends Sprite {
    constructor(x, y, width, height, image) {
        super(x, y, width, height, image);
        this.dx = 0;
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 7;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = -7;
        }
    }

    keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 0;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = 0;
        }
    }

    handleBoundary(canvasWidth) {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        }
    }

    move(canvasWidth) {
        super.move(this.dx, 0);
        this.handleBoundary(canvasWidth);
    }

}

export default Tank;
