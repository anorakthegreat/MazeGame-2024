/* A maze */
class Maze {
    constructor(world) {
	/* @type {Cell[][]} */
        this.grid = [];

	/* @type {World} */
        this.world = world;

	/* @type {number} */
	this.wallWidthPerCell = 0; // Like css padding if the
				     // padding is the wall and the
				     // element is the path
    }

    /**
     * Determine if the enemy can move through the maze in a certain direction
     * @param {"left"|"right"|"up"|"down"} direction - the direction of the posible move
     * @param {JSVector} point - the point the charcter is at
     */
    canMoveInDirectionAtPont(direction, point) {
	switch (direction) {
        case "up":
            break;
        case "down":
            break;
        case "left":
            break;
        case "right":
            break;
        default:
            throw new Error("Invalid direction");
        }
    }

    /**
     * Get the cell a vector sits upon
     * @param {JSVector} position - the position of the character/object
     * @return {Cell} the cell the vector is on top of
     */
    getCellAtPosition(position) {
	const row = Math.floor(position.y);
	const column = Math.floor(position.x);
	return this.grid[row][column];
    }

    /**
     * (Re)Generate a maze
     * @param {number} rows - the amount of rows the new maze will have
     * @param {number} columns - the amount of columns the new maze will have
     */
    generate(rows, columns) {
        // Create an empty maze
        this.grid = [];
        for (let row = 0; row < rows; ++row) {
            this.grid[row] = [];
            for (let column = 0; column < columns; ++column) {
                this.grid[row][column] = new Cell(row, column, this);
            }
        }

        // Create the walls (Randomized depth-first search)
        // https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation_(with_stack)
        
        // Initialize stack with the first cell
        let stack = [];
        this.grid[0][0].visited = true;
        stack.push(this.grid[0][0]);

        while (stack.length > 0) {
            // Get current cell
            let cell = stack.pop();

            // Find neighbors that haven't been visited
            const possibleDirections = [];
            if (cell.row > 0 &&
                    !this.grid[cell.row - 1][cell.column].visited) {
                possibleDirections.push("top");
            }
            if (cell.row < rows - 1 &&
                    !this.grid[cell.row + 1][cell.column].visited) {
                possibleDirections.push("bottom");
            }
            if (cell.column > 0 &&
                    !this.grid[cell.row][cell.column - 1].visited) {
                possibleDirections.push("left");
            }
            if (cell.column < columns - 1 &&
                    !this.grid[cell.row][cell.column + 1].visited) {
                possibleDirections.push("right");
            }

            // If there are not neighbors to visit, continue to pop
            // the next item from the stack
            if (possibleDirections.length == 0)
                continue;

            // Push the current cell back on to the stack
            stack.push(cell);

            // Get a random direction
            const randomIndex = Math.floor(Math.random() * possibleDirections.length);
            const randomDirection = possibleDirections[randomIndex];

            // Remove the wall between the cell and it's neighbor,
            // mark the chosen cell as visited, then push it on to the stack
            let neighbor;
            switch (randomDirection) {
            case "top":
                neighbor = this.grid[cell.row - 1][cell.column];
                cell.walls.top = false;
                neighbor.walls.bottom = false;
                break;
            case "bottom":
                neighbor = this.grid[cell.row + 1][cell.column];
                cell.walls.bottom = false;
                neighbor.walls.top = false;
                break;
            case "left":
                neighbor = this.grid[cell.row][cell.column - 1];
                cell.walls.left = false;
                neighbor.walls.right = false;
                break;
            case "right":
                neighbor = this.grid[cell.row][cell.column + 1];
                cell.walls.right = false;
                neighbor.walls.left = false;
                break;
            default:
                throw new Error("Invalid direction");
            }
            neighbor.visited = true;
            stack.push(neighbor);
        }
    }

    render() {
        const context = this.world.context;
        const player = this.world.player;
        const rows = this.grid.length;
        const columns = this.grid[0].length;

        const blockWidth = 100; // pixels
        const verticalBlocks = this.world.canvas.height / blockWidth;
        const horizontalBlocks = this.world.canvas.width / blockWidth;

        context.save();
        context.translate(this.world.canvas.width / 2, this.world.canvas.height / 2);

        // Render each cell
        for (let row = 0; row < rows; ++row) {
            for(let column = 0; column < columns; ++column) {
                const y = Math.floor((row - player.position.y - 0.5) * blockWidth);
                const x = Math.floor((column - player.position.x - 0.5) * blockWidth);
                // Draw rectangle
                context.fillStyle = "red";
                context.fillRect(x, y, blockWidth, blockWidth);
                // Draw walls
                const cell = this.grid[row][column];
                const xEnd = x + blockWidth;
                const yEnd = y + blockWidth;
                context.strokeStyle = "black";
                context.beginPath();
                if (cell.walls.top) {
                    context.moveTo(x, y);
                    context.lineTo(xEnd, y);
                }
                if (cell.walls.bottom) {
                    context.moveTo(x, yEnd);
                    context.lineTo(xEnd, yEnd)
                }
                if (cell.walls.left) {
                    context.moveTo(x, y);
                    context.lineTo(x, yEnd);
                }
                if (cell.walls.right) {
                    context.moveTo(xEnd, y);
                    context.lineTo(xEnd, yEnd);
                }
                context.stroke();
                context.closePath();
            }
        }

        // Render the player
        const y = -0.5 * blockWidth * player.width;
        const x = -0.5 * blockWidth * player.width;
        const width = (blockWidth * player.width);
        context.fillStyle = "green";
        context.fillRect(x, y, width, width);
        context.strokeRect(x, y, width, width);
        
        context.restore();
    }
}

class Cell {
   constructor(row, column, maze) {
        this.row = row;
        this.column = column;
        this.maze = maze;
        this.visited = false;
        this.walls = {top: true, bottom: true, left: true, right: true};
    }
}
