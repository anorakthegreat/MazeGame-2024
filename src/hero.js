function Hero(m) {

    this.mazePosition = new JSVector(1, 1)
    this.loc = new JSVector(1, 1)
    this.maze = m;
    this.moveIncrement = 3;
    this.health = 100;
    this.oxygen = 100;

    this.keys = {
        "ArrowDown": {pressed: false},
        "ArrowUp": {pressed: false},
        "ArrowLeft": {pressed: false},
        "ArrowRight": {pressed: false}
    };

    window.addEventListener("keydown", (event) => {
        if (this.keys[event.key])
        {
            this.keys[event.key].pressed = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        if (this.keys[event.key])
        {
            this.keys[event.key].pressed = false;
        }
    });
}



Hero.prototype.moveUp = function () {
    if (this.getMazeUp(world.levels[world.currentLevel].maze) == false) {
        this.loc.y -= this.moveIncrement;
        this.oxygen-=0.02;
    }
}

Hero.prototype.moveDown = function () {
    if (this.getMazeDown(world.levels[world.currentLevel].maze) == false) {
        this.loc.y += this.moveIncrement;
        this.oxygen-=0.02;
    }
}

Hero.prototype.moveLeft = function () {
    if (this.getMazeLeft(world.levels[world.currentLevel].maze) == false) {
        this.loc.x -= this.moveIncrement;
        this.oxygen-=0.02;
    }
}

Hero.prototype.moveRight = function () {
    if (this.getMazeRight(world.levels[world.currentLevel].maze) == false) {
        this.loc.x += this.moveIncrement;
        this.oxygen-=0.02;
    }
}

Hero.prototype.areInContact = function (square, rectangle) {
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

Hero.prototype.run = function (ctx, canvas, maze) {
    if (this.keys["ArrowDown"].pressed) {
        this.moveDown();
    }
    if (this.keys["ArrowUp"].pressed) {
        this.moveUp();
    }
    if (this.keys["ArrowLeft"].pressed) {
        this.moveLeft();
    }
    if (this.keys["ArrowRight"].pressed) {
        this.moveRight();
    }
    
    // this.updateCanvas(ctx)

    // this.updateCanvas(ctx, canvas)
    this.render(ctx, canvas);
    this.updateStatusBar();
}

Hero.prototype.getMazeUp = function (maze) {
    let x = Math.ceil((this.loc.x) / 50);
    let y = Math.ceil((this.loc.y) / 50);

    let cell = maze.getCell(y - 1, x - 1);

    x = x - 1;
    y = y - 1;


    if (cell.topWall()) {
        let position = { x: this.loc.x, y: this.loc.y, size: 5 };
        let wall = { x: cell.topLy, y: cell.topLx, width: cell.cellWidth, height: cell.wallWidth };
        if (Math.abs(position.y - wall.x) < 8) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }


}

Hero.prototype.getMazeDown = function (maze) {
    let x = Math.ceil((this.loc.x) / 50);
    let y = Math.ceil((this.loc.y) / 50);

    let cell = maze.getCell(y - 1, x - 1);

    x = x - 1;
    y = y - 1;

    if (cell.bottomWall()) {
        let position = { x: this.loc.x, y: this.loc.y, size: 5 }
        let wall = { x: cell.bottomLy, y: cell.bottomLx, width: cell.cellWidth, height: cell.wallWidth }
        if (Math.abs(position.y - wall.x) < 8) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }


}

Hero.prototype.getMazeLeft = function (maze) {
    let x = Math.ceil((this.loc.x) / 50);
    let y = Math.ceil((this.loc.y) / 50);

    let cell = maze.getCell(y - 1, x - 1);

    x = x - 1;
    y = y - 1;



    if (cell.leftWall()) {
        let position = { x: this.loc.x, y: this.loc.y, size: 5 };
        let wall = { x: cell.bottomLy, y: cell.bottomLx, width: cell.cellWidth, height: cell.wallWidth };

        if (Math.abs(position.x - wall.y) < 8) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }


}

Hero.prototype.getMazeRight = function (maze) {
    let x = Math.ceil((this.loc.x) / 50);
    let y = Math.ceil((this.loc.y) / 50);

    let cell = maze.getCell(y - 1, x - 1);

    x = x - 1;
    y = y - 1;

    if (cell.rightWall()) {
        let position = { x: this.loc.x, y: this.loc.y, size: 5 };
        let wall = { x: cell.bottomLy, y: cell.bottomRx, width: cell.cellWidth, height: cell.wallWidth };
        if (Math.abs(position.x - wall.y) < 8) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }


}

Object.defineProperty(Hero.prototype, "position", {
    get: function () {
        const x = Math.floor((this.loc.x) / 50);
        const y = Math.floor((this.loc.y) / 50);
        return new JSVector(x, y);
    }
});

Hero.prototype.render = function (ctx, canvas) {
    // ctx.clearRect(canvas.width, canvas.height, canvas.width * 2, canvas.height * 2);
    ctx.strokeStyle = "rgba(255, 0, 0, 55)";
    ctx.fillStyle = "rgba(255, 0, 0, 55)";
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 5, Math.PI * 2, 0, false);
    ctx.stroke();
    ctx.fill();
}
Hero.prototype.getMazeLocation = function () {
    let x = Math.floor((this.loc.x) / 50);
    let y = Math.floor((this.loc.y) / 50);
    let cell = world.levels[world.currentLevel].maze.getCell(y, x);
    return cell;
}
Hero.prototype.updateStatusBar = function () {
    this.updateOxygen();
    this.updateHealth();
}
Hero.prototype.updateHealth = function () {//assume max health will always be 100
    let h = document.getElementById("health");
    let iT = document.getElementsByClassName("infoTile");
    let hP = Math.round(this.health) / 100;
    hP=(hP*100).toFixed(0);
    h.innerHTML = hP + "%";
    iT.item(1).style.boxShadow="0 0 6px 6px #1df505";
    iT.item(1).style.backgroundImage="linear-gradient(#30db58,#3cc75c,#1e8a37)"
    if(this.health<0){
        iT.item(2).style.boxShadow="0 0 6px 6px #f50521";
        iT.item(2).style.backgroundImage="linear-gradient(#e00d26,#d4152b,#bf192c)";
        iT.item(1).style.boxShadow="0 0 6px 6px #f50521";
        iT.item(1).style.backgroundImage="linear-gradient(#e00d26,#d4152b,#bf192c)";
        world.deathScreen();
    } else if(this.health<20){
        iT.item(1).style.boxShadow="0 0 6px 6px #f50521";
        iT.item(1).style.backgroundImage="linear-gradient(#e00d26,#d4152b,#bf192c)";
    }else if(this.health<50){
        iT.item(1).style.boxShadow="0 0 6px 6px #c7f705";
        iT.item(1).style.backgroundImage="linear-gradient(#c8f70a,#bbe809,#b1d911)";
   }
}
Hero.prototype.updateOxygen = function () {
    let o = document.getElementById("oxygen");
    let iT=document.getElementsByClassName("infoTile");
    let oP = 0;
    this.oxygen -= 0.005;
    iT.item(2).style.boxShadow="0 0 6px 6px #1df505";
    iT.item(2).style.backgroundImage="linear-gradient(#30db58,#3cc75c,#1e8a37)"
    if (this.oxygen <= 0 && this.health > 0) {
        this.health -= 0.1;
        iT.item(2).style.boxShadow="0 0 6px 6px #f50521";
        iT.item(2).style.backgroundImage="linear-gradient(#e00d26,#d4152b,#bf192c)";
    } else if (this.oxygen < 10 && this.health > 0) {
        this.health -= 0.01;
        iT.item(2).style.boxShadow="0 0 6px 6px #f50521";
        iT.item(2).style.backgroundImage="linear-gradient(#e00d26,#d4152b,#bf192c)";
    } else if (this.oxygen < 40 && this.health > 0) {
        this.health -= 0.001;
        iT.item(2).style.boxShadow="0 0 6px 6px #c7f705";
        iT.item(2).style.backgroundImage="linear-gradient(#c8f70a,#bbe809,#b1d911)";
    } 
    if (this.oxygen > 0) {
        oP = Math.round(this.oxygen) / 100;
    }
    oP=(oP*100).toFixed(0);
    o.innerHTML = oP + "%";
}

