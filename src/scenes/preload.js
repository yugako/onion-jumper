export function preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.spritesheet(
        'dude',
        'assets/dude.png',
        {
            frameWidth: 32,
            frameHeight: 48
        }
    );
}
