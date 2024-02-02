/* A maze */
class Maze {
    constructor(context, row, col){
        this.grid = [];
        this.row = row;
        this.col = col;
        this.count = 0;
        this.context = context;
        this.cellWidth = 100;
        this.wallWidth = 10;
        for(let r = 0; r<5; r++){
            this.grid[r] = [];
            for(let c = 0; c<5; c++){
                this.grid[r][c] = new Cell(this.context, r, c, this.cellWidth);
            }
        }
        this.start();
    }

    start(){
        this.explore(0, 0);
    }

    explore(r, c){
        this.grid[r][c].visited = true;
        //make array of available places to move to next 
        let goTo = [];
        //if the cell is a wall, don't add those neighbors to the next place to go 
            if(r !== 0){
                let topNeighbor = this.grid[r-1][c];
                if(!topNeighbor.visited && topNeighbor.walls[0]){
                    goTo.push(topNeighbor);
                }
              
            }
            if(c !== this.grid[0].length-1){
                let rightNeighbor = this.grid[r][c+1];
                if(!rightNeighbor.visited && rightNeighbor.walls[1]){
                    goTo.push(rightNeighbor);
                }
              
            }
            if(r !== this.grid.length-1){
                let bottomNeighbor = this.grid[r+1][c];
                if(!bottomNeighbor.visited && bottomNeighbor.walls[2]){
                    goTo.push(bottomNeighbor);
                }
               
            }
            if(c !== 0){
                let leftNeighbor = this.grid[r][c-1];
                if(!leftNeighbor.visited && leftNeighbor.walls[3]){
                    goTo.push(leftNeighbor);
                }
             
            }
            if(goTo.length > 0 && this.count <= 25){
            //choose one to go to 
            let go = Math.floor(Math.random()*goTo.length);
            // console.log(go);
            // console.log(goTo);
            // console.log(goTo[go]);
            let newCell = goTo[go];
            this.count++;
            this.explore(newCell.row, newCell.col);
            }
    }

    render(){
        this.context.clearRect(0, 0, 300, 300);
        for(let r = 0; r<this.row; r++){
            for(let c = 0; c<this.col; c++){
                this.grid[r][c].render();
            }
        }
    }
    
}
