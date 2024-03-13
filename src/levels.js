class Level {
    constructor(world, num) {
        this.world = world;
        this.index = num;
        this.renderCenter = false;
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
        // this.world.maze = this.maze;
        //make hero and enemies 
        this.hero = new Hero(this.maze);
        // this.world.hero = this.hero;
        this.enemies = [];
        for(let i = 0; i<this.index+1; i++){
            this.enemies[i] = new Enemy(this.world, new JSVector(10, 10));
        }
        //reset html elements 
        this.paused = false;
        this.time = 0;
        this.msTime = 0;
        this.score = 0;
    }

    nextLevel() {
        //push a new level into the array 
        levels.push(new Level(world, levels.length));
        levels[levels.length-1].baseLevel();
    }

    setLevel(){
        //set properties of world to a specific level 
        world.renderCenter = this.renderCenter;
        world.maze = this.maze;
        world.hero = this.hero;
        world.enemies = this.enemies;
        world.paused = this.paused;
        world.time = this.time;
        world.msTime = this.msTime;
        world.score = this.score;

        world.currentLevel = this.index;
    }
}