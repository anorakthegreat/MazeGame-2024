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
        this.color = "rgba(0, 0, 255, 1)";
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
