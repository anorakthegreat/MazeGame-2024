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
}
function swapPause () {
    world.paused = !world.paused;
}
