class Level {
    constructor(world, num) {
        this.world = world;
        this.index = num;
        this.renderCenter;
        this.maze;
        this.hero;
        this.enemies = [];
        this.paused = false;
        this.time = 0;
        this.msTime = 0;
        this.score = 0;
    }

    baseLevel() {

        //make maze
        this.maze = new Maze(this.world, 15, 15, this.renderCenter);
        this.maze.regenerate(true);
        world.maze = this.maze;
        //make hero and enemies 
        this.hero = new Hero(this.maze);
        world.hero = this.hero;
        this.enemies = [];
        for(let i = 0; i<this.index+1; i++){
            this.enemies[i] = new Enemy(world, new JSVector(10, 10));
            world.enemies[i] = this.enemies[i];
        }

        //reset html elements 
        this.world.paused = false;
        this.world.time = 0;
        this.world.msTime = 0;
        this.world.score = 0;
    }

    nextLevel() {
        levels.push(new Level(world, levels.length));
        levels[levels.length-1].baseLevel();
    }
}