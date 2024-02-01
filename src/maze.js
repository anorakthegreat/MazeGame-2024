/* A maze */
class Maze {
    constructor(context, row, col){
        this.grid = [];
        this.row = row;
        this.col = col;
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

    explore(i1, i2){
        //make array of available places to move to next 
        let goTo = [];
        //if the cell is a wall, don't add those neighbors to the next place to go 
            if(i1 !== 0){
                let topNeighbor = this.grid[i1-1][i2];
                if(!topNeighbor.visited && topNeighbor.walls[0]){
                    goTo.push(topNeighbor);
                }
            }
            if(i2 !== this.grid[0].length-1){
                let rightNeighbor = this.grid[i1][i2+1];
                if(!rightNeighbor.visited && rightNeighbor.walls[0]){
                    goTo.push(rightNeighbor);
                }
            }
            if(i1 !== this.grid.length-1){
                let bottomNeighbor = this.grid[i1+1][i2];
                if(!bottomNeighbor.visited && bottomNeighbor.walls[0]){
                    goTo.push(bottomNeighbor);
                }
            }
            if(i2 !== 0){
                let leftNeighbor = this.grid[i1][i2-1];
                if(!leftNeighbor.visited && leftNeighbor.walls[0]){
                    goTo.push(leftNeighbor);
                }
            }
            //choose one to go to 
            let go = Math.floor(Math.random()*goTo.length);
            console.log(go);
            console.log(goTo);
            console.log(goTo[go]);
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
