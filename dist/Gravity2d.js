export class Gravity {
    x = 0;
    y = 0;
    g = 0.05;
    gSpeed = 0;
    ground = 0;
    constructor(gravity = undefined) {
        this.g = gravity ?? this.g;
    }
    set setGround(bottom) {
        this.ground = bottom;
    }
    fall() {
        this.gSpeed += this.g;
        this.y += this.gSpeed;
    }
}
