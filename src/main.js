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
let p=document.getElementById("pauseB");
console.log(p);
p.addEventListener("click",swapPause);
//window.addEventListener("click", swapPause);

function swapPause(){
    if(world.paused){
        world.paused=false;
    } else{
        world.paused=true;
    }
}
