class Weapon {
    /**
     * Create a weapon
     * @param {number} damage - the amount of damage the weapon does per hit
     * @param {number} delay - the delay (in seconds) between strikes of the weapons
     * @param {number} range - the wepons range (relative to a cell)
     * @param {string} imagePath - the path of the image of the enemy
     */
    constructor(damage, delay, range, imagePath) {
        // Stats
        this.damage = damage;
        this.delay = delay;
        this.range = range;

        // Load the image
        this.image = {image: new Image(), loaded: false};
        this.image.image.addEventListener("load", () => {
            this.image.loaded = true;
        });
        this.image.image.src = imagePath;
    }
}
