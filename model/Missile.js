import Sprite from "./Sprite.js";

const image = new Image(16, 16);
image.src = "./assets/missile.png";

/**
 * The missile object that the user can shoot.
 */
class Missile extends Sprite {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, image);
        this.dy = speed;
    }

    draw(ctx) {
        super.draw(ctx);
    }

    move(canvasWidth) {
        super.move(0, this.dy);
    }

    isOutOfBounds() {
        return this.y < this.height * -1;
    }
}

export default Missile;
