import Tank from "./model/Tank.js";
import Missile from "./model/Missile.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const tank = new Tank(canvas.width / 2 - 25, canvas.height - 60, 50, 50);

const missile = new Missile(canvas.width / 2 - 7, canvas.height - 60, 15, 15);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tank.draw(ctx);
  tank.move(canvas.width);
  missile.draw(ctx);
  missile.move(canvas.width);
  window.requestAnimationFrame(draw);
}

draw();

//testing github configuration
