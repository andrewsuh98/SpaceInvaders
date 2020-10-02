import Sprite from "./Sprite.js";

const image = new Image(50, 50);
image.src = "./assets/tank.png";

/**
 * The Tank object that the user can control.
 */
class Tank extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height, image);
        this.dx = 0;
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    /**
     * Listens for keypress on left and right key.
     * Updates the speed in the key direction.
     *
     * @param e: the event object given by the addEventListener.
     */
    keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 8;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = -8;
        }
    }

    /**
     * Listens for keyup on left and right key.
     * Assigns the speed to 0 when key is lifted.
     *
     * @param e: the event object given by the addEventListener.
     */
    keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 0;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = 0;
        }
    }

    /**
     * Keeps the speed at 0 if the user tries to extend beyoned canvas boundary.
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
     * Calls the move method of the parent class, then checks for boundary.
     * @param canvasWidth
     */
    move(canvasWidth) {
        super.move(this.dx, 0);
        this.handleBoundary(canvasWidth);
    }

}

export default Tank;
