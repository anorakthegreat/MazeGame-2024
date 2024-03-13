/* @type {World} */
this.world;
this.levels = [];

window.addEventListener("load", init);

function init() {
    world = new World();
    levels.push(new Level(world, 0));
    addAllListeners();
    run();
}

function run() {
    window.requestAnimationFrame(run);
    if(Math.random()*1000>999){
        levels[levels.length-1].nextLevel();
    }
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
