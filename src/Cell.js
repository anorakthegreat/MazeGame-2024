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
    }

    render() {
        let topLx = this.col * this.cellWidth;
        let topLy = this.row * this.cellWidth;
        let topRx = topLx + this.cellWidth;
        let topRy = topLy;
        let bottomRx = topRx;
        let bottomRy = topRy + this.cellWidth;
        let bottomLx = topLx;
        let bottomLy = topLy + this.cellWidth;
        if (this.walls[0]) {//top wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = this.wallWidth;
            this.context.moveTo(topLx, topLy);
            this.context.lineTo(topRx, topRy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
        if (this.walls[1]) {//right wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = this.wallWidth;
            this.context.moveTo(topRx, topRy);
            this.context.lineTo(bottomRx, bottomRy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
        if (this.walls[2]) {//bottom wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = this.wallWidth;
            this.context.moveTo(bottomRx, bottomRy);
            this.context.lineTo(bottomLx, bottomLy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
        if (this.walls[3]) {//left wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = this.wallWidth;
            this.context.moveTo(bottomLx, bottomLy);
            this.context.lineTo(topLx, topLy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
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