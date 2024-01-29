class Backtrack{
    constructor(grid, l, w, cnv, ctx){
    this.grid = grid;
    this.length = l;
    this.width = w;
    this.canvas = cnv;
    this.context = ctx;
    }

    start(){
        let ran = Math.random()*2;
        if(ran<1){
            this.grid[0][0].rightWall = false;
            explore(0, 1);
        }
        else{
            this.grid[0][0].bottomWall = false;
            explore(1, 0);
        }
    }

    explore(i1, i2){
        if(i1 === 0){
            let goTo = [];//make array of available places to move to next 
            if(this.grid[i1][i2].rightWall === true)
                goTo.push(r);
            if(this.grid[i1][i2].bottomWall === true)
                goTo.push(b);
            if(this.grid[i1][i2].leftWall === true)
                goTo.push(l);
            //choose one to go to 
            Math.random()
        }
    }
}