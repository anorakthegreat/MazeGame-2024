class Cell{
    constructor(context, r, c, cellWidth){
        this.row = r;
        this.col = c;
        this.visited = false;
        this.item;
        this.cellWidth = cellWidth;
        this.walls = [true, true, true, true];//top, right, bottom, left (like a clock) 
        this.context = context;
        this.g = 0;
    }

    render(){
        let topLx = this.col*this.cellWidth;
        let topLy = this.row*this.cellWidth;
        let topRx = topLx + this.cellWidth;
        let topRy = topLy;
        let bottomRx = topRx;
        let bottomRy = topRy + this.cellWidth;
        let bottomLx = topLx;
        let bottomLy = topLy + this.cellWidth;
        if(this.visited && this.g === 0){
        console.log(topLx);
        console.log(topLy)
        console.log(bottomRx)
        console.log(bottomRy)
        this.g++;
        }
        if(this.walls[0]){//top wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = 5;
            this.context.moveTo(topLx, topLy);
            this.context.lineTo(topRx, topRy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
        if(this.walls[1]){//right wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = 5;
            this.context.moveTo(topRx, topRy);
            this.context.lineTo(bottomRx, bottomRy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
        if(this.walls[2]){//bottom wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = 5;
            this.context.moveTo(bottomRx, bottomRy);
            this.context.lineTo(bottomLx, bottomLy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
        if(this.walls[3]){//left wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = 5;
            this.context.moveTo(bottomLx, bottomLy);
            this.context.lineTo(topLx, topLy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
        if(this.visited){
            this.context.rect(topLx, topLy, this.cellWidth, this.cellWidth);
            this.context.fillStyle = "rgba(255, 0, 0, 0.2)";
            this.context.fill();
        }
        if(this.closed){
            this.context.rect(topLx, topLy, this.cellWidth, this.cellWidth);
            this.context.fillStyle = "rgba(0, 0, 255, 0.2)";
            this.context.fill();
        }
    }

    topWall(){
        return this.walls[0];
    }
    rightWall(){
        return this.walls[1];
    }
    bottomWall(){
        return this.walls[2];
    }
    leftWall(){
        return this.walls[3];
    }
}