import { Collision } from "./Collision.js";

export abstract class Gravity extends Collision
{
    protected g = 0.05;
    protected gSpeed = 0;
    protected fallLimit = 0;

    constructor(gravity:number|undefined = undefined)
    {
        super();
        this.g = gravity??this.g;
    }
    set setFallLimit(bottom: number)
    {
        this.fallLimit = bottom;
    }
    /**
     * Fait tomber l'élément.
     * @returns undefined
     */
    fall()
    {
        if(this.colliding) 
        {
            this.gSpeed = 0;
            return;
        }
        this.gSpeed += this.g;
        this.y += this.gSpeed;
        if(this.y > this.fallLimit)
            this.y = this.fallLimit;
    }
}