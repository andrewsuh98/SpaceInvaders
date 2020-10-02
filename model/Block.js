/**
 * A object that has values of x, y, width, height, and the image.
 */
class Block {
    constructor(x, y, width, height, image) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.image = image;
    }

    /**
     * Draws the given image at location x, y, with the provided width and height.
     *
     * @param ctx: the canvas to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    /**
     * Determine if two objects have intersected.
     *
     * @param other: the object to compare if it has intersected with.
     * @returns {boolean} true if the objects have intersected, else false.
     */
    intersects(other) {
        let tw = this.width;
        let th = this.height;
        let rw = other.width;
        let rh = other.height;
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
            return false;
        }
        let tx = this.x;
        let ty = this.y;
        let rx = other.x;
        let ry = other.y;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        //      overflow || intersect
        return (
            (rw < rx || rw > tx) &&
            (rh < ry || rh > ty) &&
            (tw < tx || tw > rx) &&
            (th < ty || th > ry)
        );
    }
}

export default Block;