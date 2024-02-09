class World {
    constructor() {
        this.canvas = document.getElementById("cnv1");
        this.context = this.canvas.getContext("2d");

        // Scales canvas correctly
        const devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
        // this.context.scale(devicePixelRatio, devicePixelRatio);

        this.maze = new Maze();
        this.enemies = [];
        
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
            case "ArrowDown":
                break;
            case "ArrowUp":
                break;
            case "ArrowLeft":
                break;
            case "ArrowRight":
                break;
            default:
                break;
            }
        });

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
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.maze.render();
    }
}


