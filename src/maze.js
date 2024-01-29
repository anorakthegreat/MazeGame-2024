/* A maze */
class Maze {
    constructor() {
        this.grid = [];
    }

    /* A cell int the maze */
    Cell = class Cell {
        constructor(type) {
            this.type = type;
            this.item = null;
        }
        
        /* Acts like an enum */
        Type = Object.freeze({
            PATH: Symbol("PATH"),
            WALL: Symbol("WALL")
        });
        
    }
    
    /**
     * (Re)Generate a maze
     * @param {number} rows - the amount of rows the new maze will have
     * @param {number} columns - the amount of columns the new maze will have
     * @return {void} this function doesn't return anything
     */
    generate(rows, columns) {
        // Hard-coded maze for now; (Thanks, Bard)
        const hardCodedMaze = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        rows = hardCodedMaze.length;
        columns = hardCodedMaze[0].length;
        this.grid = [];
        for (let row = 0; i < rows; ++i) {
            this.grid[row] = [];
            for (let column = 0; i < columns; ++i) {
                const type = (hardCodedMaze[row][column] == 1)
                      ? Cell.Type.WALL
                      : Cell.Type.PATH;
                this.grid[row][column] = new Cell(type);
            }
        }
    }
}
