class Grid {

  constructor(width1, height1, pw) {
    this.pw = pw;
    this.cols = width1 / pw;
    this.rows = height1 / pw;
    this.grid = new Array(this.cols * this.rows);
  }

  // sets entire grid to empty particles
  clearGrid() {
    for (let i = 0; i < this.cols * this.rows; i++) {
      const empty_particle = new empty();
      this.grid[i] = empty_particle;
    }
  }

  // get i, j indices in 2D array format from the 1D array
  getIndices(i) {
    let x = i % this.cols;
    let y = floor(i / this.cols);
    return [x, y];
  }

  // set the particle value in the grid
  set(x, y, value) {
    let i = x + this.cols * y;
    this.grid[i] = value;
  }

  // adds a square of particles on mouse cursor when clicked
  setCircle(Mx, My) {
    // brush radius color
    let radius = 1;
    for (let x = Mx - radius; x <= Mx + radius; x++) {
      for (let y = My - radius; y <= My + radius; y++) {
        if (Math.random() > 0.75) {
          // calculates where to add new sand particle
          let i = x + this.cols * y;
          let particle = new sand();
          this.grid[i] = particle;
        }
      }
    }
  }

  // swaps two grid particle objects: (a, b) -> (b, a) via seperate indices
  swap(a, b) {
    const temp = this.grid[a];
    this.grid[a] = this.grid[b];
    this.grid[b] = temp; 
  }

  // calculates coursor position and adds particles when clicked
  mouseClick() {
    let Mx = floor(mouseX / this.pw);
    let My = floor(mouseY / this.pw);
    let i = Mx + this.cols * My;
    let particle = this.grid[i];

    // edge conditions for drawing at width edges (Mx) and height edges (My)
    let edgeCondition = false;
    if (Mx >= 1 && Mx < grid.rows-1 && My >= 1 && My < grid.cols-1) {
      edgeCondition = true;
    }

    // condition to prevent overwriting existing pixels drawn
    if (edgeCondition && particle.empty) {
      this.setCircle(Mx, My);
    }
  }

  // updates particles positions
  updatePixel(i) {
    let below_i = i + this.rows;

    let dir = random([-1, 1]);
    let below_sideA = below_i + dir;
    let below_sideB = below_i - dir;

    // checks edge conditions to prevent screen overflow
    let edgeCondition = false;
    if (i % this.cols != 0 && i % this.cols != this.cols-1) {
      edgeCondition = true;
    }

    let p_below = this.grid[below_i];
    let p_belowA = this.grid[below_sideA];
    let p_belowB = this.grid[below_sideB];

    // swaps particles below and to the sides below
    if (below_i + 1 < this.rows * this.cols) {
      if (p_below.empty) {
        this.swap(i, below_i);    
      }
      else if (edgeCondition && p_belowA.empty) {
        this.swap(i, below_sideA);
      }
      else if (edgeCondition && p_belowB.empty) {
        this.swap(i, below_sideB);
      }
    }
    
  }

  // plots squares to screen based on 1D array index
  plotSquare(idx) {
    let particle = this.grid[idx];
    let [R, G, B] = particle.color;
    fill(R, G, B);

    let [i, j] = this.getIndices(idx);
    let x = i * this.pw;
    let y = j * this.pw;
    square(x , y, this.pw);
  }
}