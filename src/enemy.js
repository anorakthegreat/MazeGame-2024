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

        /* @type {JSVector} */
        this.position = initialPosition.copy();
        this.velocity = new JSVector();
        this.acceleration = new JSVector();

        /* @type {number} */
        this.width = 0.5;

        /* @type {Queue<JSVector>} */
        this.path = new Queue();

        /**
         * @type {"wander"|"seek"}
         * "wander" = wandering around
         * "seek" = seek the player
         */
        this.pathType = "seek";

        this.updatePath();
    }

    /* Run the enemy (once per frame) */
    run() {
        this.update();
        this.render();
    }

    /* Update the enemy's position */
    update() {
        let currentCell = this.position.copy();
        currentCell.floor();

        while (true) {
            if (this.pathType == "wander") {break;}
            else if (this.pathType == "seek") {
                // TODO: make a new path (I will need a moving hero
                // for this)
                if (this.path.empty())
                    throw new Error("No new path to follow");
                
                // Make the target the new cell in the path
                let target = this.path.peek();
                // Update target, if necessary
                if (currentCell.equals(target)) {
                    this.path.pop();
                    if (this.path.empty())
                        throw new Error("No new path to follow");

                    target = this.path.peek();
                }
                // Seek the center of the target cell
                const targetCell = target.copy();
                targetCell.add(new JSVector(0.5 * (1 - this.width), 0.5 * (1 - this.width)));
                this.seek(targetCell);
                break;
            }
            else {
                throw new Error(`pathType has an invalid value: ${this.pathType}`);
            }
        }

        // Update the enemy's position
        this.velocity.add(this.acceleration);
        this.velocity.limit(0.05);
        this.position.add(this.velocity);

        this.checkWalls();
    }

    /**
     * Seek a position
     * @param {JSVector} position - this position to seek
     */
    seek(position) {
        this.acceleration = position.copy();
        this.acceleration.sub(this.position);
        this.acceleration.setMagnitude(0.005);
    }

    /* Check the walls of the maze for collisions */
    checkWalls() {
        const y = this.position.y;
        const x = this.position.x;
        const cellY = Math.floor(y + 0.5 * this.width); // The cell
        const cellX = Math.floor(x + 0.5 * this.width); // the center
                                                        // of the
                                                        // enemy is on
        const maze = this.world.maze;
        const cell = maze.grid[cellY][cellX];

        // These are in pixels for rendering
        const wallWidth = 0.5 * maze.wallWidth / maze.cellWidth;
        const cellWidth = 1;
        const collisionCoefficient = -0.5;

        // Top
        if (
            cell.topWall() && (y < cellY + wallWidth)
        ) {
            this.position.y = cellY + wallWidth;
            this.velocity.y *= collisionCoefficient;
        }
        // Bottom
        else if (
            cell.bottomWall() && (y + this.width > cellY + cellWidth - wallWidth)
        ) {
            this.position.y = cellY + cellWidth - wallWidth - this.width;
            this.velocity.y *= collisionCoefficient;
        }
        // Left
        if (
            cell.leftWall() && (x < cellX + wallWidth)
        ) {
            this.position.x = cellX + wallWidth;
            this.velocity.x *= collisionCoefficient;
        }
        // Right
        else if (
            cell.rightWall() && (x + this.width > cellX + cellWidth - wallWidth)
        ) {
            this.position.x = cellX + cellWidth - wallWidth - this.width;
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
    render() {
        const ctx = this.world.context;
        const cellWidth = this.world.maze.cellWidth;
        const wallWidth = this.world.maze.wallWidth / 2;
        const x = this.position.x * cellWidth;
        const y = this.position.y * cellWidth;
        const w = this.width * cellWidth;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, w, w);
        ctx.restore();

        ctx.save();
        for (const point of this.path) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(point.x * cellWidth + wallWidth,
                         point.y * cellWidth + wallWidth,
                         cellWidth - wallWidth,
                         cellWidth - wallWidth);
        }
        ctx.restore();
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


