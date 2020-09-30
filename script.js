import Tank from "./model/Tank.js";
import Missile from "./model/Missile.js";
import Invader from "./model/Invader.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "15px Comic Sans MS";
ctx.fillStyle = "#62d5f7";

const tank = new Tank(canvas.width / 2 - 25, canvas.height - 60, 50, 50);
const missiles = [];
const invaders = [];

let missileCount = 10;
let killCount = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function keyDownHandler(e) {
  if (e.key === " ") {
    missiles.push(new Missile(tank.x + 25 - 8, canvas.height - 60 - 16, 16, 16))
  }
}

function collisionDetection() {
  missiles.forEach((missile) => {
    invaders.forEach((invader) => {
      if (missile.intersects(invader)) {
        missiles.splice(missiles.indexOf(missile), 1);
        invaders.splice(invaders.indexOf(invader), 1);
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tank.draw(ctx);
  tank.move(canvas.width);
  createRandomInvaders();
  collisionDetection();
  drawInvaders();
  drawMissiles();
  ctx.fillText("Invaders shot down: " + killCount, 10, 20);
  ctx.fillText("Missiles remaining: " + missileCount, 10, 40);
  window.requestAnimationFrame(draw);
}

draw();

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("gameover", (e) => {
  window.alert("Game Over!");
});

// TODO: The tank has an ammunition supply of 10 missiles.
//  However, it gets a new missile as soon as a previously
//  fired one hits an invader or leaves the canvas (from the top).

// TODO: On the canvas, top left corner, you must display the number
//  of missiles remaining as well as the number of invaders shot down.

// TODO: You must display a "game over" message on canvas when game is over.