import Block from "./Block.js";

class Sprite extends Block {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export default Sprite;
