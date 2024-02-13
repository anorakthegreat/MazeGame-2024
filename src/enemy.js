/**
 * The enemy in the maze game
 */
class Enemy {
    /**
     * Create an enemy
     * @param {World} world - the world that the enemy belongs to
     * @param {JSVector} initialPosition - the enemy's intial position in the maze
     */
    constructor(world, intialPosition) {
        /* @type {World} */
        this.world = world;

        /* @type {JSVector} */
        this.position = initialPosition.copy();

        /* @type {number} */
        this.width = 0.25;

        /* @type {JSVector[]} */
        this.path = [];

        /**
         * @type {"wander"|"seek"}
         * "wander" = wandering around
         * "seek" = seek the player
         */
        this.pathType = "wander";
    }

    /* Run the enemy (once per frame) */
    run() {}

    /* Update the enemy's position */
    update() {
        if (this.pathType == "wander") {}
        else if (this.pathType == "seek") {}
        else {
            throw new Error(`pathType has an invalid value: ${this.pathType}`);
        }
        const currentTile = this.position.copy();
        currentTile.floor();
        
    }

    /* Check the walls of the maze for collisions */
    checkWalls() {
        const actualY = this.position.y;
        const actualX = this.position.x;
        const cellY = Math.floor(actualY + 0.5);
        const cellX = Math.floor(actualX + 0.5);
        const maze = this.world.maze;
        const cell = maze.grid[cellY][cellX];

        const wallWidth = maze.wallWidth;
        const cellWidth = 1;

        // Top
        if (cell.topWall() && (actualY < cellY + wallWidth)) {
            this.position.y = cellY + wallWidth;
        }
        // Bottom
        else if (cell.bottomWall() && (actualY + this.width > cellY + cellWidth - wallWidth)) {
            this.position.y = cellY + cellWidth - wallWidth - this.width;
        }
        // Left
        if (cell.leftWall() && (actualX < cellX + wallWidth)) {
            this.position.x = cellX + wallWidth;
        }
        // Right
        else if (cell.rightWall() && (actualY + this.width > cellX + cellWidth - wallWidth)) {
            this.position.x = cellX + cellWidth - wallWidth - this.width;
        }
    }

    updatePath() {
        this.path = [];
        let solution = breadthFirstSearch();

        let point = solution;
        while (point !== null) {
            path.push(point);
            point = point.parent;
        }
    }
    
    // https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
    breadthFirstSearch() {
        let queue = new Queue();
        let visited = Array.from(new Array(this.world.maze.length), () => {
            return Array.from(new Array(this.world.maze[0].length), () => {
                return false;
            });
        });
        visited[0][0] = true;
        let heroPosition = this.world.hero.position;
        heroPosition.floor();
        let goal = new Point(heroPosition.x, heroPosition.y);

        while (!queue.empty()) {
            let point = queue.pop();

            if (point.equals(goal))
                return point;

            // Top
            if (
                point.y > 0 
                && !visited[point.y - 1][point.x] 
                && !maze[point.y - 1][point.x].topWall()
            ) {
                visited[point.y - 1][point.x] = true;
                let neighbor = new Point(point.x, point.y - 1, point);
                queue.push(neighbor);
            }

            // Bottom
            if (
                point.y < visited.length - 1 
                && !visited[point.y + 1][point.x] 
                    && !maze[point.y + 1][point.x].bottomWall()
            ) {
                visited[point.y + 1][point.x] = true;
                let neighbor = new Point(point.x, point.y + 1, point);
                queue.push(neighbor);
            }

            // Left
            if (
                point.x > 0 
                && !visited[point.y][point.x - 1] 
                && !maze[point.y][point.x - 1].leftWall()
            ) {
                visited[point.y][point.x - 1] = true;
                let neighbor = new Point(point.x - 1, point.y, point);
                queue.push(neighbor);
            }

            // Right
            if (
                point.x < visited[0].length - 1 
                && !visited[point.y][point.x + 1] 
                && !maze[point.y][point.x + 1].rightWall()
            ) {
                visited[point.y][point.x + 1] = true;
                let neighbor = new Point(point.x + 1, point.y, point);
                queue.push(neighbor);
            }
        }
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


// Interesting JS queueueueue implementation
// https://www.geeksforgeeks.org/implementation-queue-javascript/
class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }
    
    enqueue(item) {
        this.items[this.backIndex++] = item;
    }
    
    dequeue() {
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex++];
        return item;
    }
}
