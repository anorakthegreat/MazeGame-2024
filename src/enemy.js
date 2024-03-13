/**
 * The enemy in the maze game
 */
class Enemy {
    /**
     * Create an enemy
     * @param {World} world - the world that the enemy belongs to
     * @param {JSVector} initialPosition - the enemy's intial position in the maze
     */
    constructor(world, initialPosition) {
        /* @type {World} */
        this.world = world;

	/* @type {number} */
        this.width = 0.5;
        this.speed = 0.01;

        /* @type {JSVector} */
        this.position = initialPosition.copy();
	this.position.add(new JSVector(this.width*0.5, this.width*0.5));
        this.velocity = new JSVector();
        this.acceleration = new JSVector();

        
        /* @type {Queue<JSVector>} */
        this.path = new Queue();

	/* @type {PathType} */
        this.pathType = PathType.WANDER;
	
	/* @type {JSVector} */
	this.target = JSVector.random(world.col, world.row);
	this.target.floor();
    }    

    /* Run the enemy (once per frame) */
    run(center) {
        this.update();
        if (center) {
            this.renderCenter();
        } else {
            this.renderClassic();
        }
    }

    /* Update the enemy's position */
    update() {
	// TODO: TEMP: change
        if (this.path.empty()) {
	    this.updatePath();
	}
	
        if (this.pathType == PathType.WANDER) {
	    this.wander();
	} else if (this.pathType == PathType.SEEK) {
	    this.seekPlayer();
        } else {
            throw new Error(`pathType has an invalid value: ${this.pathType}`);
        }

        // Update the enemy's position
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.speed);
        this.position.add(this.velocity);

        this.checkWalls();
    }

    wander() {
	// TODO: TEMP: change
	this.seekPlayer();
    }
    seekPlayer() {
	let currentCell = this.position.copy();
	currentCell.floor();
	let nextCell = this.path.peek();
        // If the enemy has reached the next cell in the path, update
        // the path by removing the cell from the top of the path
        if (currentCell.equals(nextCell)) {
            nextCell = this.path.pop();
            if (this.path.empty())
	    {
                throw new Error("No new path to follow");
	    }
        }
	
	// Vector pointing from the center of the enemy to the center
	// of the target cell
	const targetCell = nextCell.copy();
        targetCell.add(new JSVector(0.5 * (1 - this.width), 0.5 * (1 - this.width)));
	// Accelerate towards that next cell
        this.seek(targetCell);
    }

    /**
     * Seek a position
     * @param {JSVector} position - this position to seek
     */
    seek(position) {
        this.acceleration = position.copy();
        this.acceleration.sub(this.position);
        this.acceleration.setMagnitude(this.speed ** 1.75);
    }

    /* Check the walls of the maze for collisions */
    // TODO: Doesn't work when one edge is outside of the cell that
    // the center is in
    checkWalls() {
        const y = this.position.y;
        const x = this.position.x;
        const w = this.width;
        const topLeft     = new JSVector(x, y);
        const topRight    = new JSVector(x + w, y);
        const bottomLeft  = new JSVector(x, y + w);
        const bottomRight = new JSVector(x + w, y + w);
        bottomRight.floor();
        bottomLeft.floor();
        topRight.floor();
        topLeft.floor();

        const maze = this.world.maze;
        const bottomRightCell = maze.grid[bottomRight.y][bottomRight.x];
        const bottomLeftCell  = maze.grid[bottomLeft.y][bottomLeft.x];
        const topRightCell    = maze.grid[topRight.y][topRight.x];
        const topLeftCell     = maze.grid[topLeft.y][topLeft.x];

        const spearTop = new JSVector(x, y - 1);
        const spearBottom = new JSVector(x, y + 1);
        const spearLeft = new JSVector(x - 1, y);
        const spearRight = new JSVector(x + 1, y);
        spearTop.floor();
        spearBottom.floor();
        spearLeft.floor();
        spearRight.floor();

        let spearTopCell = null;
        if (spearTop.y >= 0) {
            spearTopCell = maze.grid[spearTop.y][spearTop.x];
        }
        let topSpear = spearTopCell && (topLeftCell != topRightCell);
        // console.log(topSpear);
            
        let spearBottomCell = null;
        if (spearBottom.y < maze.row) {
            spearBottomCell = maze.grid[spearBottom.y][spearBottom.x];
        }
        let bottomSpear = spearBottomCell && (topLeftCell != topRightCell);
        
        let spearLeftCell = null;
        if (spearLeft.x >= 0) {
            spearLeftCell = maze.grid[spearLeft.y][spearLeft.x];
        }
        let leftSpear = spearLeftCell && (topLeftCell != bottomLeftCell);
        
        let spearRightCell = null;
        if (spearRight.x < maze.col) {
            spearRightCell = maze.grid[spearRight.y][spearRight.x];
        }
        let rightSpear = spearRightCell && (topRightCell != bottomRightCell);

        // These are in pixels for rendering, but converted to sizes
        // relative to the virtual cell width
        const wallWidth = 0.5 * maze.wallWidth / maze.cellWidth;
        const cellWidth = 1;
        const collisionCoefficient = 0;

        // Top
        if (
            (topLeftCell.topWall() || topRightCell.topWall() || topSpear) && (y < topLeft.y + wallWidth) 
        ) {
            this.position.y = topLeft.y + wallWidth;
            this.velocity.y *= collisionCoefficient;
        }
        // Bottom
        else if (
            (bottomLeftCell.bottomWall() || bottomRightCell.bottomWall() || bottomSpear) && (y + this.width > bottomLeft.y + cellWidth - wallWidth)
        ) {
            this.position.y = bottomLeft.y + cellWidth - wallWidth - this.width;
            this.velocity.y *= collisionCoefficient;
        }
        // Left
        if (
            (topLeftCell.leftWall() || bottomLeftCell.leftWall() || leftSpear) && (x < topLeft.x + wallWidth)
        ) {
            this.position.x = topLeft.x + wallWidth;
            this.velocity.x *= collisionCoefficient;
        }
        // Right
        else if (
            (topRightCell.rightWall() || bottomRightCell.rightWall() || rightSpear) && (x + this.width > topRight.x + cellWidth - wallWidth)
        ) {
            this.position.x = topRight.x + cellWidth - wallWidth - this.width;
            this.velocity.x *= collisionCoefficient;
        }
    }

    updatePath() {
        this.path = new Stack();
        let solution = this.breadthFirstSearch();

        let point = solution;
        while (point) {
            this.path.push(new JSVector(point.x, point.y));
            point = point.parent;
        }
    }
    
    // https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
    breadthFirstSearch() {
        let queue = new Queue();
        const maze = this.world.maze.grid;
        let visited = Array.from(new Array(maze.length), () => {
            return Array.from(new Array(maze[0].length), () => {
                return false;
            });
        });
        let position = this.position.copy();
        position.floor();
        visited[position.x][position.y] = true;
        let heroPosition = this.world.hero.mazePosition;
        heroPosition.floor();
        let goal = new Point(heroPosition.x, heroPosition.y);
        queue.enqueue(new Point(position.x, position.y));

        while (!queue.empty()) {
            let point = queue.dequeue();

            if (point.equals(goal)) {
                return point;
            }

            // Top
            if (
                point.y > 0 
                && !visited[point.y - 1][point.x] 
                && !maze[point.y][point.x].topWall()
            ) {
                visited[point.y - 1][point.x] = true;
                let neighbor = new Point(point.x, point.y - 1, point);
                queue.enqueue(neighbor);
            }

            // Bottom
            if (
                point.y < visited.length - 1 
                && !visited[point.y + 1][point.x]
                && !maze[point.y][point.x].bottomWall()
            ) {
                visited[point.y + 1][point.x] = true;
                let neighbor = new Point(point.x, point.y + 1, point);
                queue.enqueue(neighbor);
            }

            // Left
            if (
                point.x > 0 
                && !visited[point.y][point.x - 1] 
                && !maze[point.y][point.x].leftWall()
            ) {
                visited[point.y][point.x - 1] = true;
                let neighbor = new Point(point.x - 1, point.y, point);
                queue.enqueue(neighbor);
            }

            // Right
            if (
                point.x < visited[0].length - 1 
                && !visited[point.y][point.x + 1] 
                && !maze[point.y][point.x].rightWall()
            ) {
                visited[point.y][point.x + 1] = true;
                let neighbor = new Point(point.x + 1, point.y, point);
                queue.enqueue(neighbor);
            }
        }
    }

    /* Render the enemy */
    renderCenter() {
	const cellWidth = this.world.maze.cellWidth;
        const x = -0.5 * cellWidth * this.width;
        const y = -0.5 * cellWidth * this.width;
        const w = this.width * cellWidth;

	const context = this.world.context;
        context.save();
	context.translate(this.world.canvas.width / 2, this.world.canvas.height / 2);
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(x, y, w, w);
        context.restore();
    }

    renderClassic() {
	const cellWidth = this.world.maze.cellWidth;
        const x = cellWidth * this.position.x;
        const y = cellWidth * this.position.y;
        const w = this.width * cellWidth;

	const context = this.world.context;
        context.save();
	// context.translate(this.world.canvas.width / 2, this.world.canvas.height / 2);
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(x, y, w, w);
        context.restore();
    }
}

class Point {
    constructor(x, y, parent=null) {
        this.x = x;
        this.y = y;
        this.parent = parent;
    }

    equals(point) {
        return this.x === point.x &&
               this.y === point.y;
    }
}


// Enum(ish) of how the enemy moves
const PathType = Object.freeze({
    WANDER: Symbol("wander"),
    SEEK: Symbol("seek")
});
