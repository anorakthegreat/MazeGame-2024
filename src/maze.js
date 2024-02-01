/* A maze */
class Maze {
    constructor() {
        this.grid = [];
    }

    /**
     * Determine if the enemy can move through the maze in a certain direction
     * @param {"left"|"right"|"up"|"down"} direction - the direction of the posible move
     * @param {JSVector} point - the point the charcter is at
     * @throws {Error} if the `direction` is incorrect
     */
    canMoveInDirectionAtPont(direction, point) {
        switch (direction) {
        case "up":
            
        case "down":

        case "left":
            
        case "right":

        default:
            throw new Error("Bad direction");
        }  
    }

    /**
     * (Re)Generate a maze
     * @param {number} rows - the amount of rows the new maze will have
     * @param {number} columns - the amount of columns the new maze will have
     */
    generate(rows, columns) {}
}
