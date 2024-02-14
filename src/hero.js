function Hero(m) {
    
    this.loc = new JSVector(300, 100)
    this.maze = m
    this.moveIncrement = 5

    window.addEventListener("keydown", (event) => {
        switch (event.key) {
        case "ArrowDown":
            this.loc.y+=this.moveIncrement;
            // console.log("ACK")
            break;
        case "ArrowUp":
            // this.loc.y-=this.moveIncrement;
            // console.l/og("ACK")
            this.moveUp()
            break;
        case "ArrowLeft":
            this.loc.x-=this.moveIncrement;
            // console.log("ACK")
            break;
            // console.log(this.loc.x)
        case "ArrowRight":
            this.loc.x+=this.moveIncrement;
            // console.log("ACK")
            break
            // console.log(this.loc.x)
        default:
            break;
        }
    });

}

Hero.prototype.moveUp = function(){
    if(!this.getMazeLocation(this.maze)){
        this.loc.y -= this.moveIncrement
    }
}

Hero.prototype.areInContact = function(square, rectangle) {
    // Extracting coordinates and dimensions for easier comparison
    const squareX = square.x;
    const squareY = square.y;
    const squareSize = square.size;

    const rectX = rectangle.x;
    const rectY = rectangle.y;
    const rectWidth = rectangle.width;
    const rectHeight = rectangle.height;

    // Checking for contact based on overlapping conditions
    const isOverlapX = squareX < rectX + rectWidth && squareX + squareSize > rectX;
    const isOverlapY = squareY < rectY + rectHeight && squareY + squareSize > rectY;

    // If there's overlap in both X and Y dimensions, the square is in contact with the rectangle
    return isOverlapX && isOverlapY;
}

Hero.prototype.run = function(ctx, canvas, maze){
    // this.updateCanvas(ctx)
    // console.log(this.loc.y)

    // this.updateCanvas(ctx, canvas)
    // console.log("AH")
    console.log(this.getMazeLocation(maze))
    this.render(ctx, canvas)
}

Hero.prototype.getMazeLocation = function(maze){
    let x = Math.ceil((this.loc.x)/ 50)
    let y = Math.ceil((this.loc.y)/50)

    let cell = maze.getCell(x, y)

    // console.log(this.loc.y)
    console.log("CELL NUMBER " + y)
    console.log(cell.topWall())

    if(cell.topWall()){
        let loc = {x: this.loc.x, y: this.loc.y, size: 5}
        let wall = {x: cell.topLy, y: cell.topLx, width: cell.cellWidth, height: cell.wallWidth}

        // console.log(loc)
        // console.log(wall)
        // console.log(this.areInContact(loc, wall))

        if(loc.y == wall.y){
            return true
        } else {
            return false
        }
    } else{
        return false
    }


}


Hero.prototype.render = function(ctx, canvas){
    // ctx.clearRect(canvas.width, canvas.height, canvas.width * 2, canvas.height * 2);
    // console.log("AJHH")
    ctx.strokeStyle = "rgba(255, 0, 0, 55)"
    ctx.fillStyle = "rgba(255, 0, 0, 55)"
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 5, Math.PI * 2, 0, false);
    ctx.stroke();
    ctx.fill() 
}
