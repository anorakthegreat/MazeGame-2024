class Level {
    constructor(world, num) {
        this.world = world;
        this.levelNum = num;
    }

    baseLevel() {

        //make maze
        this.world.maze = new Maze(this.world, 15, 15, world.renderCenter);
        this.world.maze.regenerate(true);

        //make hero and enemies 
        this.world.hero = new Hero(this.maze);
        this.world.enemies = [];
        for(let i = 0; i<this.levelNum+1; i++){
            this.world.enemies[i] = new Enemy(world, new JSVector(10.5, 10.5));
        }

        //reset html elements 
        this.world.paused = false;
        this.world.time = 0;
        this.world.msTime = 0;
        this.world.score = 0;
    }

    nextLevel() {
        levels.push(world, levels.length-1);
        levels[levels.length-1].baseLevel();
    }
}