import Sprite from "./Sprite.js";

const image = new Image(50, 50);
const sideCounterDefault = 15;
image.src = "./assets/invader.png";

const gameOver = new CustomEvent("gameover");

/**
 * The invader object.
 */
class Invader extends Sprite {
    constructor(x, y, width, height, dy) {
        super(x, y, width, height, image);
        this.dx = 0.5;
        this.dy = dy;
        this.sideCounter = sideCounterDefault;
    }

    /**
     * Checks if the invader has reached the bottom of the canvas.
     * If reached, it dispatches the "gameover" event.
     * Else, it draws the invader on the canvas.
     *
     * @param ctx: the canvas to draw on.
     * @param canvasHeight: the height of the canvas.
     */
    draw(ctx, canvasHeight) {
        if(this.touchGround(canvasHeight)) {
            document.dispatchEvent(gameOver);
        } else {
            super.draw(ctx);
        }
    }

    /**
     * Handles the boundary. Does not allow the invader to move
     * beyond the canvas width.
     *
     * @param canvasWidth: the width of the canvas.
     */
    handleBoundary(canvasWidth) {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        }
    }

    /**
     * Determines if the invader has touched the bottom of the canvas.
     *
     * @param canvasHeight: the height of the canvas.
     * @returns {boolean}: true if the invader has touched the ground.
     */
    touchGround(canvasHeight) {
        return this.y + 40 >= canvasHeight;
    }

    /**
     * Moves the invader. It also adds sideways wiggle.
     *
     * @param canvasWidth: the width of the canvas.
     */
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
