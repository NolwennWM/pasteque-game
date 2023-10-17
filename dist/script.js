import { Canvas } from "./Canvas.js";
import { Circle } from "./Circle.js";
class pasteque extends Canvas {
    circleSizes = [5, 10, 20, 40, 60, 80];
    current = new Circle(this.circleSizes[0]);
    circleList = [];
    cursorPos = { x: 0, y: 40 };
    maxSize = 3;
    lastLaunch = Date.now();
    timeBetweenLaunch = 500;
    constructor() {
        super();
        this.gameSettings();
        this.updateDraw();
        this.updateGame();
    }
    gameSettings() {
        this.cursorPos.x = this.canvas.width / 2;
        this.setStartPosition();
        window.addEventListener("keydown", this.moveCursor.bind(this));
        this.updateDraw = this.updateDraw.bind(this);
        this.updateGame = this.updateGame.bind(this);
    }
    setStartPosition() {
        this.current.x = this.cursorPos.x;
        this.current.y = this.cursorPos.y;
    }
    selectCircle() {
        if (this.current) {
            this.circleList.push(this.current);
            this.cursorPos.x = this.current.x;
        }
        const size = Math.floor(Math.random() * this.maxSize);
        this.current = new Circle(this.circleSizes[size]);
        this.setStartPosition();
    }
    moveCursor(e) {
        // console.log(e.key);
        switch (e.key) {
            case "ArrowLeft":
                this.current.moveLeft();
                break;
            case "ArrowRight":
                this.current.moveRight();
                break;
            case "Enter":
                this.nextCircle();
                break;
        }
        this.updateDraw();
    }
    nextCircle() {
        const now = Date.now();
        console.log(now - this.lastLaunch <= this.timeBetweenLaunch);
        if (now - this.lastLaunch <= this.timeBetweenLaunch)
            return;
        this.lastLaunch = now;
        this.current.launch();
        this.selectCircle();
    }
    updateGame() {
        this.circleList.forEach(c => c.updatePos());
        setTimeout(this.updateGame, 1000 / 60);
    }
    updateDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.current.drawCircle(this.ctx);
        this.circleList.forEach(c => c.drawCircle(this.ctx));
        requestAnimationFrame(this.updateDraw);
    }
}
new pasteque();
