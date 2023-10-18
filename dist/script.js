import { Canvas } from "./Canvas.js";
import { Circle } from "./Circle.js";
class pasteque extends Canvas {
    current = new Circle(0);
    circleList = [];
    lastLaunch = Date.now();
    start = false;
    constructor() {
        super();
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
        this.setStartPosition();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        this.updateDraw = this.updateDraw.bind(this);
        this.updateGame = this.updateGame.bind(this);
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
        this.current = this.createCircle(this.circleSizes[size]);
        this.setStartPosition();
    }
    /**
     * Créer un nouveau cercle et l'initialise.
     * @param size taille du cercle
     * @returns le nouveau cercle
     */
    createCircle(size) {
        const circle = new Circle(size);
        circle.setFallLimit = this.canvas.height - this.current.size;
        return circle;
    }
    /**
     * Gère les évènement quand la touche reste enfoncé.
     * @param e évènement au clavier
     */
    onKeyDown(e) {
        switch (e.key) {
            case "ArrowLeft":
                this.current.moveLeft();
                break;
            case "ArrowRight":
                this.current.moveRight();
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
            case "Enter":
                this.nextCircle();
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
        if (now - this.lastLaunch <= this.timeBetweenLaunch)
            return;
        this.lastLaunch = now;
        this.current.launch();
        this.selectCircle();
    }
    /**
     * Met à jour les données du jeu 60 fois par seconde.
     */
    updateGame() {
        this.circleList.forEach((c1, i1) => {
            this.circleList.forEach((c2, i2) => {
                if (c1 === c2)
                    return;
                const col = c1.collision(c2);
                if (!col || c1.size !== c2.size)
                    return;
                this.fusion(c1, c2);
            });
            c1.updatePos();
        });
        setTimeout(this.updateGame, 1000 / 60);
    }
    /**
     * Dessine et anime le jeu.
     */
    updateDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.current.drawCircle(this.ctx);
        this.circleList.forEach(c => c.drawCircle(this.ctx));
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
        const ns = this.circleSizes.indexOf(c1.size) + 1;
        if (ns === this.circleSizes.length)
            return;
        const nc = this.createCircle(this.circleSizes[ns]);
        nc.x = (c1.x + c2.x) / 2;
        nc.y = (c1.y + c2.y) / 2;
        this.circleList.push(nc);
    }
}
new pasteque();
