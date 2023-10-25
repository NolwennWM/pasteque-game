import { Circle } from "./Circle.js";
import { Element } from "./Element.js";

export abstract class Collision extends Element
{
    public colliding: boolean = false;
    constructor()
    {
        super();
    }
    /**
     * Vérifie si l'élément en paramètre touche cet élément.
     * @param obstacle élément avec lequel vérifier si il y a collision
     * @returns boolean indiquant si les deux éléments se touchent
     */
    public collision(obstacle: Element): boolean|undefined
    {
        // console.log(this.colliding); 
        if(this.colliding)return;
        if(obstacle instanceof Circle && this instanceof Circle)
        {
            this.colliding = this.collisionCircle(this,obstacle);     
        }
        return this.colliding;
    }
    /**
     * Vérifie si deux éléments de classe Circle sont en collision.
     * @param obj1 un élément de classe Circle
     * @param obj2 un élément de classe Circle
     * @returns boolean indiquant si les deux éléments sont en collision
     */
    private collisionCircle(obj1: Circle, obj2: Circle): boolean
    {
        // const distance = Math.sqrt((obj1.x-obj2.x)**2+(obj1.y-obj2.y)**2);
        // return distance < obj1.size + obj2.size;
        // This one seems faster :
        const distance = (obj1.x-obj2.x)*(obj1.x-obj2.x)+(obj1.y-obj2.y)*(obj1.y-obj2.y);
        return distance < (obj1.size + obj2.size)*(obj1.size + obj2.size)
    }
}