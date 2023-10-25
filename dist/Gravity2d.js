import { Collision } from "./Collision.js";
export class Gravity extends Collision {
    g = 0.05;
    gSpeed = 0;
    fallLimit = 0;
    constructor(gravity = undefined) {
        super();
        this.g = gravity ?? this.g;
    }
    set setFallLimit(bottom) {
        this.fallLimit = bottom;
    }
    /**
     * Fait tomber l'élément.
     * @returns undefined
     */
    fall() {
        if (this.colliding) {
            this.gSpeed = 0;
            return;
        }
        this.gSpeed += this.g;
        this.y += this.gSpeed;
        // console.log(this.y, this.fallLimit);
        if (this.y > this.fallLimit) {
            this.y = this.fallLimit;
            this.colliding = true;
        }
    }
}
