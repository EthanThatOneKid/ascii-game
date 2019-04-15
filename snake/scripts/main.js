let displayContainer = document.createElement("div");

let bounds = {x: 32, y: 20};
let display = new Display(bounds.x, bounds.y);
let snake = new Snake(1, 1, bounds);
let foods = new Foods(bounds);
let scoreBoard = createScoreBoard(snake.score);
let drawLoop, paused = true, stats;
const keys = [];

splash();

// BEGINNING OF DRAW LOOP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function draw(timestamp) {
  stats.begin();

  display.cls();
  display.appendModels(snake.getModels());
  display.appendModels(foods.getModels());
  display.appendModel(scoreBoard, Math.floor((display.w * 0.5) - (scoreBoard.cols * 0.5)), 0);
  display.flush();

  if (snake.checkIfDied()) {
    pause();
    handleKillScreen();
  }

  for (let i = 0; i < foods.data.length; i++) {
    let food = foods.data[i];
    if (food.x == snake.head.x && food.y == snake.head.y) {
      snake.eat();
      scoreBoard = createScoreBoard(snake.score);
      foods.despawn(i);
      foods.spawn(1);
      break;
    }
  }

  snake.updateVel(keys[0]);
  snake.update();

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
  if (paused && !snake.dead) {
    paused = false;
    drawLoop = window.requestAnimationFrame(draw);
  }
}

function createKillScreen(n) {
}

function handleKillScreen() {
  let msgs = ["Ya done goofed", "Did you just shart?", "Nice one", "Oopsies", "Oof"];
  let msgModel = new Model([msgs[Math.floor(Math.random() * msgs.length)].split("")]);
  let modelData = convertIntegerToModel(snake.score);
  let killScreen = new Model(modelData);

  display.cls();
  display.appendModel(msgModel,
    Math.floor((display.w * 0.5) - (msgModel.cols * 0.5)),
    Math.floor(display.h * 0.5) - 3
  );
  display.appendModel(killScreen,
    Math.floor((display.w * 0.5) - (killScreen.cols * 0.5)),
    Math.floor(display.h * 0.5) - 2
  );
  display.flush();
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
  foods.spawn(1);
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

function convertIntegerToModel(n) {
  const dictionary = [[["","_",""],["|","","|"],["|","_","|"]],[["","",""],["","","|"],["","","|"]],[["","_",""],["","_","|"],["|","_",""]],[["","_",""],["","_","|"],["","_","|"]],[["","",""],["|","_","|"],["","","|"]],[["","_",""],["|","_",""],["","_","|"]],[["","_",""],["|","_",""],["|","_","|"]],[["","_",""],["","","|"],["","","|"]],[["","_",""],["|","_","|"],["|","_","|"]],[["","_",""],["|","_","|"],["","","|"]]];
  let digits = (n + "").split("");
  return digits.reduce((acc, cur) => {
    let gimme = dictionary[cur];
    for (let i = 0; i < gimme.length; i++) {
      for (let j = 0; j < gimme[i].length; j++) {
        if (acc[i]) acc[i].push(gimme[i][j]);
        else acc[i] = [gimme[i][j]];
      }
    } return acc;
  }, []);
}

document.addEventListener("keydown", event => {
  const keyName = event.key;
  keys.pop();
  keys.unshift(keyName);
});
