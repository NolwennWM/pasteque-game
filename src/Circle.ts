import { Gravity } from "./Gravity2d.js";

export class Circle extends Gravity
{
    private free = false;
    public shouldFusion: boolean|Circle = false;
    constructor(public size:number,gravity:number|undefined = undefined)
    {
        super(gravity);
    }
    /**
     * dessine le cercle
     * @param ctx context du canvas
     */
    public drawCircle(ctx:CanvasRenderingContext2D)
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    /**
     * Déplace le cercle à droite
     */
    public moveRight()
    {
        this.x += 5;
    }
    /**
     * Déplace le cercle à gauche
     */
    public moveLeft()
    {
        this.x -= 5;
    }
    /**
     * Débloque la balle
     */
    public launch()
    {
        this.free = true;
    }
    /**
     * Déplace la balle
     */
    public updatePos()
    {
        if(this.free) this.fall();
    }
}