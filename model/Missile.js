import Sprite from "./Sprite.js";

const image = new Image(16, 16);
image.src = "./assets/missile.png";

class Missile extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height, image);
        this.dy = -10;
    }

    move(canvasWidth) {
        super.move(0, this.dy);
    }
}

export default Missile;
