import Tank from "./model/Tank.js";
import Missile from "./model/Missile.js";
import Invader from "./model/Invader.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const tank = new Tank(canvas.width / 2 - 25, canvas.height - 60, 50, 50);

//const missile = new Missile(canvas.width / 2 - 7, canvas.height - 60, 15, 15);

const invader = new Invader(canvas.width / 2 - 20, 60, 40, 40);

const missiles = [];
//document.addEventListener("keyup", this.keyUpHandler.bind(this));

function keyDownHandler(e) {
  if (e.key === " ") {
    missiles.push(new Missile(tank.x + 25 - 8, canvas.height - 60 - 16, 16, 16))
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tank.draw(ctx);
  tank.move(canvas.width);
  missiles.forEach((missile) => {
    missile.draw(ctx);
    missile.move(canvas.width);
  });
  invader.draw(ctx);
  invader.move(canvas.width);
  window.requestAnimationFrame(draw);
}

draw();
document.addEventListener("keydown", keyDownHandler);