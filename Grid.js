class Grid {

  constructor(width, height, pw) {
    this.pw = pw;
    this.cols = width / pw;
    this.rows = height / pw;
    this.grid = new Array(this.cols * this.rows).fill(0);
    this.grid_color = new Array(3 * this.cols * this.rows).fill(0);
  }

  // clears grid
  clear() {
    this.grid = new Array(this.cols * this.rows).fill(0);
  }

  getIndices(i) {
    let x = i % this.cols;
    let y = floor(i / this.cols);
    return [x, y];
  }
 
  getValue(i) {
    return this.grid[i];
  }

  getColor(x, y) {
    let i = 3 * (x + this.cols * y);
    let red = this.grid_color[i];
    let green = this.grid_color[i+1];
    let blue = this.grid_color[i+2];
    return [red, green, blue];
  }

  // set the value in the grid
  set(x, y, value) {
    let i = x + this.cols * y;
    this.grid[i] = value;
  }

  // plots a square on mouse cursor
  setCircle(Mx, My, radius, value) {
    for (let x = Mx - radius; x <= Mx + radius; x++) {
      for (let y = My - radius; y <= My + radius; y++) {
        if (Math.random() > 0.75) {
          let i = x + this.cols * y;
          this.grid[i] = value;
  
          // setting pixel color
          let [red, green, blue] = grid.varyColor(255, 165, 0);
          i *= 3;
          this.grid_color[i] = red;
          this.grid_color[i+1] = green;
          this.grid_color[i+2] = blue;
        }
      }
    }
  }

  // varies the color of input RGB value
  varyColor(R,G,B) {

    let dir = random([-1, 1]);
    let red = R - dir * Math.floor(Math.random() * 21);
    let green = G - dir * Math.floor(Math.random() * 51);
    let blue = B - dir * Math.floor(Math.random() * 51);
    
    red = constrain(red, 0, 255);
    green = constrain(green, 0, 255);
    blue = constrain(blue, 0, 255);
    return [red, green, blue];
  }

  // checks point on grid is empty
  isEmpty(a) {
    if (this.grid[a] === 0) {
      return true;
    } else {
      return false;
    }
  }

  // swaps two grid points and colors -> 2 seperate indices
  swap(a, b) {

    // swapping pixel value
    const temp1 = this.grid[a];
    this.grid[a] = this.grid[b];
    this.grid[b] = temp1; 

    a *= 3;
    b *= 3;

    // swapping pixel colors
    const temp2 = this.grid_color[a];
    this.grid_color[a] = this.grid_color[b];
    this.grid_color[b] = temp2; 

    const temp3 = this.grid_color[a+1];
    this.grid_color[a+1] = this.grid_color[b+1];
    this.grid_color[b+1] = temp3; 

    const temp4 = this.grid_color[a+2];
    this.grid_color[a+2] = this.grid_color[b+2];
    this.grid_color[b+2] = temp4; 
  }

  mouseClick() {
    let Mx = floor(mouseX / this.pw);
    let My = floor(mouseY / this.pw);
    let i = Mx + this.cols * My;

    // edge boundry conditions to stop sanding falling out sides
    // condition to prevent overwriting existing values
    if (grid.isEmpty(i)) {
      if (Mx >= 1 && Mx < grid.rows) {
        if (My >= 1 && My < grid.cols) {    // change conditions for drawing at edge
          grid.setCircle(Mx, My, 1, 1)
        }
      }
    }
  }

  updatePixel(i) {
    let below_i = i + this.rows;

    let dir = random([-1, 1]);
    let below_sideA = dir + below_i;
    let below_sideB = dir - below_i;

    // add parameter which checks for edge cases and rejects
    // by putting it first in the if statment for falling

    // let lower_bd = i
      if (grid.isEmpty(below_i)) {
        grid.swap(i, below_i);
      } else if (grid.isEmpty(below_sideA)) {
        if (i % this.cols != 0 && i % this.cols != this.cols-1) {
          grid.swap(i, below_sideA);
        }
      } else if (grid.isEmpty(below_sideB)) {
        if (i % this.cols != 0 && i % this.cols != this.cols-1) {
          grid.swap(i, below_sideB);
        }
      }
    
  }

  plotSquare(a) {
    let [i, j] = grid.getIndices(a);
    let x = i * this.pw;
    let y = j * this.pw;
    let RGB_value = grid.getColor(i, j);
    fill(RGB_value);
    square(x , y, this.pw);
  }
}