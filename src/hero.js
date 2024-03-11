function Hero(m) {

    this.mazePosition = new JSVector(1, 1)
    this.loc = new JSVector(1, 1)
    this.maze = m
    this.moveIncrement = 3

    window.addEventListener("keydown", (event) => {
        // switch (event.key) {
        // case "ArrowDown":
        //     // this.loc.y+=this.moveIncrement;
        //     this.moveDown()
        //     break;
        // case "ArrowUp":
        //     // this.loc.y-=this.moveIncrement;
        //     this.moveUp()
        //     break;
        // case "ArrowLeft":
        //     this.moveLeft()
        //     break;
        // case "ArrowRight":
        //     this.moveRight();
        //     break
        // default:
        //     break;
        // }


        if(event.key == "ArrowDown"){
            this.moveDown()
        }

        if(event.key == "ArrowUp"){
            this.moveUp()
        }

        if(event.key == "ArrowLeft"){
            this.moveLeft()
        }

        if(event.key == "ArrowRight"){
            this.moveRight()
        }
    });


}

Hero.prototype.moveUp = function(){
    // console.log(this.getMazeUp(sworld.maze))
    if(this.getMazeUp(world.maze) == false){
        this.loc.y -= this.moveIncrement
    }
}

Hero.prototype.moveDown = function(){
    // console.log(this.getMazeDown(world.maze))
    if(this.getMazeDown(world.maze) == false){
        this.loc.y += this.moveIncrement
    }
}

Hero.prototype.moveLeft = function(){
    // console.log(this.getMazeLeft(world.maze))
    if(this.getMazeLeft(world.maze) == false){
        this.loc.x -= this.moveIncrement
    }
    // console.log("BALLS")
}

Hero.prototype.moveRight = function(){
    // console.log(this.getMazeLeft(world.maze))
    if(this.getMazeRight(world.maze) == false){
        this.loc.x += this.moveIncrement
    }
    // console.log("BALLS")
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

    // this.updateCanvas(ctx, canvas)
    this.render(ctx, canvas)

    this.returnMazeLoc(maze)
}

Hero.prototype.getMazeUp = function(maze){
    let x = Math.ceil((this.loc.x)/ 50)
    let y = Math.ceil((this.loc.y)/50)

    let cell = maze.getCell(y - 1, x - 1)

    x = x-1
    y = y-1

    // console.log("X: " + x)
    // console.log("Y: " + y)
    // console.log("RAHHHH")
    // console.log("HAS TOP WALL " +s cell.topWall())

    if(cell.topWall()){
        let position = {x: this.loc.x, y: this.loc.y, size: 5}
        let wall = {x: cell.topLy, y: cell.topLx, width: cell.cellWidth, height: cell.wallWidth}
        // console.log("ABS  " + Math.abs(position.y - wall.x))
        // console.log("WALLLL Y " + wall.x)
        if(Math.abs(position.y - wall.x) < 8){
            return true
        } else{
            return false
        }
       
    } else{
        return false
    }


}

Hero.prototype.getMazeDown = function(maze){
    let x = Math.ceil((this.loc.x)/ 50)
    let y = Math.ceil((this.loc.y)/50)

    let cell = maze.getCell(y - 1, x - 1)

    x = x-1
    y = y-1

    // console.log("X: " + x)
    // console.log("Y: " + y)
    // console.log("RAHHHH")
    // console.log("HAS TOP WALL " + cell.topWall())

    if(cell.bottomWall()){
        let position = {x: this.loc.x, y: this.loc.y, size: 5}
        let wall = {x: cell.bottomLy, y: cell.bottomLx, width: cell.cellWidth, height: cell.wallWidth}

        // console.log("ABS  " + Math.abs(position.y - wall.x))
        // console.log("WALLLL Y " + wall.x)
        if(Math.abs(position.y - wall.x) < 8){
            return true
        } else{
            return false
        }
       
    } else{
        return false
    }


}

Hero.prototype.getMazeLeft = function(maze){
    let x = Math.ceil((this.loc.x)/ 50)
    let y = Math.ceil((this.loc.y)/50)

    let cell = maze.getCell(y - 1, x - 1)

    x = x-1
    y = y-1

    // console.log("X: " + x)
    // console.log("Y: " + y)
    // console.log("RAHHHH")
    console.log("HAS LEFT WALL " + cell.leftWall())

    if(cell.leftWall()){
        let position = {x: this.loc.x, y: this.loc.y, size: 5}
        let wall = {x: cell.bottomLy, y: cell.bottomLx, width: cell.cellWidth, height: cell.wallWidth}

        console.log("ABS  " + Math.abs(position.y - wall.x))
        console.log("WALLLL Y " + wall.x)
        if(Math.abs(position.x - wall.y) < 8){
            return true
        } else{
            return false
        }
       
    } else{
        return false
    }


}

Hero.prototype.getMazeRight = function(maze){
    let x = Math.ceil((this.loc.x)/ 50)
    let y = Math.ceil((this.loc.y)/50)

    let cell = maze.getCell(y - 1, x - 1)

    x = x-1
    y = y-1

    // console.log("X: " + x)
    // console.log("Y: " + y)
    // console.log("RAHHHH")
    // console.log("HAS LEFT WALL " + cell.leftWall())

    if(cell.rightWall()){
        let position = {x: this.loc.x, y: this.loc.y, size: 5}
        let wall = {x: cell.bottomLy, y: cell.bottomRx, width: cell.cellWidth, height: cell.wallWidth}

        console.log("ABS  " + Math.abs(position.y - wall.x))
        console.log("WALLLL Y " + wall.x)
        if(Math.abs(position.x - wall.y) < 8){
            return true
        } else{
            return false
        }
       
    } else{
        return false
    }


}


Hero.prototype.returnMazeLoc = function(maze){
    let x = Math.ceil((this.loc.x)/ 50)
    let y = Math.ceil((this.loc.y)/50)

    let cell = maze.getCell(x, y)

    this.mazePosition = new JSVector(x, y)
    // console.log("X" + x) 
    // console.log("Y" + y) 

    


}


Hero.prototype.render = function(ctx, canvas){
    // ctx.clearRect(canvas.width, canvas.height, canvas.width * 2, canvas.height * 2);
    ctx.strokeStyle = "rgba(255, 0, 0, 55)"
    ctx.fillStyle = "rgba(255, 0, 0, 55)"
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 5, Math.PI * 2, 0, false);
    ctx.stroke();
    ctx.fill() 
}
