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
            //enemy.run(this.renderCenter);
        }

        //this.hero.run(this.renderCenter);
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
        
        // this.hero = new Hero(level.maze);
        // for (let i = 0; i < 2; i++) {
        //     this.enemies[i] = new Enemy(world, new JSVector(10, 10));
        // }
       
    }

    // baseLevel() {
    //     //make maze
    //     this.maze = new Maze(this.world, 15, 15, this.renderCenter);
    //     this.maze.regenerate(true);
    //     // this.world.maze = this.maze;
    //     //make hero and enemies 
    //     this.hero = new Hero(this.maze);
    //     // this.world.hero = this.hero;
    //     this.enemies = [];
    //     for(let i = 0; i<this.index+1; i++){
    //         this.enemies[i] = new Enemy(this.world, new JSVector(10, 10));
    //     }
    //     //reset html elements 
    //     this.paused = false;
    //     this.time = 0;
    //     this.msTime = 0;
    //     this.score = 0;
    // }

    // nextLevel() {
    //     //push a new level into the array 
    //     levels.push(new Level(world, levels.length));
    //     levels[levels.length-1].baseLevel();
    // }

    // setLevel(){
    //     //set properties of world to a specific level 
    //     world.renderCenter = this.renderCenter;
    //     world.maze = this.maze;
    //     world.hero = this.hero;
    //     world.enemies = this.enemies;
    //     world.paused = this.paused;
    //     world.time = this.time;
    //     world.msTime = this.msTime;
    //     world.score = this.score;

    //     world.currentLevel = this.index;
    // }
}
