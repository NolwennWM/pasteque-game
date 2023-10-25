import { Settings } from "./Settings.js";
export class Canvas extends Settings {
    parent;
    canvas = document.createElement("canvas");
    ctx = this.canvas.getContext("2d");
    constructor(parent = document.body) {
        super();
        this.parent = parent;
        parent.append(this.canvas);
        this.resize();
        this.settings();
    }
    /**
     * Paramètre la taille du canvas selon celle de son parent.
     * @returns undefined
     */
    resize() {
        const size = this.canvas.parentElement?.getBoundingClientRect();
        if (!size)
            return;
        this.canvas.width = Math.floor(size.width * window.devicePixelRatio);
        this.canvas.height = Math.floor(size.height * window.devicePixelRatio);
        console.log(size.height, this.canvas.height);
    }
    /**
     * paramètre le canvas.
     */
    settings() {
        this.ctx.fillStyle = "black";
    }
    drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y2);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    text(text, x = this.canvas.width / 2, y = this.canvas.height / 2, align = "center", font = "40px serif") {
        this.ctx.textAlign = align;
        this.ctx.font = font;
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "red";
        this.ctx.fillText(text, x, y);
        this.ctx.strokeText(text, x, y);
    }
}
