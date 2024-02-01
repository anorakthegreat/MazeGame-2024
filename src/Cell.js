class Cell{
    constructor(context, r, c, rowNum, colNum){
        this.row = r;
        this.col = c;
        this.visited = false;
        this.item;
        this.walls = [true, true, true, true];//top, right, bottom, left (like a clock) 
        this.context = context;
    }

    render(){
        let topLx = this.row*20;
        let topLy = this.col*20;
        let topRx = this.row*20;
        let topRy = this.col*20 + 20;
        let bottomRx = this.row*20 + 20;
        let bottomRy = this.col*20 + 20;
        let bottomLx = this.row*20 + 20;
        let bottomLy = this.col*20;
        if(this.walls[0]){//top wall 
            this.context.save()
            this.context.beginPath();
            this.context.strokeStyle = "rgba(86, 3, 252, 1)";
            this.context.lineWidth = 2;
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
            this.context.lineWidth = 2;
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
            this.context.lineWidth = 2;
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
            this.context.lineWidth = 2;
            this.context.moveTo(bottomLx, bottomLy);
            this.context.lineTo(topLx, topLy);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
        if(this.visited){
            this.context.rect(topLx, topLy, bottomRx, bottomRy);
            this.context.fill();
        }
    }

}