class Backtrack{
    constructor(grid, l, w, cnv, ctx){
    this.grid = grid;
    this.length = l;
    this.width = w;
    this.canvas = cnv;
    this.context = ctx;
    }

    start(){
        this.grid[0][0] = Backtrack.openCell
    }

    openCell(i1, i2){
        this.grid[i1][i2].open = true;
    }
}