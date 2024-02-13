class sand extends Particle {

  // orange sand in RGB
  static baseColor = [255, 165, 0];
  constructor() {
    super({color : baseColor}, {empty : false}, {value : 1})
  }
}


class empty extends Particle {
  // black background in RGB
  static baseColor = [0, 0, 0];
  constructor() {
    super({color : baseColor}, {empty : true}, {value : 0})
  }
}
