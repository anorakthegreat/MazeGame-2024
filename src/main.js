/* @type {World} */
let  world;

window.addEventListener("load", init);

function init() {
    world = new World();
    run();
}

function run() {
    window.requestAnimationFrame(run);
    if(!world.paused){
        world.run();
    }
}
document.getElementById("pause").addEventListener("click",pause);
//window.addEventListener("click", pause);

function pause(){
    if(world.paused){
        world.paused=false;
    } else{
        world.paused=true;
    }
}
