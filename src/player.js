/**
 * Player - a super class for characters, enemies, and who knows what else
 */
class Player {
    /**
     * Player constructor
     * @param {World} world - the world the player belongs to
     * @param {JSVector} position - the character's position in the maze
     * @param {number} width - the character's width (1 is the size of a maze cell)
     * @param {number} [maxHealth=100] - the character's max health
     */
    constructor(world, position, width, maxHealth=100) {
        /* @type {World} */
        this.world = world;

        /* @type {JSVector} */
        this.position = position;

        /* @type {number} */
        this.width = width;

        /* @type {number} */
        this.maxHealth = maxHealth;

        /* @type {number} */
        this.health = maxHealth;
    }
}
