/* @type {World} */
this.world;
this.levels = [];

window.addEventListener("load", init);

function init() {
    world = new World();
    levels[0] = new Level(world, 0);
    levels[0].firstLevel();
    addAllListeners();
    run();
}

function run() {
    window.requestAnimationFrame(run);
    if(!world.paused){
        world.run();
    }
}

function addAllListeners(){
    let p=document.getElementById("pauseB");
    p.addEventListener("click",swapPause);
}
function swapPause(){
    if(world.paused){
        world.paused=false;
    } else{
        world.paused=true;
    }
}
