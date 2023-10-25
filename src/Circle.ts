import { Gravity } from "./Gravity2d.js";

export class Circle extends Gravity
{
    private free = false;
    public shouldFusion: boolean|Circle = false;
    constructor(public size:number,public color:string, gravity:number|undefined = undefined)
    {
        super(gravity);
    }
    /**
     * dessine le cercle
     * @param ctx context du canvas
     */
    public drawCircle(ctx:CanvasRenderingContext2D)
    {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    /**
     * Déplace le cercle sur l'axe X
     * @param speed vitesse horizontal
     * @param maxPos position à ne pas dépasser.
     */
    public moveX(speed: number, maxPos:number)
    {
        this.x += speed;   
        console.log(speed, maxPos, this.x);
        if(speed <= 0 && this.x < maxPos)
            this.x = maxPos;
        if (speed >= 0 && this.x > maxPos)
            this.x = maxPos;
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