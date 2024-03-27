class Weapon {
    /**
     * Create a weapon
     * @param {number} damage - the amount of damage the weapon does per hit
     * @param {number} delay - the delay (in seconds) between strikes of the weapons
     * @param {number} range - the wepons range (relative to a cell)
     * @param {string} imagePath - the path of the image of the enemy
     */
    constructor(damage, delay, range, holder, imagePath) {
        // Stats
        this.damage = damage;
        this.delay = delay;
        this.range = range;
        this.holder=holder;
        this.delayTime=delay;
        // Load the image
        this.image = {image: new Image(), loaded: false};
        this.image.image.addEventListener("load", () => {
            this.image.loaded = true;
        });
        this.image.image.src = imagePath;
    }
    attack(target){//still need to check for walls
        if(((this.delayTime>=this.delay))&&target.position.distance(this.holder.position)<this.range){
            this.delayTime=0;
            target.health-=this.damage;
            return true;
        } else {
            return false;
        }
    }
}
