import Phaser from "phaser";

export function createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
}

export function createPlatforms () {
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
}

export function  collectStar(player, star) {
    star.disableBody(true, true);

    this.score +=10;

    this.scoreText.setText('Score: ' + this.score);

    if(this.stars.countActive(true) === 0) {
        this.stars.children.iterate((child) => {
            child.enableBody(true, child.x, 0, true, true)
        });

        let x = this.player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);

        let bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);

        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    }
}


export function hitBomb() {
    this.physics.pause();
    this.player.setTint(0xff0000);

    this.player.anims.play('turn');

    this.gameOver = true;
}
