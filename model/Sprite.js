import Block from "./Block.js";

/**
 * A block object that can move.
 */
class Sprite extends Block {
    constructor(x, y, width, height, image) {
        super(x, y, width, height, image);
    }

    /**
     * Updates the x and y values to according to the current speed.
     *
     * @param dx: horizontal speed.
     * @param dy: vertical speed.
     */
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export default Sprite;
