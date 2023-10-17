export class Canvas {
    parent;
    canvas = document.createElement("canvas");
    ctx = this.canvas.getContext("2d");
    constructor(parent = document.body) {
        this.parent = parent;
        parent.append(this.canvas);
        this.resize();
        this.settings();
    }
    resize() {
        const size = this.canvas.parentElement?.getBoundingClientRect();
        if (!size)
            return;
        this.canvas.width = Math.floor(size.width * window.devicePixelRatio);
        this.canvas.height = Math.floor(size.height * window.devicePixelRatio);
    }
    settings() {
        this.ctx.fillStyle = "black";
    }
}
