import Phaser from 'phaser';
import {createPlayer, createPlatforms, collectStar, hitBomb} from './utils';
import './index.scss';

class OnionJumper extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.player = null;
        this.platforms = null;
        this.cursors = null;
        this.stars = null;
        this.bombs = null;

        this.score = 0;
        this.scoreText = null;
        this.gameOver = false;

        this.createPlayer = createPlayer;
        this.createPlatforms = createPlatforms;
        this.collectStar = collectStar;
        this.hitBomb = hitBomb;
    }

    preload () {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet(
            'dude',
            'assets/dude.png',
            {
                frameWidth: 32,
                frameHeight: 48
            }
        );
    }

    create () {
        this.add.image(400, 300, 'sky');

        this.createPlatforms();
        this.createPlayer();

        this.physics.add.collider(this.player, this.platforms);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {
                x: 12, y: 0, stepX: 70
            }
        });

        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#000'
        });

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update () {
        this.cursors = this.input.keyboard.createCursorKeys();

        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if(this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if(this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: OnionJumper
};

const game = new Phaser.Game(config);

let player;
let platforms;
let cursors;
let stars;
let bombs;

let score = 0;
let scoreText;
let gameOver = false;


