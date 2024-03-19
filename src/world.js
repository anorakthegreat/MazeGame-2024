"use strict";
class World {
    constructor() {
        this.canvas = document.getElementById("cnv1");
        this.context = this.canvas.getContext("2d");

        // from Diego 
        // Scales canvas correctly
        const devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
        if (!window.devicePixelRatio)
            this.context.scale(devicePixelRatio, devicePixelRatio);

        // performance (from Ecosystem)
        this.framerate = 60;
        this.framecount = 0;
        // every second (250 ms), see how many times that world.run()
        // has executed.
        setInterval(function () {
            world.framerate = world.framecount;
            world.framecount = 0;
        }, 1000);
        this.paused = false;
        this.time = 0;
        this.msTime = 0;
        this.score = 0;

        this.currentLevel = 0;
        this.levels = [new Level(15, 15, 1, true)];
        this.genLevel(this.levels[0]);
    }


    run() {
        this.framecount++

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.levels[this.currentLevel].run();

        this.updateStatusBar();
    }
    updateStatusBar() {
        this.updateTimer();
        this.runScore();
    }
    updateTimer() {
        this.time++;
        let t = document.getElementById("time");
        this.msTime = Math.round(this.time * 1000 / 60) / 1000;
        t.innerHTML = Math.round(this.time / 60);
    }
    runScore() {
        let s = document.getElementById("score");
        if (((this.time % 60) === 0) && this.levels[world.currentLevel].hero.health > 0) {
            this.score += 100;
        }
        //detects contact with oxygen
        let sanjan = this.levels[world.currentLevel].hero.getMazeLocation().oxygen;
        if (sanjan != null && sanjan.air > 0) {
            if (this.levels[world.currentLevel].hero.oxygen < 99.9) {
                this.levels[world.currentLevel].hero.oxygen += 0.1;
                sanjan.air -= 0.1;
            }
            this.score += 1;
        }
        if (this.levels[world.currentLevel].hero.getMazeLocation() === this.levels[world.currentLevel].maze.exit) {
            this.score += 1000;
        }
        s.innerHTML = this.score;
    }

    genLevel(level) {
        level.maze = new Maze(this, level.rows, level.cols, level.renderCenter);
        level.maze.regenerate();
        level.hero = new Hero(level.maze);
        for (let i = 0; i < 2; i++) {
            level.enemies[i] = new Enemy(this, new JSVector(10, 10));
        }
    }
}


