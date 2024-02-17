class Cell {
    constructor(world, r, c, cellWidth, wallWidth) {
        console.log(this);
        this.world = world;
        
        this.row = r;
        this.col = c;
        //visited during explore 
        this.visited = false;
        this.item;
        this.cellWidth = cellWidth;
        this.wallWidth = wallWidth;
        this.walls = [true, true, true, true];//top, right, bottom, left (like a clock)

        this.type = "coral"; // Types for images
    }

    render() {
        let topLeftx = this.col * this.cellWidth;
        let topLefty = this.row * this.cellWidth;
        let topRightx = topLeftx + this.cellWidth;
        let topRighty = topLefty;
        let bottomRightx = topRightx;
        let bottomRighty = topRighty + this.cellWidth;
        let bottomLeftx = topLeftx;
        let bottomLefty = topLefty + this.cellWidth;
        const cellWidth = this.cellWidth;
        const wallWidth = this.wallWidth;

        const context = this.world.context;
        context.save()
        context.beginPath();
        context.strokeStyle = "white";
        context.lineWidth = this.wallWidth;


        const image = this.world.maze.images[this.type];
        if (image.loaded) {
            const sourceX = 0;
            const sourceY = 0;
            const sourceWidth = image.image.width;
            const sourceHeight = image.image.height;
            const destinationX = topLeftx;
            const destinationY = topLefty;
            const destinationWidth = cellWidth;
            const destinationHeight = cellWidth;
            context.drawImage(image.image, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);
        }

        
        // top wall 
        if (this.walls[0]) {
            context.moveTo(topLeftx, topLefty);
            context.lineTo(topRightx, topRighty);
        }
        // right wall 
        if (this.walls[1]) {
            context.moveTo(topRightx, topRighty);
            context.lineTo(bottomRightx, bottomRighty);
        }
        // bottom wall 
        if (this.walls[2]) {
            context.moveTo(bottomRightx, bottomRighty);
            context.lineTo(bottomLeftx, bottomLefty);
        }
        // left wall 
        if (this.walls[3]) {
            context.moveTo(bottomLeftx, bottomLefty);
            context.lineTo(topLeftx, topLefty);
        }

        context.stroke();
        context.closePath();
        context.restore();

        // if (this.visited) {
        //     this.context.rect(topLx, topLy, this.cellWidth, this.cellWidth);
        //     this.context.fillStyle = "rgba(255, 0, 0, 0.2)";
        //     this.context.fill();
        // }
    }

    topWall() {
        return this.walls[0];
    }
    rightWall() {
        return this.walls[1];
    }
    bottomWall() {
        return this.walls[2];
    }
    leftWall() {
        return this.walls[3];
    }
}
