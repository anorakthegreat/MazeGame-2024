function Cell(world, r, c, cellWidth, wallWidth) {
    this.world = world;
    this.context = world.context;
    this.row = r;
    this.col = c;
    //visited during explore 
    this.visited = false;
    this.oxygen = null;
    this.oxygenRadius = 0.8 / 2;
    this.cellWidth = cellWidth;
    this.wallWidth = wallWidth;
    this.walls = [true, true, true, true];//top, right, bottom, left (like a clock) 
    this.color = "rgba(0, 0, 255, 1)";
    this.topLx = this.col * this.cellWidth;
    this.topLy = this.row * this.cellWidth
    this.topRx = this.topLx + this.cellWidth;
    this.topRy = this.topLy;
    this.bottomRx = this.topRx;
    this.bottomRy = this.topRy + this.cellWidth;
    this.bottomLx = this.topLx;
    this.bottomLy = this.topLy + this.cellWidth;

    this.walls = [true, true, true, true];//top, right, bottom, left (like a clock)

    /* @type {float} (0 <= luminance <= 1) */
    this.luminance = 0;
    this.type = "coral"; // Types for images
}

Cell.prototype.render = function(center){
    if(center){
        this.renderCenter();
    }
    else{
        this.renderClassic();
    }
}

Cell.prototype.renderCenter = function () {
    const cellWidth = this.cellWidth;
    const wallWidth = this.wallWidth;

    const hero = this.world.levels[world.currentLevel].enemies[0]; // TEMPORARY
    const x = (this.col - hero.position.x - 0.5 * hero.width) * cellWidth;
    const y = (this.row - hero.position.y - 0.5 * hero.width) * cellWidth;
    const xEnd = x + cellWidth;
    const yEnd = y + cellWidth;

    const context = this.world.context;
    context.save();
    context.translate(this.world.canvas.width / 2, this.world.canvas.height / 2);

    context.beginPath();
    context.strokeStyle = "white";
    context.lineWidth = this.wallWidth;

    const image = this.world.levels[world.currentLevel].maze.images[this.type];
    if (image && image.loaded && this.luminance > 0) {
        const sourceX = 0;
        const sourceY = 0;
        const sourceWidth = image.image.width;
        const sourceHeight = image.image.height;
        const destinationX = x;
        const destinationY = y;
        const destinationWidth = cellWidth;
        const destinationHeight = cellWidth;
        context.save();
        // context.beginPath();
        const brightness = 100 * this.luminance;
        context.filter = `brightness(${brightness}%)`;
        context.drawImage(image.image, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);

        const bubble = this.world.levels[world.currentLevel].maze.images["bubble"];
        if (this.oxygen && bubble && bubble.loaded)
        {
            context.drawImage(bubble.image, sourceX, sourceY, bubble.image.width, bubble.image.height, destinationX, destinationY, destinationWidth, destinationHeight);            }
        context.restore();
    } else if (this.luminance <= 0) {
        context.stroke();
        context.closePath();
        context.restore();
        return;
    }

    this.luminance = 0;	// reset the luminance

    // This thing
    const centerCell = hero.position.copy();
    centerCell.add(new JSVector(hero.width * 0.5, hero.width * 0.5));
    centerCell.floor();

    // top wall 
    if (this.walls[0]) {
        context.moveTo(x, y);
        context.lineTo(xEnd, y);
    }
    // right wall 
    if (this.walls[1]) {
        context.moveTo(xEnd, y);
        context.lineTo(xEnd, yEnd);
    }
    // bottom wall 
    if (this.walls[2]) {
        context.moveTo(x, yEnd);
        context.lineTo(xEnd, yEnd);
    }
    // left wall 
    if (this.walls[3]) {
        context.moveTo(x, y);
        context.lineTo(x, yEnd);
    }

    context.stroke();
    context.closePath();
    context.restore();
}

Cell.prototype.renderClassic = function () {
    this.context.save()
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.wallWidth;
    // top wall 
    if (this.walls[0]) {
        this.context.moveTo(this.topLx, this.topLy);
        this.context.lineTo(this.topRx, this.topRy);
    }
    // right wall 
    if (this.walls[1]) {
        this.context.moveTo(this.topRx, this.topRy);
        this.context.lineTo(this.bottomRx, this.bottomRy);
    }
    // bottom wall 
    if (this.walls[2]) {
        this.context.moveTo(this.bottomRx, this.bottomRy);
        this.context.lineTo(this.bottomLx, this.bottomLy);
    }
    // left wall 
    if (this.walls[3]) {
        this.context.moveTo(this.bottomLx, this.bottomLy);
        this.context.lineTo(this.topLx, this.topLy);
    }

    this.context.stroke();
    this.context.closePath();
    this.context.restore();

    if (this.oxygen != null) {
        this.oxygen.render();
    }
}


Cell.prototype.topWall = function () {
    return this.walls[0];
}
Cell.prototype.rightWall = function () {
    return this.walls[1];
}
Cell.prototype.bottomWall = function () {
    return this.walls[2];
}
Cell.prototype.leftWall = function () {
    return this.walls[3];
}
