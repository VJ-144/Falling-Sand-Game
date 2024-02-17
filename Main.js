// sets up canvas and color settings
function setup() {
  createCanvas(400, 400)
  noStroke();
  colorMode(RGB, 255);
}

// creates particle grid and adds empty particles
let grid = new Grid(400, 400, 10);
grid.clearGrid();

// let p = grid.grid[0];
// console.log(p.isParticleEmpty());
// grid.grid[250] = new sand();

// draw function runs on loop
function draw() {
  background(0);

  // adds particles when mouse is clicked
  if (mouseIsPressed === true) {  
    grid.mouseClick();
  }
  
  // updates each particle
  for (let i = (grid.cols * grid.rows) - 1; i >= 0; i--) {
    // skips over empty particles
    let particle = grid.grid[i];
    if (particle.value > 0) {
      grid.plotSquare(i);

      // updates particle positions
      grid.updatePixel(i);
    }

  }

  let fps = frameRate()
  text(fps.toPrecision(2), 10, 20);
}
