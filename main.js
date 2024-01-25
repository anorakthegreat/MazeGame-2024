//Maze Game 2024 
//Main 

window.onload = init;
let world;

function init(){
    world = new World();
    animate();
}

function animate() {
  world.run();
  requestAnimationFrame(animate);
}
