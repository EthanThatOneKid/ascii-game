let displayContainer = document.createElement("div");

let bounds = {x: 32, y: 20};
let display = new Display(bounds.x, bounds.y);
let snake = new Snake(1, 1, bounds);
let foods = new Foods(bounds);
let scoreBoard = createScoreBoard(snake.score);
let drawLoop, paused = true, stats;

splash();

// BEGINNING OF DRAW LOOP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function draw(timestamp) {
  stats.begin();

  snake.update();

  for (let i = 0; i < foods.data.length; i++) {
    let food = foods.data[i];
    if (food.x == snake.head.x && food.y == snake.head.y) {
      snake.eat();
      foods.delete(i);
    }
  }

  display.cls();
  display.appendModels(snake.getModels());
  //display.appendModels(foods.getModels());
  display.appendModel(scoreBoard, Math.floor((display.w * 0.5) - (scoreBoard.cols * 0.5)), 0);
  display.update();

  displayContainer.innerHTML = display.el.outerHTML;

  stats.end();
  if (!paused) window.requestAnimationFrame(draw);
}
// END OF DRAW LOOP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Helper Functions:

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

function createScoreBoard(score) {
  let line = `${score}`;
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
  title.innerHTML = "HTML Snake";
  let aside = document.createElement("small");
  aside.innerHTML = "rendition by EthanThatOneKid";

  let tempContainer = document.createElement("div");
  let instructions = document.createElement("p");
  instructions.innerHTML = "Use your arrow keys to guide your snake.";
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
  snake.updateVel(keyName);
});
