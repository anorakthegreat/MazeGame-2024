class World {
    constructor() {
        this.canvas = document.getElementById("cnv1");
        this.context = this.canvas.getContext("2d");
        // this.maze = new Maze();

        // from Diego 
        // Scales canvas correctly
        const devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
        if (!window.devicePixelRatio)
            this.context.scale(devicePixelRatio, devicePixelRatio);

        this.maze = new Maze(this, 15, 15);
        this.maze.regenerate();
        this.hero = new Hero(this.maze);
        this.enemies = [];
        this.enemies[0] = new Enemy(this, new JSVector(10, 10));
        
        // performance (from Ecosystem)
        this.framerate = 60;
        this.framecount = 0;
        // every second (250 ms), see how many times that world.run()
        // has executed.
        setInterval(function () {
            world.framerate = world.framecount;
            world.framecount = 0;
        }, 1000);
    }


    run() {
        this.framecount++;
        // clear canvas 
        this.context.clearRect(0, 0, world.canvas.width, world.canvas.height);
        
        this.maze.render();
        for (const enemy of this.enemies) {
            enemy.run();
        }
        
        this.hero.run(this.context, this.canvas, this.maze);
        // if(Math.random()*10>9){
        //     this.maze.regenerate();
        // }
    }
}


