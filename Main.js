function setup() {
  createCanvas(400, 400)
  
}


const grid = new Grid(400, 400, 10);

function draw() {
  background(0);
  noStroke();
  // stroke(155); 
  colorMode(RGB, 255);

  // updates grid at point mouse is pressed
  if (mouseIsPressed === true) {  
    grid.mouseClick();
  }
  
  for (let i = (grid.cols * grid.rows) - 1; i >= 0; i--) {

    // plots squares to screen
    if (grid.grid[i] > 0) {
      grid.plotSquare(i);
    }

    // update rules
    grid.updatePixel(i);

  }
}
