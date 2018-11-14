let displayContainer = document.createElement("div");

let display = new Display(32, 20);
let ball = new Ball(display.w, display.h);
let paddle = new Paddle(display.w, display.h - 4);
let drawLoop, paused = true, stats;

splash();

// BEGINNING OF DRAW LOOP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function draw(timestamp) {
  stats.begin();

  const ballStatus = ball.update();
  if (ballStatus == "miss") reset();

  ball.updateVel(paddle.collide(ball));

  display.cls();
  display.appendModel(ball.model,    Math.round(ball.pos.x),    Math.round(ball.pos.y));
  display.appendModel(paddle.model, Math.round(paddle.pos.x), Math.round(paddle.pos.y));
  // display.appendModel(scoreBoard, Math.floor((display.w * 0.5) - (scoreBoard.cols * 0.5)), 0);
  display.update();

  displayContainer.innerHTML = display.el.outerHTML;

  stats.end();
  if (!paused) window.requestAnimationFrame(draw);
}
// END OF DRAW LOOP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Helper Functions:
function reset() {
  ball = new Ball(display.w, display.h);
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

function createScoreBoard(p) {
  let line = `score: ${p}`;
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
  title.innerHTML = "HTML Breakout";
  let aside = document.createElement("small");
  aside.innerHTML = "rendition by EthanThatOneKid";

  let tempContainer = document.createElement("div");
  let instructions = document.createElement("p");
  instructions.innerHTML = "Use your right and left arrow keys to move your paddle.";
  let gitHubLink = document.createElement("a");
  gitHubLink.innerHTML = "GitGub Repository";
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
  paddle.move(keyName);
});
