import Tank from "./model/Tank.js";
import Missile from "./model/Missile.js";
import Invader from "./model/Invader.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const tank = new Tank(canvas.width / 2 - 25, canvas.height - 60, 50, 50);

//const testMissile = new Missile(canvas.width / 2 - 25, canvas.height - 60, 50, 50);

const missiles = [];

const invaders = [];
invaders.push(new Invader(canvas.width / 2 - 20, 60, 40, 40)); // TODO remove

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
      }
    });
  });
}

function drawInvaders() {
  invaders.forEach((invader) => {
    invader.draw(ctx);
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
    invaders.push(new Invader(random, 0, 40, 40))
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
  window.requestAnimationFrame(draw);
}

draw();
document.addEventListener("keydown", keyDownHandler);