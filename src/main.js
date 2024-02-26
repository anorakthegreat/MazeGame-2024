/* @type {World} */
this.world;

window.addEventListener("load", init);

function init() {
    this.world = new World();
    run();
}

function run() {
    window.requestAnimationFrame(run);
    this.world.run();
}