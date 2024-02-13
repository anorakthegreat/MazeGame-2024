class World {
    constructor() {
        this.canvas = document.getElementById("cnv1");
        this.context = this.canvas.getContext("2d");
        this.hero = new Hero();
        // this.maze = new Maze();

//from Diego 
        // Scales canvas correctly
        const devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
        // this.context.scale(devicePixelRatio, devicePixelRatio);

        this.maze = new Maze(this.context, 15, 15);
        // this.maze = new Hero();
        this.enemies = [];

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
        // console.log('AHh')
        let ctx = this.context
        this.framecount++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.maze.render();
        this.hero.run(this.context, this.canvas, this.maze)

    }
}


