// Block Class

class Block {

  constructor(x_pos, y_pos, w, h) {

    this.model = new Model(new Array(h).fill(new Array(w).fill(" ")));
    for (let y = 0; y < h; y++) this.model.data[y][0] = this.model.data[y][w - 1] = "|";
    for (let x = 0; x < w; x++) this.model.data[0][x] = this.model.data[h - 1][0] = "-";
    this.model.data[0][0] = this.model.data[0][w - 1] = this.model.data[h - 1][0] = this.model.data[h - 1][w - 1] = "+";

    this.pos = {x: x_pos, y: x_pos};
    this.w = w;
    this.h = h;

  }

  collide(x, y) {
    return x >= this.pos.x && x <= this.pos.x + this.w &&
           y >= this.pos.y && y <= this.pos.y + this.h;
  }

}

// Ball Class

class Ball {

  constructor(displayWidth, displayHeight) {

    this.model = new Model([["O"]]);
    this.pos = {x: displayWidth * 0.5, y: displayHeight * 0.5};
    this.speed = 1;
    this.vel = {x: 0, y: -this.speed};
    this.bounds = {w: displayWidth, h: displayHeight};

  }

  update() {

    if (this.pos.y >= this.bounds.h) return "miss";

    if (this.pos.y >= this.bounds.h - 1 || this.pos.y <= 0) this.vel.y *= -1; // bonk
    if (this.pos.x >= this.bounds.w - 1 || this.pos.x <= 0) this.vel.x *= -1; // bonk

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    return "safe";

  }

  updateVel(vel) {

    this.vel.x = vel.x;
    this.vel.y = vel.y;

  }

}

// Paddle Class

class Paddle {

  constructor(w, y) {

    this.model = new Model([
      ["+", "-", "-", "+"],
      ["|", " ", " ", "|"],
      ["+", "-", "-", "+"]
    ]);

    this.pos = {x: Math.floor(w * 0.5), y: y};
    this.bound = w;
    this.wins = 0;
    this.speed = 1;

  }

  move(key) {

    if (key == "ArrowRight" || key == "d") this.pos.x += this.speed;
    if (key == "ArrowLeft" || key == "a") this.pos.x -= this.speed;

    if (this.pos.x + this.model.cols > this.bound) this.pos.x = this.bound - this.model.cols;
    if (this.pos.x < 0) this.pos.x = 0;

  }

  collide(ball) {

    if (
      ball.pos.y >= this.pos.y &&
      ball.pos.y <= this.pos.y + this.model.rows &&
      ball.pos.x <= this.pos.x + this.model.cols
    ) {

      const percentDown = (ball.pos.x - this.pos.x) / this.model.rows;
      let vel = this.mapPercentToSlope(percentDown);
      vel.y *= ball.speed;
      return vel;

    }

    return ball.vel;

  }

  mapPercentToSlope(percentDown) {
    const fourtyFiveDegrees = 0.7853981633974483;
    const theta = Paddle.map(percentDown, 0, 1, -fourtyFiveDegrees, fourtyFiveDegrees);
    return {
      x: Math.tan(theta),
      y: -1
    };
  }

  static map(a, b, c, d, f, g) {
    const constrain = (a, b, c) => a < b ? b : a > c ? c : a;
    const h = (a - b) / (c - b) * (f - d) + d;
    return g ? d < f ? constrain(h, d, f) : constrain(h, f, d) : h;
  }

}
