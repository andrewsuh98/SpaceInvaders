import Sprite from "./Sprite.js";

const image = new Image(15, 15);
image.src = "./assets/missile.png";

class Missile extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height, image);
        this.dy = -10;
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    keyDownHandler(e) {
        // if (e.key === "Right" || e.key === "ArrowRight") {
        //     this.dx = 7;
        // } else if (e.key === "Left" || e.key === "ArrowLeft") {
        //     this.dx = -7;
        // }
        // TODO: implement what to do when space bar is pressed.
    }

    keyUpHandler(e) {
        // if (e.key === "Right" || e.key === "ArrowRight") {
        //     this.dx = 0;
        // } else if (e.key === "Left" || e.key === "ArrowLeft") {
        //     this.dx = 0;
        // }
    }

    move(canvasWidth) {
        super.move(0, this.dy);
    }
}

export default Missile;
