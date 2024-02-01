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
        this.radius = 0.25;

        /* @type {JSVector[]} but should be treaded like a stack */
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
        let currentTile = this.position.copy();
        currentTile.floor();
        
        
    }
}
