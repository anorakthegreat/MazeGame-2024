/* A maze */
class Maze {
    constructor(context){
        this.grid = [];
        this.context = context;
        for(let r = 0; r<5; r++){
            this.grid[r] = [];
            for(let c = 0; c<5; c++){
                this.grid[r][c] = new Cell(this.context, r, c);
            }
        }
        this.start();
    }

    start(){
        let ran = Math.random()*2;
        if(ran<1){
            this.grid[0][0].rightWall = false;
            this.explore(0, 1);
        }
        else{
            this.grid[0][0].bottomWall = false;
            this.explore(1, 0);
        }
    }

    explore(i1, i2){
            let goTo = [];//make array of available places to move to next 
            if(this.grid[i1-1][i2] && !this.grid[i1-1][i2].visited && this.grid[i1][i2].walls[0]){
                goTo.push(this.grid[i1-1][i2]);
            }
            if(this.grid[i1][i2+1] && !this.grid[i1][i2+1].visited && this.grid[i1][i2].walls[0]){
                goTo.push(this.grid[i1][i2+1]);
            }
            if(this.grid[i1+1][i2] && !this.grid[i1+1][i2].visited && this.grid[i1][i2].walls[0]){
                goTo.push(this.grid[i1+1][i2]);
            }
            if(this.grid[i1][i2-1] && !this.grid[i1][i2-1].visited && this.grid[i1][i2].walls[0]){
                goTo.push(this.grid[i1][i2-1]);
            }
            //choose one to go to 
            let go = Math.floor(Math.random()*goTo.length);
            console.log(goTo[go]);
    }

    render(){
        this.context.clearRect(0, 0, 300, 300);
        for(let r = 0; r<5; r++){
            for(let c = 0; c<5; c++){
                this.grid[r][c].render();
            }
        }
    }
    
}
