function make2dArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
    createCanvas(windowWidth - 100, windowHeight - 200);
    frameRate(24);
    cols = floor(width / resolution);
    rows = floor(height / resolution);
    grid = make2dArray(cols,rows);
    for (let i = 0; i < cols; i++) {
        for( let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function windowResized() {
    setup();
}

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for( let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution, resolution);
            }
        }
    }
    let next = make2dArray(cols,rows);
    for (let i = 0; i < cols; i++) {
        for( let j = 0; j < rows; j++) {
            if (i == 0 || j == 0 || i == cols - 1 || j == rows - 1){
                next[i][j] = grid[i][j];
                continue;
            }
            let neighbors = countNeighbors(grid,i,j);

            let cellState = grid[i][j]
            //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            if(cellState == 0 && neighbors == 3){
                next[i][j] = 1;
            }
            //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            //Any live cell with more than three live neighbours dies, as if by overpopulation. 
            else if (cellState == 1 && neighbors < 2 || neighbors >3 ){
                next[i][j] = 0;
            }
            //Any live cell with two or three live neighbours lives on to the next generation. 
            else {
                next[i][j] = cellState;
            }
        }
    }
    grid = next;
}

function countNeighbors(grid,x,y){
    let sum = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            sum += grid[x+i][y+j];
        }
    }
    sum -= grid[x][y];

    return sum;
}