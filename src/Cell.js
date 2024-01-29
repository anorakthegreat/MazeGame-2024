class Cell{
    constructor(context, i1, i2){
        this.index1 = i1;
        this.index2 = i2;
        this.open = false;
        this.vistied = false;
        this.item;
        this.leftWall = true;
        this.rightWall = true;
        this.topWall = true;
        this.bottomWall = true;
        this.context = context;
    }
/*
    render(){
        if(this.leftWall = true){
            this.context.strokeStyle = "rgba(0, 0, 0)";
            this.context.strokeWeight = 5;
            this.context.moveTo(this.index1*20, this.index2*20);
            this.context.lineTo(this.index1*20+20, this.index2*20)
        }
    }
    */
}