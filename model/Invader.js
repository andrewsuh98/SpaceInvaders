import Sprite from "./Sprite.js";

const image = new Image(50, 50);
const sideCounterDefault = 10;
image.src = "./assets/invader.png";

class Invader extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height, image);
        this.dx = 1;
        this.dy = 3;
        this.sideCounter = sideCounterDefault;
        this.visible = true;
    }

    draw(ctx) {
        if (this.visible) {
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

    move(canvasWidth) {
        super.move(this.dx, this.dy);
        this.sideCounter--;
        if (this.sideCounter === 0) {
            this.dx *= -1;
            this.sideCounter = sideCounterDefault;
        }
        this.handleBoundary(canvasWidth);
    }

    collides(missile) {
        if (this.visible && this.intersects(missile)) {
            this.visible = false;
        }
    }

}

export default Invader;
