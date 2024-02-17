// sand particle class
class sand extends Particle {
  // orange particle color
  static baseColor = [228, 155, 15];
  constructor() {
    super(sand.baseColor, false, 1);
    super.varyColor();

  }
  
}

// empty particle class
class empty extends Particle {
  // black particle color for blank particle
  static baseColor = '#000000';
  constructor() {
    super(sand.baseColor, true, 0);
  }
}
