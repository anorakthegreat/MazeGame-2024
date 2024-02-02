/* A maze */
class Maze {
    constructor(context, row, col){
        this.grid = [];
        this.row = row;
        this.col = col;
        this.count = 0;
        this.context = context;
        for(let r = 0; r<5; r++){
            this.grid[r] = [];
            for(let c = 0; c<5; c++){
                this.grid[r][c] = new Cell(this.context, r, c, this.grid.length, this.grid[0].length);
            }
        }
        this.start();
    }

    start(){
        this.grid[0][0].visited = true;
        let ran = Math.random()*2;
        if(ran<1){
            this.grid[0][0].rightWall = false;
            this.explore(0, 0);
        }
        else{
            this.grid[0][0].bottomWall = false;
            this.explore(0, 0);
        }
    }

    explore(r, c){
        this.grid[r][c].visited = true;
        //make array of available places to move to next 
        let goTo = [];
        //if the cell is a wall, don't add those neighbors to the next place to go 
            if(r !== 0){
                let topNeighbor = this.grid[r-1][c];
                if(!topNeighbor.visited && this.grid[r][c].walls[0]){
                    goTo.push(topNeighbor);
                }
              
            }
            if(c !== this.grid[0].length-1){
                let rightNeighbor = this.grid[r][c+1];
                if(!rightNeighbor.visited && this.grid[r][c].walls[1]){
                    goTo.push(rightNeighbor);
                }
              
            }
            if(r !== this.grid.length-1){
                let bottomNeighbor = this.grid[r+1][c];
                if(!bottomNeighbor.visited && this.grid[r][c].walls[2]){
                    goTo.push(bottomNeighbor);
                }
               
            }
            if(c !== 0){
                let leftNeighbor = this.grid[r][c-1];
                if(!leftNeighbor.visited && this.grid[r][c].walls[3]){
                    goTo.push(leftNeighbor);
                }
             
            }
            if(goTo.length > 0 && this.count === 0){
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
        this.context.rect(0, 0, this.row*20, this.col*20);
        this.context.strokeStyle = "rgba(86, 3, 252, 1)"
        this.context.stroke();
        for(let r = 0; r<this.row; r++){
            for(let c = 0; c<this.col; c++){
                this.grid[r][c].render();
            }
        }
    }
    
}
