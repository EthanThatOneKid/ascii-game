let display = new Display(32, 20);

let displayContainer = document.createElement("div");
document.body.appendChild(displayContainer);

let puck = new Puck(display.w, display.h);;
let paddleL = new Paddle("L", display.h, {x: 2, y: 1});
let paddleR = new Paddle("R", display.h, {x: 27, y: 1});

window.requestAnimationFrame(draw);

function draw(timestamp) {

  let puckStatus = puck.update();
  switch(puckStatus) {
    case "L":
      paddleR.score();
      reset();
      break;
    case "R":
      paddleL.score();
      reset();
      break;
    default: break;
  }

  puck.updateVel(paddleL.collide(puck));

  display.cls();
  display.appendModel(puck.model,    Math.round(puck.pos.x),    Math.round(puck.pos.y));
  display.appendModel(paddleL.model, Math.round(paddleL.pos.x), Math.round(paddleL.pos.y));
  display.appendModel(paddleR.model, Math.round(paddleR.pos.x), Math.round(paddleR.pos.y));
  display.update();

  displayContainer.innerHTML = display.el.outerHTML;

  window.requestAnimationFrame(draw);

}

function reset() {
  puck = new Puck(display.w, display.h);
}

document.addEventListener("keydown", event => {
  const keyName = event.key;
  paddleL.move(keyName);
});
