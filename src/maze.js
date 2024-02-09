/* A maze */
class Maze {
    constructor(context, row, col) {
        this.row = row;//num of rows in the maze 
        this.col = col;//num of cols in the maze 
        this.context = context;
        //width of the square cells 
        this.cellWidth = 50;
        //width of the walls
        this.wallWidth = 5;
        //array for all the cells 
        this.grid = [];
        for (let r = 0; r < this.row; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.col; c++) {
                this.grid[r][c] = new Cell(this.context, r, c, this.cellWidth, this.wallWidth);
            }
        }
        //keep track of cells visited 
        this.path = [];
        //begin mazeGen before rendering 
        this.explore(0, 0);
    }

    explore(r, c) {
        this.grid[r][c].visited = true;
        //make array of available places to move to next 
        let goTo = this.checkNeighbors(r, c);
        //if there are cells to continue exploring 
        if (goTo.length > 0) {
            //add current cell to the path
            this.path.push(this.grid[r][c]);
            //choose one to go to 
            let go = Math.floor(Math.random() * goTo.length);
            let newCell = goTo[go];
            //remove walls between the cells 
            this.removeWalls(r, c, newCell.row, newCell.col);
            //explore to new cell 
            this.explore(newCell.row, newCell.col);
        }
        else if (this.path.length > 0) {
            //remove last cell visited from path because you're starting backtracking 
            let nextCell = this.path.pop();
            this.explore(nextCell.row, nextCell.col);
        }
        else {
            return;
        }
    }

    removeWalls(currentRow, currentCol, newRow, newCol) {
        //if top neighbor, remove top wall of current and bottom wall of new 
        if (currentRow > newRow && currentCol === newCol){
            this.grid[currentRow][currentCol].walls[0] = false;
            this.grid[newRow][newCol].walls[2] = false;
        }
        //if right neighbor, remove right wall of current and left wall of new 
        if (currentRow === newRow && currentCol < newCol){
            this.grid[currentRow][currentCol].walls[1] = false;
            this.grid[newRow][newCol].walls[3] = false;
        }
        //if bottom neighbor, remove bottom wall of current and top wall of new 
        if (currentRow < newRow && currentCol === newCol){
            this.grid[currentRow][currentCol].walls[2] = false;
            this.grid[newRow][newCol].walls[0] = false;
        }
        //if left neighbor, remove left wall of current and right wall of new 
        if (currentRow === newRow && currentCol > newCol){
            this.grid[currentRow][currentCol].walls[3] = false;
            this.grid[newRow][newCol].walls[1] = false;
        }
    }

    checkNeighbors(r, c) {
        let goTo = [];
        //if the cell is a wall, don't add those neighbors to the next place to go 
        if (r !== 0) {//if cell is at the top row 
            let topNeighbor = this.grid[r - 1][c];
            if (!topNeighbor.visited && topNeighbor.walls[0]) {
                goTo.push(topNeighbor);
            }
        }//if cell is on the right-most column 
        if (c !== this.grid[0].length - 1) {
            let rightNeighbor = this.grid[r][c + 1];
            if (!rightNeighbor.visited && rightNeighbor.walls[1]) {
                goTo.push(rightNeighbor);
            }
        }//if cell is at the bottom row 
        if (r !== this.grid.length - 1) {
            let bottomNeighbor = this.grid[r + 1][c];
            if (!bottomNeighbor.visited && bottomNeighbor.walls[2]) {
                goTo.push(bottomNeighbor);
            }
        }//if cell is on the left-most column 
        if (c !== 0) {
            let leftNeighbor = this.grid[r][c - 1];
            if (!leftNeighbor.visited && leftNeighbor.walls[3]) {
                goTo.push(leftNeighbor);
            }
        }
        return goTo;
    }
    render() {
        //clear canvas 
        this.context.clearRect(0, 0, world.canvas.width, world.canvas.height);
        //render cells 
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                this.grid[r][c].render();
            }
        }
    }

}
