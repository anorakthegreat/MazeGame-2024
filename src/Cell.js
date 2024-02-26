function Cell(context, r, c, cellWidth, wallWidth) {
        this.row = r;
        this.col = c;
        //visited during explore 
        this.visited = false;
        this.item;
        this.cellWidth = cellWidth;
        this.wallWidth = wallWidth;
        this.walls = [true, true, true, true];//top, right, bottom, left (like a clock) 
        this.context = context;

        this.topLx = this.col * this.cellWidth;
        this.topLy = this.row * this.cellWidth
        this.topRx = this.topLx + this.cellWidth;
        this.topRy = this.topLy;
        this.bottomRx = this.topRx;
        this.bottomRy = this.topRy + this.cellWidth;
        this.bottomLx = this.topLx;
        this.bottomLy = this.topLy + this.cellWidth;
}

    Cell.prototype.render = function() {
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

    Cell.prototype.topWall = function(){
        return this.walls[0];
    }
    Cell.prototype.rightWall = function() {
        return this.walls[1];
    }
    Cell.prototype.bottomWall = function() {
        return this.walls[2];
    }
    Cell.prototype.leftWall = function() {
        return this.walls[3];
    }
