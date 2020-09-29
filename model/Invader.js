import Sprite from "./Sprite.js";

const image = new Image(50, 50);
image.src = "./assets/invader.png";

class Invader extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height, image);
        this.dx = 0;
        this.dy = 5;
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
        this.handleBoundary(canvasWidth);
    }

}

export default Invader;
