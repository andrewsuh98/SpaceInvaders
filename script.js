import Tank from "./model/Tank.js";
import Missile from "./model/Missile.js";
import Invader from "./model/Invader.js";

/**
 * Create the canvas.
 */
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

/**
 * Load the music and sound effects.
 */
const music = new Audio("./assets/music.mpeg");
const soundShoot = new Audio("./assets/shoot.wav");
const soundExplosion = new Audio("./assets/explosion.wav");

/**
 * Initialize some settings and counters.
 */
const MAX_MISSILE = 10;
const TANK_WIDTH = 50;
const TANK_HEIGHT = 50;
const TANK_BOTTOM_MARGIN = 10;
const MISSILE_WIDTH = 16;
const MISSILE_HEIGHT = 16;
const INVADER_WIDTH = 40;
const INVADER_HEIGHT = 40;
const INVADER_TOP_MARGIN = 10;
const INVADER_MAX_SPEED = 4;
const INVADER_MULTIPLIER = 100;
let killCount = 0;
let isGameOver = false;
let isGameStart = false;


/**
 * Create the Tank.
 * Initialize the array of missiles and invaders.
 */
const tank = new Tank(canvas.width / 2 - TANK_WIDTH / 2, canvas.height - TANK_HEIGHT - TANK_BOTTOM_MARGIN,
    TANK_WIDTH, TANK_HEIGHT);
const missiles = [];
const invaders = [];

/**
 * Return a random integer between 0 and max, exclusive.
 *
 * @param max the maximum integer value to return.
 * @returns {number} integer between 0 and max.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * 
 * @param e
 */
function keyDownHandler(e) {
  if (e.key === " " && (MAX_MISSILE - missiles.length && isGameStart) > 0) {
    missiles.push(new Missile(tank.x + TANK_WIDTH / 2 - MISSILE_WIDTH / 2,
        canvas.height - TANK_HEIGHT - TANK_BOTTOM_MARGIN - MISSILE_HEIGHT, MISSILE_WIDTH, MISSILE_HEIGHT))
    soundShoot.play();
    soundShoot.currentTime = 0;
  }
  if (e.key === "Enter" && !isGameStart) {
    music.play();
    isGameStart = true;
    draw();
  }
}

function collisionDetection() {
  missiles.forEach((missile) => {
    if (missile.isOutOfBounds()) {
      missiles.splice(missiles.indexOf(missile), 1);
    }
    invaders.forEach((invader) => {
      if (missile.intersects(invader)) {
        missiles.splice(missiles.indexOf(missile), 1);
        invaders.splice(invaders.indexOf(invader), 1);
        soundExplosion.play();
        soundExplosion.currentTime = 0;
        killCount++;
      }
    });
  });
}

function drawInvaders() {
  invaders.forEach((invader) => {
    invader.draw(ctx, canvas.height);
    invader.move(canvas.width);
  });
}

function drawMissiles() {
  missiles.forEach((missile) => {
    missile.draw(ctx);
    missile.move(canvas.width);
  });
}

function createRandomInvaders() {
  const random = getRandomInt(canvas.width * INVADER_MULTIPLIER);
  if (random > 0 && random < canvas.width - INVADER_WIDTH){
    invaders.push(new Invader(random, INVADER_TOP_MARGIN, INVADER_WIDTH,
        INVADER_HEIGHT, getRandomInt(INVADER_MAX_SPEED)));
  }
}

function gameOver() {
  music.pause();
  ctx.font = "50px fantasy";
  ctx.textAlign = "center";
  ctx.fillStyle = "#62d5f7";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.font = "20px fantasy";
  ctx.fillStyle = "#fbf087";
  ctx.fillText("Score: " + killCount, canvas.width / 2, canvas.height / 2 + 40);
  isGameOver = true;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tank.draw(ctx);
  tank.move(canvas.width);
  createRandomInvaders();
  collisionDetection();
  drawInvaders();
  drawMissiles();
  if (!isGameOver) {
    ctx.fillText("Invaders shot down: " + killCount, 10, 20);
    ctx.fillText("Missiles remaining: " + (MAX_MISSILE - missiles.length), 10, 40);
    window.requestAnimationFrame(draw);
  }
}

function welcomeScreen() {
  ctx.font = "20px fantasy";
  ctx.textAlign = "center";
  ctx.fillStyle = "#62d5f7";
  ctx.fillText("Press ENTER to Start Game", canvas.width / 2, canvas.height / 2);
  ctx.font = "15px Comic Sans MS";
  ctx.textAlign = "start";
  ctx.fillStyle = "#62d5f7";
}

welcomeScreen();

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("gameover", gameOver);