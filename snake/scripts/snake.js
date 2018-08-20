class Snake {
  constructor(x, y, bounds) {
    this.head = new Segment(x, y);
    this.bounds = bounds;
    this.tail = [];
    this.vel = {x: 1, y: 0};
    this.score = 1;
    this.head.changeDirection(this.vel);
    this.dead = false;
  }
  update() {
    this.tail.unshift(this.head.copy());
    this.head.x += this.vel.x;
    this.head.y += this.vel.y;
    this.tail.pop();
  }
  updateVel(key) {
    if (this.vel.y != 1) if (key == "ArrowUp" || key == "w") this.vel = {x: 0, y: -1};
    if (this.vel.x != 1) if (key == "ArrowLeft" || key == "a") this.vel = {x: -1, y: 0};
    if (this.vel.y != -1) if (key == "ArrowDown" || key == "s") this.vel = {x: 0, y: 1};
    if (this.vel.x != -1) if (key == "ArrowRight" || key == "d") this.vel = {x: 1, y: 0};
    this.head.changeDirection(this.vel);
  }
  eat() {
    this.tail.unshift(this.head.copy());
    this.score++;
  }
  checkIfDied() {
    let dead = false;
    for (let segment of this.tail) if (segment.x == this.head.x && segment.y == this.head.y) dead = true;
    if (this.head.x < 0 || this.head.x > this.bounds.x - 1 || this.head.y < 0 || this.head.y > this.bounds.y - 1)
      dead = true;
    if (dead) {
      if (!this.dead) this.dead = true;
      return true;
    } else return false;
  }
  getModels() {
    return [this.head].concat(this.tail);
  }
}

class Segment {
  constructor(x, y, model) {
    this.model = model || new Model([["o"]]);
    this.x = x;
    this.y = y;
  }
  changeDirection(vel) {
    let gimme = vel.x > 0 && vel.y == 0 ? "&rArr;" :
      vel.x < 0 && vel.y == 0 ? "&lArr;" :
      vel.x == 0 && vel.y > 0 ? "&dArr;" : "&uArr;";
    this.model.data[0][0] = gimme;
  }
  copy() {
    let gimmeModel = new Model(JSON.parse(JSON.stringify(this.model.data)));
    return new Segment(this.x, this.y, gimmeModel);
  }
}

class Foods {
  constructor(bounds) {
    this.data = [];
    this.bounds = bounds;
  }
  spawn(n) {
    for (let i = 0; i < n; i++)
      this.data.push(this.createRandomFood());
  }
  despawn(i) {
    this.data.splice(i, 1);
  }
  getModels() {
    return this.data;
  }
  createRandomFood() {
    return new Segment(
      Math.floor(this.bounds.x * Math.random()),
      Math.floor(this.bounds.y * Math.random())
    );
  }
}
