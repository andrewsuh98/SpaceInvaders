import Sprite from "./Sprite.js";

const image = new Image(50, 50);
const sideCounterDefault = 10;
image.src = "./assets/invader.png";

const gameOver = new CustomEvent("gameover");

class Invader extends Sprite {
    constructor(x, y, width, height, dy) {
        super(x, y, width, height, image);
        this.dx = 1;
        this.dy = dy;
        this.sideCounter = sideCounterDefault;
    }

    draw(ctx, canvasHeight) {
        if(this.touchGround(canvasHeight)) {
            document.dispatchEvent(gameOver);
        } else {
            super.draw(ctx);
        }
    }

    handleBoundary(canvasWidth) {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        }
    }

    touchGround(canvasHeight) {
        return this.y + 40 >= canvasHeight;
    }

    move(canvasWidth) {
        super.move(this.dx, this.dy);
        this.sideCounter--;
        if (this.sideCounter === 0) {
            this.dx *= -1;
            this.sideCounter = sideCounterDefault;
        }
        this.handleBoundary(canvasWidth);
    }

}

export default Invader;
