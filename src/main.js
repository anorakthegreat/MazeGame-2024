"use strict";
/* @type {World} */
let world;

window.addEventListener("load", init);

function init() {
    world = new World();
    world.levels[world.currentLevel].genLevel();
    addAllListeners();
    run();
}

function run() {
    window.requestAnimationFrame(run);
    if(!world.paused){
        world.run();
    }
}

function addAllListeners () {
    let p = document.getElementById("pauseB");
    p.addEventListener("click", swapPause);
    let r=document.getElementById("restartB");
    r.addEventListener("click",restart);
}
function swapPause () {
    world.paused = !world.paused;
}
function restart(){
    if(world.paused){
        world.genLevel(world.levels[world.currentLevel]);
        world.paused = false;
    }
}
