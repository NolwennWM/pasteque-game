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
}