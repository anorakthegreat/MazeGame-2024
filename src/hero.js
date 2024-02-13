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

    // this.updateCanvas(ctx, canvas)
    // console.log("AH")
    this.render(ctx, canvas)
}


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
