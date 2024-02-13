// makes 2D array full of zeros
function make2DArray(cols, rows) {
  let my2DArray = new Array(cols)
  for (let i = 0; i < my2DArray.length; i++) {
      my2DArray[i] = new Array(rows)
      for (let j = 0; j <  my2DArray.length; j++) {
        my2DArray[i][j] = 0
      }
  }
  return my2DArray
}

// global variables for number of rows/cols
let grid;
let cols, rows;

// change visual properties including, pixel width (pw), sand inital color, brush size
let pw = 5;
let hueValue = 200;
let brushDim = 2;

// setting up canvas, grid to visualise and calculating number of cols/rows
function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 255, 255)
  cols = width / pw;
  rows = height / pw;
  grid = make2DArray(cols, rows);
}

// adds sand when mouse is pressed
function addSand() {
  // grid position of mouse when pressed
  let Mcols = floor(mouseX / pw);
  let Mrows = floor(mouseY / pw);
  // places sand in a brushDim x brushDim square
  // if statement corrects for canvas edge cases
  if (Mcols - brushDim >= 0 && Mcols + brushDim < cols) {
    for (i = Mcols - brushDim; i < Mcols + brushDim; i++) {
      for (j = Mrows - brushDim; j < Mrows + brushDim; j++) {
        grid[i][j] = hueValue;
      }
    }
  }
}

// basic idea:
// pressed mouse adds point which falls as long as theres space below
// added points in the grid are numbers which change over time
// use the value of the points for the color values for changing colors
function draw() {
  background(0)

  // adds sand from mouse press
  if (mouseIsPressed == true) {
    addSand();
  }

  let nextGrid = make2DArray(rows, cols);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      // adds colored sand to screen
      // only adds sand points
      noStroke();
      if (grid[i][j] > 0) {
        // stroke(155);
        let x = i * pw;
        let y = j * pw;
        fill(grid[i][j], 255, 255);
        square(x, y, pw);
      }

      let cell = grid[i][j];
      let dir = random([-1, 1]);

      // conditions for sand in cell to fall
      if (cell > 0) {
        let cell_below = grid[i][j+1];
        let cell_belowA, cell_belowB;
        
        // edge conditions for falling sand
        // randomly selects left or right direction for the sand to fall
        if (i-1 >= 0 && i+1 < cols) {
          cell_belowA = grid[i + dir][j + 1];
          cell_belowB = grid[i - dir][j + 1];
        }

        // conditions for moving sand down, left and right
        if (cell_below === 0) {
          nextGrid[i][j] = 0;
          nextGrid[i][j + 1] = cell;
        } else if (cell_belowA === 0) {
          nextGrid[i][j] = 0;
          nextGrid[i + dir][j + 1] = cell;
        } else if (cell_belowB === 0) {
          nextGrid[i][j] = 0;
          nextGrid[i - dir][j + 1] = cell;
        } else {
          nextGrid[i][j] = cell;
        }
      }
    }
  }
// reset hue value when limit reached
  hueValue += 0.75;
  if (hueValue > 360) {
    hueValue = 0;
  }
  arrayCopy(nextGrid, grid);


}
