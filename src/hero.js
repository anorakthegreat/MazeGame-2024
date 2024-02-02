function Hero() {
    
    this.loc = new JSVector(300, 100)

    let moveIncrement = 5

    window.addEventListener("keydown", (event) => {
        switch (event.key) {
        case "ArrowDown":
            this.loc.y+=moveIncrement;
            break;
        case "ArrowUp":
            this.loc.y-=moveIncrement;
            break;
        case "ArrowLeft":
            this.loc.x-=moveIncrement;
            break;
            // console.log(this.loc.x)
        case "ArrowRight":
            this.loc.x+=moveIncrement;
            break
            // console.log(this.loc.x)
        default:
            break;
        }
    });

}

Hero.prototype.run = function(ctx, canvas){
    // this.updateCanvas(ctx)
    // console.log(this.loc.y)

    this.updateCanvas(ctx, canvas)
    this.render(ctx, canvas)
}

Hero.prototype.updateCanvas = function(ctx, canvas) {
    // Ensure player stays within the canvas bounds
    this.loc.x = Math.max(0, Math.min(canvas.width, this.loc.x));
    this.loc.y = Math.max(0, Math.min(canvas.height, this.loc.y));

    // Adjust canvas position based on player movement
    const offsetX = canvas.width / 2 - this.loc.x;
    const offsetY = canvas.height / 2 - this.loc.y;

    // Translate the canvas to keep the player in the center
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation matrix
    ctx.translate(offsetX, offsetY);
};


Hero.prototype.render = function(ctx, canvas){
    // ctx.clearRect(canvas.width, canvas.height, canvas.width * 2, canvas.height * 2);
    // console.log("AJHH")
    ctx.strokeStyle = "rgba(255, 0, 0, 55)"
    ctx.fillStyle = "rgba(255, 0, 0, 55)"
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 20, Math.PI * 2, 0, false);
    ctx.stroke();
    ctx.fill() 
}
