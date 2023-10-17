import { Gravity } from "./Gravity2d.js";
export class Circle extends Gravity {
    size;
    free = false;
    constructor(size, gravity = undefined) {
        super(gravity);
        this.size = size;
    }
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    moveRight() {
        this.x += 5;
    }
    moveLeft() {
        this.x -= 5;
    }
    launch() {
        this.free = true;
    }
    updatePos() {
        if (this.free)
            this.fall();
    }
}
