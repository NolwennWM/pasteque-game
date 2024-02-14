import { Canvas } from "./Canvas.js";
import { Circle } from "./Circle.js";
class pasteque extends Canvas {
    current;
    circleList = [];
    lastLaunch = Date.now();
    start = false;
    constructor() {
        super(document.querySelector(".gameZone"));
        this.current = this.createCircle(0);
        this.gameSettings();
        this.selectCircle();
        this.updateDraw();
        this.updateGame();
        this.start = true;
    }
    /**
     * Paramètre le jeu et les évènements
     */
    gameSettings() {
        this.cursorPos.x = this.canvas.width / 2;
        this.cursorPos.y = this.circleSizes[this.maxSize].size;
        this.setStartPosition();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        this.updateDraw = this.updateDraw.bind(this);
        this.updateGame = this.updateGame.bind(this);
    }
    restart() {
        this.circleList = [];
        this.lastLaunch = Date.now();
        this.selectCircle();
        this.start = true;
    }
    /**
     * Positionne les nouveaux cercles au niveau du curseur
     */
    setStartPosition() {
        this.current.x = this.cursorPos.x;
        this.current.y = this.cursorPos.y;
    }
    /**
     * Selectionne un nouveau cercle pour le curseur
     */
    selectCircle() {
        if (this.start && this.current) {
            this.circleList.push(this.current);
            this.cursorPos.x = this.current.x;
        }
        const size = Math.floor(Math.random() * this.maxSize);
        this.current = this.createCircle(size);
        this.setStartPosition();
    }
    /**
     * Créer un nouveau cercle et l'initialise.
     * @param size taille du cercle
     * @returns le nouveau cercle
     */
    createCircle(size) {
        const type = this.circleSizes[size];
        const circle = new Circle(type.size, type.color);
        circle.setFallLimit = this.canvas.height - type.size;
        this.maxLeftPos = type.size;
        this.maxRightPos = this.canvas.width - type.size;
        return circle;
    }
    /**
     * Gère les évènement quand la touche reste enfoncé.
     * @param e évènement au clavier
     */
    onKeyDown(e) {
        switch (e.key) {
            case "ArrowLeft":
                this.current.moveX(-this.cursorSpeed, this.maxLeftPos);
                break;
            case "ArrowRight":
                this.current.moveX(this.cursorSpeed, this.maxRightPos);
                break;
        }
        this.updateDraw();
    }
    /**
     * Gère les évènements quand la touche est relâché
     * @param e évènement au clavier
     */
    onKeyUp(e) {
        switch (e.key) {
            case "ArrowDown":
                if (this.start)
                    this.nextCircle();
                else
                    this.restart();
                break;
        }
        this.updateDraw();
    }
    /**
     * Lance le cercle si assez de temps est écoulé
     * @returns undefined
     */
    nextCircle() {
        const now = Date.now();
        if (!this.current.colliding && now - this.lastLaunch <= this.timeBetweenLaunch)
            return;
        this.lastLaunch = now;
        this.current.launch();
        this.selectCircle();
    }
    /**
     * Met à jour les données du jeu 60 fois par seconde.
     */
    updateGame() {
        if (this.start) {
            this.checkCollision();
        }
        setTimeout(this.updateGame, 1000 / 60);
    }
    checkCollision() {
        this.circleList.forEach((c1) => {
            this.circleList.forEach((c2) => {
                if (c1 === c2)
                    return;
                const col = c1.collision(c2);
                if (!col || c1.size !== c2.size)
                    return;
                this.fusion(c1, c2);
            });
            c1.updatePos();
            if (c1.colliding && c1.y < this.cursorPos.y * 2)
                this.start = false;
        });
    }
    /**
     * Dessine et anime le jeu.
     */
    updateDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.current.drawCircle(this.ctx);
        this.circleList.forEach(c => c.drawCircle(this.ctx));
        this.drawLine(0, this.cursorPos.y * 2, this.canvas.width, this.cursorPos.y * 2);
        if (!this.start) {
            this.text("Vous avez perdu");
        }
        requestAnimationFrame(this.updateDraw);
    }
    /**
     * fusionne les deux cercles donnés en paramètre.
     * @param c1 Premier cercle à fusionner
     * @param c2 Second cercle à fusionner
     * @returns undefined
     */
    fusion(c1, c2) {
        const i1 = this.circleList.indexOf(c1);
        this.circleList.splice(i1, 1)[0];
        const i2 = this.circleList.indexOf(c2);
        this.circleList.splice(i2, 1)[0];
        const ns = this.circleSizes.findIndex(c => c.size === c1.size) + 1;
        console.log(ns);
        if (ns === this.circleSizes.length)
            return;
        const nc = this.createCircle(ns);
        nc.x = (c1.x + c2.x) / 2;
        nc.y = (c1.y + c2.y) / 2;
        this.circleList.push(nc);
    }
}
new pasteque();
