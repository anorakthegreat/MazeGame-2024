function Hero(m) {
    
    this.position = new JSVector(1, 1)
    this.maze = m
    this.moveIncrement = 5
    this.health=100;
    this.oxygen=100;

    window.addEventListener("keydown", (event) => {
        switch (event.key) {
        case "s":
            this.position.y+=this.moveIncrement;
            break;
        case "w":
            this.position.y-=this.moveIncrement;
            break;
        case "a":
            this.position.x-=this.moveIncrement;
            break;
        case "d":
            this.position.x+=this.moveIncrement;
            break
        default:
            break;
        }
    });


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
    this.updateStatusBar();
}

Hero.prototype.getMazeLocation = function(){
    let x = Math.floor((this.position.x)/ 50)
    let y = Math.floor((this.position.y)/50)
    let cell = this.maze.getCell(y, x)
    return cell;
}


Hero.prototype.render = function(ctx, canvas){
    // ctx.clearRect(canvas.width, canvas.height, canvas.width * 2, canvas.height * 2);
    ctx.strokeStyle = "rgba(255, 0, 0, 55)"
    ctx.fillStyle = "rgba(255, 0, 0, 55)"
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 5, Math.PI * 2, 0, false);
    ctx.stroke();
    ctx.fill() 
}
Hero.prototype.updateStatusBar=function(){
    this.updateHealth();
    this.updateOxygen();
}
Hero.prototype.updateHealth=function(){//assume max health will always be 100
    let h=document.getElementById("health");
    let hB=document.getElementsByClassName("infoTile");
    let hP=Math.round(this.health)/100;
    h.innerHTML=hP*100+"%";
    //color change not working rn
    hB.item(0).style.color="rgb(23,"+115*hP+",41)";
}
Hero.prototype.updateOxygen=function(){
    this.oxygen-=0.01;
    if(this.oxygen<=0){
        this.health-=0.1;
    } else if(this.oxygen<10){
        this.health-=0.01;
    } else if(this.oxygen<30){
        this.health-=0.001;
    }
    let o=document.getElementById("oxygen");
    let oP=0;
    if(this.oxygen>0){
        oP=Math.round(this.oxygen)/100;
    }
    o.innerHTML=oP*100+"%";
    //need to add color change still
}
