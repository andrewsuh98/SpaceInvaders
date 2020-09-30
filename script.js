import Tank from "./model/Tank.js";
import Missile from "./model/Missile.js";
import Invader from "./model/Invader.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const tank = new Tank(canvas.width / 2 - 25, canvas.height - 60, 50, 50);
const missiles = [];
const invaders = [];

const maxMissile = 10;
let killCount = 0;

let isGameOver = false;
let isGameStart = false;

const music = new Audio("./assets/music.mpeg");
const soundShoot = new Audio("./assets/shoot.wav");
const soundExplosion = new Audio("./assets/explosion.wav");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function keyDownHandler(e) {
  if (e.key === " " && (maxMissile - missiles.length && isGameStart) > 0) {
    missiles.push(new Missile(tank.x + 25 - 8, canvas.height - 60 - 16, 16, 16))
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
  const random = getRandomInt(canvas.width * 100);
  if (random > 0 && random < canvas.width - 40){
    invaders.push(new Invader(random, 0, 40, 40, getRandomInt(4)));
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
    ctx.fillText("Missiles remaining: " + (maxMissile - missiles.length), 10, 40);
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