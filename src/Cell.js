class Cell {
    constructor(context, r, c, cellWidth, wallWidth) {
        this.row = r;
        this.col = c;
        //visited during explore 
        this.visited = false;
        this.item;
        this.cellWidth = cellWidth;
        this.wallWidth = wallWidth;
        this.walls = [true, true, true, true];//top, right, bottom, left (like a clock) 
        this.context = context;
        this.color = "rgba(14, 68, 149, 1)";
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
        
        this.context.save()
        this.context.beginPath();
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.wallWidth;
        // top wall 
        if (this.walls[0]) { 
            this.context.moveTo(topLeftx, topLefty);
            this.context.lineTo(topRightx, topRighty);
        }
        // right wall 
        if (this.walls[1]) {
            this.context.moveTo(topRightx, topRighty);
            this.context.lineTo(bottomRightx, bottomRighty);
        }
        // bottom wall 
        if (this.walls[2]) {
            this.context.moveTo(bottomRightx, bottomRighty);
            this.context.lineTo(bottomLeftx, bottomLefty);
        }
        // left wall 
        if (this.walls[3]) {
            this.context.moveTo(bottomLeftx, bottomLefty);
            this.context.lineTo(topLeftx, topLefty);
        }

        this.context.stroke();
        this.context.closePath();
        this.context.restore();

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
