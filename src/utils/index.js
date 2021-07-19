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

    this.platforms.create(400, window.screen.height - 125, 'ground').setScale(2).refreshBody();
    this.platforms.create(800, window.screen.height - 125, 'ground').setScale(2).refreshBody();
    this.platforms.create(1200, window.screen.height - 125, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(400, 550, 'ground');
    this.platforms.create(1100, 450, 'ground');
    this.platforms.create(800, 650, 'ground');
    this.platforms.create(1400, 600, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
}

export function collectStar(player, star) {
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

        createBomb(this.bombs);
    }
}


export function hitBomb() {
    if (this.lifesCount > 0) {
        this.lifesCount = this.lifesCount - 1;

        this.lifes.remove(this.lifes.getLast(true), true);
    } else {
        this.lifes.remove(this.lifes.getLast(true), true);
        this.physics.pause();
        this.player.setTint(0xff0000);

        this.player.anims.play('turn');

        this.gameOver = true;
    }
}

export function handleLifes() {
    this.lifes = this.physics.add.staticGroup({
        key: 'heart',
        repeat: this.lifesCount,
        setXY: {
            x: window.screen.width - 150, y: 32, stepX: 50
        }
    });

    this.lifes.children.iterate(life => {
        life.setScale(0.25);
    })
}

export function drawStars() {
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 21,
        setXY: {
            x: 12, y: 0, stepX: 70
        }
    });

    this.stars.children.iterate((star) => {
        star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
}

export function createBomb(bombs) {
    let bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);

    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
}

export function drawScore() {
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#000'
    });
}
