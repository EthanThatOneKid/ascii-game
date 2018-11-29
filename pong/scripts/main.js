let displayContainer = document.createElement("div");

let display = new Display(32, 20);
let puck = new Puck(display.w, display.h);
let paddleL = new Paddle("L", display.h, {x: 1, y: 1}, 1);
let paddleR = new Paddle("R", display.h, {x: 28, y: 1}, 0.5);
let scoreBoard = createScoreBoard(paddleL.wins, paddleR.wins);
let drawLoop, paused = true, stats;

splash();

// BEGINNING OF DRAW LOOP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function draw(timestamp) {
  stats.begin();

  let puckStatus = puck.update();
  if (puckStatus == "L" || puckStatus == "R") {
    if (puckStatus == "L") paddleR.score();
    else if (puckStatus == "R") paddleL.score();
    scoreBoard = createScoreBoard(paddleL.wins, paddleR.wins);
    reset();
  }

  puck.updateVel(paddleL.collide(puck));
  puck.updateVel(paddleR.collide(puck));

  paddleR.ai(puck);

  display.cls();
  display.appendModel(puck.model,    Math.round(puck.pos.x),    Math.round(puck.pos.y));
  display.appendModel(paddleL.model, Math.round(paddleL.pos.x), Math.round(paddleL.pos.y));
  display.appendModel(paddleR.model, Math.round(paddleR.pos.x), Math.round(paddleR.pos.y));
  display.appendModel(scoreBoard, Math.floor((display.w * 0.5) - (scoreBoard.cols * 0.5)), 0);
  display.update();

  displayContainer.innerHTML = display.el.outerHTML;

  stats.end();
  if (!paused) window.requestAnimationFrame(draw);
}
// END OF DRAW LOOP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Helper Functions:
function reset() {
  puck = new Puck(display.w, display.h);
}

function pause() {
  paused = true;
  window.cancelAnimationFrame(drawLoop);
}

function resume() {
  if (paused) {
    paused = false;
    drawLoop = window.requestAnimationFrame(draw);
  }
}

function createScoreBoard(p1, p2) {
  let line = `${p1} | ${p2}`;
  return new Model([line.split("")]);
}

function init() {
  document.body.appendChild(displayContainer);

  let playButton = document.createElement("button");
  playButton.innerHTML = ">";
  playButton.onclick = resume;

  let pauseButton = document.createElement("button");
  pauseButton.innerHTML = "||";
  pauseButton.onclick = pause;

  document.body.appendChild(playButton);
  document.body.appendChild(pauseButton);

  stats = new Stats();
  stats.dom.style.top = stats.dom.style.left = "";
  stats.dom.style.bottom = stats.dom.style.right = "0";
  document.body.appendChild(stats.dom);
  resume();
}

function splash() {
  let splashContainer = document.createElement("div");
  let title = document.createElement("h1");
  title.innerHTML = "HTML Pong";
  let aside = document.createElement("small");
  aside.innerHTML = "rendition by EthanThatOneKid";

  let tempContainer = document.createElement("div");
  let instructions = document.createElement("p");
  instructions.innerHTML = "Use your up and down arrow keys to move your paddle.";
  let gitHubLink = document.createElement("a");
  gitHubLink.innerHTML = "GitHub Repository";
  gitHubLink.href = "https://github.com/EthanThatOneKid/ascii";
  let beginButton = document.createElement("button");
  beginButton.innerHTML = "BEGIN";
  beginButton.onclick = () => {
    tempContainer.style.display = "none";
    init();
  }

  splashContainer.appendChild(title);
  splashContainer.appendChild(aside);

  tempContainer.appendChild(instructions);
  tempContainer.appendChild(gitHubLink);
  tempContainer.appendChild(document.createElement("br"));
  tempContainer.appendChild(beginButton);

  document.body.appendChild(splashContainer);
  document.body.appendChild(tempContainer);
}

document.addEventListener("keydown", event => {
  const keyName = event.key;
  paddleL.move(keyName);
});
