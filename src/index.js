import Phaser from 'phaser';
import {
    createPlayer,
    createPlatforms,
    collectStar,
    hitBomb,
    handleLifes,
    drawStars,
    createBomb,
    drawScore
} from './utils';
import './index.scss';
import {preload} from "./scenes/preload";
import {handleMovement} from "./utils/movement";
import {setColliders} from "./scenes/colliders";

class OnionJumper extends Phaser.Scene {
    constructor(config) {
        super(config);

        this.lifesCount = 2;

        this.score = 0;
        this.scoreText = null;
        this.gameOver = false;

        this.preload = preload;
        this.createPlayer = createPlayer;
        this.createPlatforms = createPlatforms;
        this.collectStar = collectStar;
        this.hitBomb = hitBomb;
        this.handleLifes = handleLifes;
        this.handleMovement = handleMovement;
        this.setColliders = setColliders;
        this.drawStars = drawStars;
        this.createBomb = createBomb;
        this.drawScore = drawScore;
    }

    create () {
        this.add.image(400, 300, 'sky').setScale(1.5);
        this.add.image(1000, 300, 'sky').setScale(1.5);

        this.createPlatforms();
        this.createPlayer();

        this.drawStars();

        this.drawScore();

        this.bombs = this.physics.add.group();

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.handleLifes();
        this.setColliders();
    }

    update() {
        this.handleMovement();
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.screen.width,
    height: window.screen.height,
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
