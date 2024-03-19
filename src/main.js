"use strict";
/* @type {World} */
let world;

window.addEventListener("load", init);

function init() {
    world = new World();
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
        //waiting for calvin's level code :)
        //console.log("restart the level");
    }
}
