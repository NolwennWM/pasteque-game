import { Settings } from "./Settings.js";

export abstract class Canvas extends Settings
{
    protected canvas = document.createElement("canvas");
    protected ctx = this.canvas.getContext("2d")!;

    constructor(protected parent = document.body)
    {
        super();
        parent.append(this.canvas);
        this.resize();
        this.settings();
    }
    /**
     * Paramètre la taille du canvas selon celle de son parent.
     * @returns undefined
     */
    private resize()
    {
        const size = this.canvas.parentElement?.getBoundingClientRect();
        if(!size) return;
        this.canvas.width = Math.floor(size.width * window.devicePixelRatio);
        this.canvas.height = Math.floor(size.height * window.devicePixelRatio);
        console.log(size.height, this.canvas.height);
        
    }
    /**
     * paramètre le canvas.
     */
    private settings()
    {
        this.ctx.fillStyle = "black";
    }
    protected drawLine(x1: number, y1: number, x2: number, y2: number)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y2);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    protected text(text: string, x:number = this.canvas.width/2, y: number = this.canvas.height/2, align: CanvasTextAlign = "center", font:string = "40px serif")
    {
        this.ctx.textAlign = align;
        this.ctx.font = font;
        this.ctx.strokeStyle = "black"
        this.ctx.fillStyle = "red"
        this.ctx.fillText(text,x,y);
        this.ctx.strokeText(text,x,y);
    }
}