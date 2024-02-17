// particle super class
class Particle {
    constructor(color, empty, value) {
        this.color = color;
        this.empty = empty;
        this.value = value;
    }

    // update() {

    // }

    // varies the color of the particle
    varyColor() {
        let [R, G, B] = this.color;

        let dir = random([-1, 1]);
        let red = R - dir * Math.floor(Math.random() * 21);
        let green = G - dir * Math.floor(Math.random() * 51);
        let blue = B - dir * Math.floor(Math.random() * 51);
        
        red = constrain(red, 0, 255);
        green = constrain(green, 0, 255);
        blue = constrain(blue, 0, 255);
        
        this.color = [red, green, blue];
    }
}