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

        for (const enemy of this.enemies) {
            enemy.run(this.renderCenter);
        }

        this.hero.run(this.renderCenter);
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
        this.hero = new BetterHero(world, new JSVector(0, 0));
        for (let i = 0; i < 2; i++) {
            this.enemies[i] = new Enemy(world, new JSVector(1, 1));
        }
        
    }
}
