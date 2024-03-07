class Level {
    constructor(world, num) {
        this.world = world;
        this.levelNum = num;
        this.maze = world.maze;
        this.hero = world.hero;
        this.enemies = world.enemies;
    }

    firstLevel() {
        this.numLevels = 1;
        //make maze
        this.maze = new Maze(this.world, 15, 15, true);
        this.maze.regenerate(true);
        //make hero and enemies 
        this.hero = new Hero(this.maze);
        this.enemies = [];
        this.enemies[0] = new Enemy(this.world, new JSVector(10.5, 10.5));
    }

    nextLevel() {
        this.numLevels++;
        this.maze.regenerate(true);

        //reset hero 
        this.hero = new Hero(this.world);

        //reset enemies and add more 
        
        //reset html elements 

    }
}