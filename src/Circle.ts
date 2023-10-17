import { Gravity } from "./Gravity2d.js";

export class Circle extends Gravity
{
    private free = false;
    constructor(public size:number,gravity:number|undefined = undefined)
    {
        super(gravity);
    }
    public drawCircle(ctx:CanvasRenderingContext2D)
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    public moveRight()
    {
        this.x += 5;
    }
    public moveLeft()
    {
        this.x -= 5;
    }
    public launch()
    {
        this.free = true;
    }
    public updatePos()
    {
        if(this.free) this.fall();
    }
}