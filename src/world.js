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
        this.context.scale(devicePixelRatio, devicePixelRatio);

        this.maze = new Maze(this.context, 15, 15);
        this.hero = new Hero(this.maze);

        this.enemies = [];
        this.enemies[0] = new Enemy(this, new JSVector(10.5, 10.5));
        
        // performance (from Ecosystem)
        this.framerate = 60;
        this.framecount = 0;
        // every second (250 ms), see how many times that world.run()
        // has executed.
        setInterval(function () {
            world.framerate = world.framecount;
            world.framecount = 0;
        }, 1000);
        this.paused=false;
        this.time=0;
        this.msTime=0;
        this.score=0;
    }


    run() {
        let ctx = this.context
        this.framecount++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.hero.run(this.context, this.canvas, this.maze);

        this.maze.render();
        for (const enemy of this.enemies) {
            enemy.run();
        }
        this.updateTimer();
        this.runScore();
    }
    updateTimer(){
        this.time++;
        let t=document.getElementById("time");
        this.msTime=Math.round(this.time*1000/60)/1000;
        t.innerHTML="Time<p>"+(Math.round(this.time/60));
    }
    runScore(){
        let s=document.getElementById("score");
        if((this.time%60)===0){
            this.score+=100;
        }
        s.innerHTML="Score<p>"+(this.score);
    }
}


