import { Circle } from "./Circle.js";
import { Element } from "./Element.js";
export class Collision extends Element {
    colliding = false;
    constructor() {
        super();
    }
    /**
     * Vérifie si l'élément en paramètre touche cet élément.
     * @param obstacle élément avec lequel vérifier si il y a collision
     * @returns boolean indiquant si les deux éléments se touchent
     */
    collision(obstacle) {
        // console.log(this.colliding); 
        if (this.colliding)
            return;
        if (obstacle instanceof Circle && this instanceof Circle) {
            this.colliding = this.collisionCircle(this, obstacle);
        }
        return this.colliding;
    }
    /**
     * Vérifie si deux éléments de classe Circle sont en collision.
     * @param obj1 un élément de classe Circle
     * @param obj2 un élément de classe Circle
     * @returns boolean indiquant si les deux éléments sont en collision
     */
    collisionCircle(obj1, obj2) {
        const distance = Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
        // console.log(distance, obj1.size + obj2.size, distance < obj1.size + obj2.size);
        return distance < obj1.size + obj2.size;
    }
}
