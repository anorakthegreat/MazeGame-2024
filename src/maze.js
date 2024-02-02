/* A maze */
class Maze {
    constructor(context, row, col){
        this.row = row;//num of rows in the maze 
        this.col = col;//num of cols in the maze 
        this.context = context;
        //width of the square cells 
        this.cellWidth = 100;
        //width of the walls
        this.wallWidth = 10;
        //array for all the cells 
        this.grid = [];
        for(let r = 0; r<this.row; r++){
            this.grid[r] = [];
            for(let c = 0; c<this.col; c++){
                this.grid[r][c] = new Cell(this.context, r, c, this.cellWidth);
            }
        }
        //keep track of last cell visited 
        this.lastCell;
        //begin mazeGen before rendering 
        this.explore(0, 0);
    }

    explore(r, c){
        this.grid[r][c].visited = true;
        //make array of available places to move to next 
        let goTo = [];
        //if the cell is a wall, don't add those neighbors to the next place to go 
            if(r !== 0){//if cell is at the top row 
                let topNeighbor = this.grid[r-1][c];
                if(!topNeighbor.visited && topNeighbor.walls[0]){
                    goTo.push(topNeighbor);
                }
              
            }//if cell is on the right-most column 
            if(c !== this.grid[0].length-1){
                let rightNeighbor = this.grid[r][c+1];
                if(!rightNeighbor.visited && rightNeighbor.walls[1]){
                    goTo.push(rightNeighbor);
                }
              
            }//if cell is at the bottom row 
            if(r !== this.grid.length-1){
                let bottomNeighbor = this.grid[r+1][c];
                if(!bottomNeighbor.visited && bottomNeighbor.walls[2]){
                    goTo.push(bottomNeighbor);
                }
               
            }//if cell is on the left-most column 
            if(c !== 0){
                let leftNeighbor = this.grid[r][c-1];
                if(!leftNeighbor.visited && leftNeighbor.walls[3]){
                    goTo.push(leftNeighbor);
                }
            }
            //if there are cells to continue exploring 
            if(goTo.length > 0){
                //make current cell last cell 
                this.lastCell = this.grid[r][c];
                //choose one to go to 
                let go = Math.floor(Math.random()*goTo.length);
                let newCell = goTo[go];
                //explore to new cell 
                this.explore(newCell.row, newCell.col);
            }
            else{
                backtrack();
            }
    }

    backtrack(r, c){
        let thisCell = this.grid[r][c];
        thisCell.closed = true;
        this.explore(this.lastCell.row, this.lastCell.col);
        
    }

    render(){
        //clear canvas 
        this.context.clearRect(0, 0, world.canvas.width, world.canvas.height);
        //render cells 
        for(let r = 0; r<this.row; r++){
            for(let c = 0; c<this.col; c++){
                this.grid[r][c].render();
            }
        }
    }
    
}
