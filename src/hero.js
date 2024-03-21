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
    }
}

Hero.prototype.moveDown = function () {
    if (this.getMazeDown(world.levels[world.currentLevel].maze) == false) {
        this.loc.y += this.moveIncrement;
    }
}

Hero.prototype.moveLeft = function () {
    if (this.getMazeLeft(world.levels[world.currentLevel].maze) == false) {
        this.loc.x -= this.moveIncrement;
    }
}

Hero.prototype.moveRight = function () {
    if (this.getMazeRight(world.levels[world.currentLevel].maze) == false) {
        this.loc.x += this.moveIncrement;
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
    this.updateHealth();
    this.updateOxygen();
}
Hero.prototype.updateHealth = function () {//assume max health will always be 100
    let h = document.getElementById("health");
    let hB = document.getElementsByClassName("infoTile");
    let hP = Math.round(this.health) / 100;
    hP=(hP*100).toFixed(0);
    h.innerHTML = hP + "%";
    //color change not working rn
    hB.item(0).style.color = "rgb(23," + 115 * hP + ",41)";
}
Hero.prototype.updateOxygen = function () {
    if(this.health<0){
        world.deathScreen();
    }
    this.oxygen -= 0.04;
    if (this.oxygen <= 0 && this.health > 0) {
        this.health -= 0.1;
    } else if (this.oxygen < 10 && this.health > 0) {
        this.health -= 0.01;
    } else if (this.oxygen < 30 && this.health > 0) {
        this.health -= 0.001;
    }
    let o = document.getElementById("oxygen");
    let oP = 0;
    if (this.oxygen > 0) {
        oP = Math.round(this.oxygen) / 100;
    }
    oP=(oP*100).toFixed(0);
    o.innerHTML = oP + "%";
    //need to add color change still
}

