class Weapon {
    /**
     * Create a weapon
     * @param {number} damage - the amount of damage the weapon does per hit
     * @param {number} delay - the delay (in seconds) between strikes of the weapons
     * @param {number} range - the wepons range (relative to a cell)
     * @param {string} imagePath - the path of the image of the enemy
     */
    constructor(damage, delay, range, holder, name, imagePath) {
        // Stats
        this.damage = damage;
        this.delay = delay;
        this.range = range;
        this.holder=holder;
        this.name=name;
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
            console.log(`${this.holder.constructor.name} hit ${target.constructor.name} at ${Date.now()}`);
            return true;
        } else {
            return false;
        }
    }
    render(){
        let ctx=world.context;
        ctx.drawImage(this.image.image, this.holder.position.x-30, this.holder.position.y-15,25,25);
    }
}
