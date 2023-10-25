import { Gravity } from "./Gravity2d.js";
export class Circle extends Gravity {
    size;
    color;
    free = false;
    shouldFusion = false;
    constructor(size, color, gravity = undefined) {
        super(gravity);
        this.size = size;
        this.color = color;
    }
    /**
     * dessine le cercle
     * @param ctx context du canvas
     */
    drawCircle(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    /**
     * Déplace le cercle sur l'axe X
     * @param speed vitesse horizontal
     * @param maxPos position à ne pas dépasser.
     */
    moveX(speed, maxPos) {
        this.x += speed;
        console.log(speed, maxPos, this.x);
        if (speed <= 0 && this.x < maxPos)
            this.x = maxPos;
        if (speed >= 0 && this.x > maxPos)
            this.x = maxPos;
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
