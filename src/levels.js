/*
a level object contains all of the properties in the level:
- maze 
- hero 
- enemies 

the level object should have generate maze, 
generate hero, and generate enemies methods 

*/

class Level {
    constructor(rows, cols, mL, levelNum, renderCenter) {
        this.levelNum = levelNum;
        this.rows = rows;
        this.cols = cols;
        this.mazeLength = mL
        this.renderCenter = renderCenter;
        this.maze;
        this.hero;
        this.enemies = [];
    }

    run() {
        this.maze.render(this.renderCenter);

        this.hero.run(this.renderCenter);

        for (let i=0;i<this.enemies.length;i++) {
            this.enemies[i].run(this.renderCenter);
            if(this.enemies[i].health<=0){
                this.enemies.splice(i, 1);
            }
        }

        if(this.renderCenter)
            this.maze.resetLuminances();
    }

    genLevel() {
        this.maze = new Maze(world, this, new JSVector(0, 0), this.rows, this.cols, this.renderCenter);
        let mL = this.mazeLength;
        for(let r = 0; r<this.rows/mL; r++){
            for(let c = 0; c<this.cols/mL; c++){
                this.maze.regenerate(mL*r, mL*c, r*mL+mL, c*mL+mL);
            }
        }
        console.log(this.maze.sloc);
        this.safeZones();
        this.hero = new BetterHero(world, new JSVector(0, 0));
        for (let i = 0; i < 2; i++) {
            this.enemies[i] = new Enemy(world, new JSVector(1, 1));
        }
        
    }

    safeZones(){
        let sloc = this.maze.sloc;
        for(let i = 0; i<sloc.length; i++){
            let r = sloc[i].row;
            let c = sloc[i].col;
            let grid = this.maze.grid;
            grid[r][c].safeZone = true;
            grid[r+1][c].safeZone = true;
            grid[r][c+1].safeZone = true;
            grid[r+1][c+1].safeZone = true;
            /*
            r and c are the row and column (respectively) 
            of box 1 in the safe zone 
            
            safe zone: 
            [box 1] [box 2]
            [box 3] [box 4]

            all boxes are parts of different sections of the maze, 
            the safe zones are always at the corner that four mazes share 

            all walls are removed in the safe zone cells 
            */
        }
    }
}
