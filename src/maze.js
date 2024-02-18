/* A maze */
class Maze {
    constructor(world, row, col) {
        this.row = row;// num of rows in the maze 
        this.col = col;// num of cols in the maze 
        this.world = world;
        // width of the square cells 
        this.cellWidth = this.world.canvas.width / 10;
        //width of the walls
        this.wallWidth = 5;
        // array for all the cells 
        this.grid = [];
        for (let r = 0; r < this.row; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.col; c++) {
                this.grid[r][c] = new Cell(this.world, r, c, this.cellWidth, this.wallWidth);
            }
        }

        // Load images
        this.images = {};
        this.loadImages();
        
        // keep track of cells visited 
        this.path = [];
        // begin mazeGen before rendering 
        this.explore(0, 0);
    }

    explore(r, c) {
        this.grid[r][c].visited = true;
        // make array of available places to move to next 
        let goTo = this.checkNeighbors(r, c);
        // if there are cells to continue exploring 
        if (goTo.length > 0) {
            // add current cell to the path
            this.path.push(this.grid[r][c]);
            // choose one to go to 
            let go = Math.floor(Math.random() * goTo.length);
            let newCell = goTo[go];
            // remove walls between the cells 
            this.removeWalls(r, c, newCell.row, newCell.col);
            // explore to new cell 
            this.explore(newCell.row, newCell.col);
        }
        else if (this.path.length > 0) {
            // remove last cell visited from path because you're starting backtracking 
            let nextCell = this.path.pop();
            this.explore(nextCell.row, nextCell.col);
        }
        else {
            return;
        }
    }

    removeWalls(currentRow, currentCol, newRow, newCol) {
        // if top neighbor, remove top wall of current and bottom wall of new 
        if (currentRow > newRow && currentCol === newCol){
            this.grid[currentRow][currentCol].walls[0] = false;
            this.grid[newRow][newCol].walls[2] = false;
        }
        // if right neighbor, remove right wall of current and left wall of new 
        if (currentRow === newRow && currentCol < newCol){
            this.grid[currentRow][currentCol].walls[1] = false;
            this.grid[newRow][newCol].walls[3] = false;
        }
        // if bottom neighbor, remove bottom wall of current and top wall of new 
        if (currentRow < newRow && currentCol === newCol){
            this.grid[currentRow][currentCol].walls[2] = false;
            this.grid[newRow][newCol].walls[0] = false;
        }
        // if left neighbor, remove left wall of current and right wall of new 
        if (currentRow === newRow && currentCol > newCol){
            this.grid[currentRow][currentCol].walls[3] = false;
            this.grid[newRow][newCol].walls[1] = false;
        }
    }

    checkNeighbors(r, c) {
        let goTo = [];
        // if the cell is a wall, don't add those neighbors to the next place to go 
        if (r !== 0) {// if cell is at the top row 
            let topNeighbor = this.grid[r - 1][c];
            if (!topNeighbor.visited && topNeighbor.walls[0]) {
                goTo.push(topNeighbor);
            }
        }// if cell is on the right-most column 
        if (c !== this.grid[0].length - 1) {
            let rightNeighbor = this.grid[r][c + 1];
            if (!rightNeighbor.visited && rightNeighbor.walls[1]) {
                goTo.push(rightNeighbor);
            }
        }// if cell is at the bottom row 
        if (r !== this.grid.length - 1) {
            let bottomNeighbor = this.grid[r + 1][c];
            if (!bottomNeighbor.visited && bottomNeighbor.walls[2]) {
                goTo.push(bottomNeighbor);
            }
        }// if cell is on the left-most column 
        if (c !== 0) {
            let leftNeighbor = this.grid[r][c - 1];
            if (!leftNeighbor.visited && leftNeighbor.walls[3]) {
                goTo.push(leftNeighbor);
            }
        }
        return goTo;
    }

    loadImages() {
        this.images["coral"] = {image: new Image(), loaded: false};
        this.images["coral"].image.addEventListener("load", () => {
            this.images["coral"].loaded = true;
        });
        this.images["coral"].image.src = "./resources/coral.jpg";
    }

    // Set the proper luminance for each cell with a breadth-first search
    setCellLuminances() {
        const Point = class Point {
            constructor(x, y, parent=null) {
                this.x = x;
                this.y = y;
                this.parent = parent;
            }

            pathLength() {
                let length = 0;
                let point = this;
                while (point) {
                    ++length;
                    point = point.parent;
                }
                return length;
            }

            equals(point) {
                return this.x === point.x &&
                    this.y === point.y;
            }
        }

        const maxDistance = 3; // Up to two neighbors can be iluminated
        const queue = new Queue();
        const maze = this.grid;
        let visited = Array.from(new Array(maze.length), () => {
            return Array.from(new Array(maze[0].length), () => {
                return false;
            });
        });
        const hero = this.world.enemies[0];
        const centerCell = hero.position.copy(); // TEMPORARY
        centerCell.add(new JSVector(hero.width * 0.5, hero.width * 0.5));
        centerCell.floor();

        queue.enqueue(new Point(centerCell.x, centerCell.y));
        visited[centerCell.y][centerCell.x] = true;
        
        while (!queue.empty()) {
            const cell = queue.dequeue();

            const distance = cell.pathLength();
            if (distance <= maxDistance) {
                maze[cell.y][cell.x].luminance = 1 - distance / (maxDistance + 1);
                console.log(cell.y, cell.x, maze[cell.y][cell.x].luminance);
            } else {
                continue;
            }

            // Top
            if (
                cell.y > 0 
                && !visited[cell.y - 1][cell.x] 
                && !maze[cell.y][cell.x].topWall()
            ) {
                visited[cell.y - 1][cell.x] = true;
                let neighbor = new Point(cell.x, cell.y - 1, cell);
                queue.enqueue(neighbor);
            }

            // Bottom
            if (
                cell.y < visited.length - 1 
                && !visited[cell.y + 1][cell.x]
                && !maze[cell.y][cell.x].bottomWall()
            ) {
                visited[cell.y + 1][cell.x] = true;
                let neighbor = new Point(cell.x, cell.y + 1, cell);
                queue.enqueue(neighbor);
            }

            // Left
            if (
                cell.x > 0 
                && !visited[cell.y][cell.x - 1] 
                && !maze[cell.y][cell.x].leftWall()
            ) {
                visited[cell.y][cell.x - 1] = true;
                let neighbor = new Point(cell.x - 1, cell.y, cell);
                queue.enqueue(neighbor);
            }

            // Right
            if (
                cell.x < visited[0].length - 1 
                && !visited[cell.y][cell.x + 1] 
                && !maze[cell.y][cell.x].rightWall()
            ) {
                visited[cell.y][cell.x + 1] = true;
                let neighbor = new Point(cell.x + 1, cell.y, cell);
                queue.enqueue(neighbor);
            }

            // Add the nei
            
        }
    }
    
    render() {
        this.setCellLuminances();
        // render cells 
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                this.grid[r][c].render();
            }
        }
    }

}
