/* @type {World} */
let  world;

window.addEventListener("load", init);

function init() {
    world = new Wolrd();
    run();
}

function run() {
    window.requestAnimationFrame(run);
    world.run();
}
