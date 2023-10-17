export abstract class Canvas
{
    protected canvas = document.createElement("canvas");
    protected ctx = this.canvas.getContext("2d")!;

    constructor(protected parent = document.body)
    {
        parent.append(this.canvas);
        this.resize();
        this.settings();
    }
    private resize()
    {
        const size = this.canvas.parentElement?.getBoundingClientRect();
        if(!size) return;
        this.canvas.width = Math.floor(size.width * window.devicePixelRatio);
        this.canvas.height = Math.floor(size.height * window.devicePixelRatio);
    }
    private settings()
    {
        this.ctx.fillStyle = "black";
    }
}