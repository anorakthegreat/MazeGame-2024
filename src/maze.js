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
        //entry and exit of maze 
        this.entry = this.grid[0][0];
        this.exit;
        //keep track of cells visited 
        this.path = [];
        //begin mazeGen before rendering 
        this.explore(0, 0);
        //make entry and exit 
        this.entryExit();
        //array to hold tiles that have oxygen bubbles 
        this.oxygen = [];
    }

    entryExit(){
        //always start at top left, remove left and top wall to signify entrance 
        this.entry.walls[0] = false; 
        this.entry.walls[3] = false;
        //make a random exit on the right or bottom of the maze 
        if(Math.random()*2 > 1){//right wall exit 
            let r = Math.floor(Math.random()*this.grid.length);
            this.exit = this.grid[r][this.grid[0].length-1];
            //remove right wall 
            this.exit.walls[1] = false;
            // if(r === 0){//if at the top, remove top wall 
            //     exit.walls[0] = false;
            // }
            // else if(r === this.grid.length-1){//if at bottom, remove bottom wall 
            //     exit.walls[2] = false;
            // }
        }
        else{
            let c = Math.floor(Math.random()*this.grid[0].length-1);
            this.exit = this.grid[this.grid.length-1][c];
            //remove bottom wall 
            this.exit.walls[2] = false; 
            // if(c === 0){//if at the left, remove left wall 
            //     exit.walls[3] = false;
            // }
            // else if(c === this.grid[0].length){//if at the right, remove right wall 
            //     exit.walls[1] = false;
            // }
        }
        
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
        //color entry 
        let EntrytopLx = this.entry.col * this.cellWidth;
        let EntrytopLy = this.entry.row * this.cellWidth;
        this.context.rect(EntrytopLx, EntrytopLy, this.cellWidth, this.cellWidth);
        this.context.fillStyle = "rgba(255, 0, 0, 0.2)";
        this.context.fill();
        //color exit 
        let ExittopLx = this.exit.col * this.cellWidth;
        let ExittopLy = this.exit.row * this.cellWidth;
        this.context.rect(ExittopLx, ExittopLy, this.cellWidth, this.cellWidth);
        this.context.fillStyle = "rgba(255, 0, 255, 0.2)";
        this.context.fill();

        //oxygen bubbles on random tiles 
        if(this.oxygen.length < 10){
            let ranR = Math.floor(Math.random()*this.grid.length);
            let ranC = Math.floor(Math.random()*this.grid[0].length);
            this.oxygen.push(this.grid[ranR][ranC]);
        }
        if(this.oxygen.length > 0){
            for(let i = 0; i<this.oxygen.length; i++){
                this.context.save();
                this.context.beginPath();
                this.context.arc(this.oxygen[i].col*this.cellWidth+25, this.oxygen[i].row*this.cellWidth+25, 20, 0, 2*Math.PI);
                this.context.strokeStyle = "rgba(65, 140, 173, 1)";
                this.context.stroke();
                this.context.fillStyle = "rgba(117, 179, 206, 0.5)";
                this.context.fill();
                this.context.closePath();
                this.context.restore();
            }
        }
    }

}
