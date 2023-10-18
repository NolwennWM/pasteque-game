import { Gravity } from "./Gravity2d.js";
export class Circle extends Gravity {
    size;
    free = false;
    shouldFusion = false;
    constructor(size, gravity = undefined) {
        super(gravity);
        this.size = size;
    }
    /**
     * dessine le cercle
     * @param ctx context du canvas
     */
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    /**
     * Déplace le cercle à droite
     */
    moveRight() {
        this.x += 5;
    }
    /**
     * Déplace le cercle à gauche
     */
    moveLeft() {
        this.x -= 5;
    }
    /**
     * Débloque la balle
     */
    launch() {
        this.free = true;
    }
    /**
     * Déplace la balle
     */
    updatePos() {
        if (this.free)
            this.fall();
    }
}
