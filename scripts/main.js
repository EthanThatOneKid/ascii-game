let display = new Display(10, 10);

let displayContainer = document.createElement("div");
document.body.appendChild(displayContainer);

let puck = {
  model: new Model([["O"]]),
  pos: {x: 1, y: 1},
  vel: {x: 0.01, y: 0}
};

// Make Paddle Class and include it in the hmtl
// This way, I can organize my collision functions in one spot as methods

window.requestAnimationFrame(draw);

function draw(timestamp) {

  if (puck.pos.x >= display.w - 1 || puck.pos.x < 1) puck.vel.x *= -1;
  if (puck.pos.y >= display.h - 1 || puck.pos.y < 1) puck.vel.y *= -1;
  puck.pos.x += puck.vel.x;
  puck.pos.y += puck.vel.y;

  display.cls();
  display.appendModel(puck.model, Math.round(puck.pos.x), Math.round(puck.pos.y));
  display.update();

  displayContainer.innerHTML = display.el.outerHTML;

  window.requestAnimationFrame(draw);

}

/*
let paddleL = {
  model: new Model([
    ["+", "-", "+"],
    ["|", " ", "|"],
    ["|", " ", "|"],
    ["+", "-", "+"]
  ]),
  pos: {x: 1, y: 1}
}

let paddleR = {
  model: new Model([
    ["+", "-", "+"],
    ["|", " ", "|"],
    ["|", " ", "|"],
    ["+", "-", "+"]
  ]),
  pos: {x: 6, y: 1}
}
*/
