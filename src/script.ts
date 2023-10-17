import { Canvas } from "./Canvas.js";
import { Circle } from "./Circle.js";

class pasteque extends Canvas
{
    private circleSizes: number[] = [5,10,20,40,60,80];
    private current: Circle = new Circle(this.circleSizes[0]);
    private circleList: Circle[] = [];
    private cursorPos: {x:number, y:number} = {x:0, y:40};
    private maxSize: number = 3;
    private lastLaunch: number = Date.now();
    private timeBetweenLaunch: number = 500;

    constructor()
    {
        super()
        this.gameSettings();
        this.updateDraw();
        this.updateGame();
    }
    private gameSettings()
    {
        this.cursorPos.x = this.canvas.width/2;
        this.setStartPosition();
        window.addEventListener("keydown", this.moveCursor.bind(this));
        this.updateDraw = this.updateDraw.bind(this);
        this.updateGame = this.updateGame.bind(this);
    }
    private setStartPosition()
    {
        this.current.x = this.cursorPos.x;
        this.current.y = this.cursorPos.y;
    }
    private selectCircle()
    {
        if(this.current) 
        {
            this.circleList.push(this.current);
            this.cursorPos.x = this.current.x;
        }
        const size = Math.floor(Math.random()*this.maxSize);
        this.current = new Circle(this.circleSizes[size]);
        this.setStartPosition();
    }
    private moveCursor(e:KeyboardEvent)
    {
        // console.log(e.key);
        
        switch(e.key)
        {
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
    private nextCircle()
    {
        const now = Date.now();
        console.log(now-this.lastLaunch <= this.timeBetweenLaunch);
        
        if(now-this.lastLaunch <= this.timeBetweenLaunch)return;
        this.lastLaunch = now;
        this.current.launch();
        this.selectCircle();
    }
    private updateGame()
    {
        this.circleList.forEach(c=>c.updatePos());
        setTimeout(this.updateGame, 1000/60);
    }
    private updateDraw()
    {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.current.drawCircle(this.ctx);
        this.circleList.forEach(c=>c.drawCircle(this.ctx));        
        requestAnimationFrame(this.updateDraw);
    }
}
new pasteque();