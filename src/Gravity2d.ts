export abstract class Gravity
{
    public x = 0;
    public y = 0;
    protected g = 0.05;
    protected gSpeed = 0;
    protected ground = 0;

    constructor(gravity:number|undefined = undefined)
    {
        this.g = gravity??this.g;
    }
    set setGround(bottom: number)
    {
        this.ground = bottom;
    }
    fall()
    {
        this.gSpeed += this.g;
        this.y += this.gSpeed;
    }
}