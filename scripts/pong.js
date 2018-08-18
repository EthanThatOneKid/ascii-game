class Puck {
  constructor(displayWidth, displayHeight) {
    this.model = new Model([["O"]]);
    this.pos = {x: displayWidth * 0.5, y: displayHeight * 0.5};
    this.speed = 1;
    this.vel = {x: -this.speed, y: 0};
    this.bounds = {w: displayWidth, h: displayHeight};
  }
  update() {
    if (puck.pos.x >= display.w - 1) return "R";
    if (puck.pos.x < 1) return "L";
    if (this.pos.y >= this.bounds.h - 1 || puck.pos.y < 1) puck.vel.y *= -1; // bonk
    if (this.pos.y >= this.bounds.h - 1) this.pos.y = this.bounds.h - 1; // bottom padding
    puck.pos.x += puck.vel.x;
    puck.pos.y += puck.vel.y;
    return "safe";
  }
  updateVel(vel) {
    this.vel.x = vel.x;
    this.vel.y = vel.y;
  }
}

class Paddle {
  constructor(side, h, pos, speed = 1) {
    this.model = new Model([
      ["+", "-", "+"],
      ["|", " ", "|"],
      ["|", " ", "|"],
      ["|", " ", "|"],
      ["|", " ", "|"],
      ["|", " ", "|"],
      ["+", "-", "+"]
    ]);
    this.pos = pos;
    this.side = side;
    this.bound = h;
    this.speed = speed;
    this.wins = 0;
  }
  move(key) {
    if (key == "ArrowDown" || key == "s") this.pos.y += this.speed;
    if (key == "ArrowUp" || key == "w") this.pos.y -= this.speed;
    if (this.pos.y > this.bound - this.model.rows) this.pos.y = this.bound - this.model.rows;
    if (this.pos.y < 0) this.pos.y = 0;
  }
  ai(puck) {
    if (puck.pos.y >= this.pos.y + this.model.rows) this.move("ArrowDown");
    if (puck.pos.y <= this.pos.y) this.move("ArrowUp");
  }
  collide(puck) {
    let collision;
    if (this.side == "L") collision = this.collideL(puck);
    else if (this.side == "R") collision = this.collideR(puck);
    if (collision) {
      let percentDown = (puck.pos.y - this.pos.y) / this.model.rows;
      let vel = this.mapPercentToSlope(percentDown);
      vel.x *= puck.speed;
      return vel;
    }
    return puck.vel;
  }
  collideL(puck) {
    return puck.pos.y >= this.pos.y &&
      puck.pos.y <= this.pos.y + this.model.rows &&
      puck.pos.x <= this.pos.x + this.model.cols;
  }
  collideR(puck) {
    return puck.pos.y >= this.pos.y &&
      puck.pos.y <= this.pos.y + this.model.rows &&
      puck.pos.x >= this.pos.x;
  }
  score() {
    console.log(`${this.side} scores!`);
    this.wins++;
  }
  mapPercentToSlope(percentDown) {
    const fourtyFiveDegrees = 0.7853981633974483;
    let angle = Paddle.map(percentDown, 0, 1, -fourtyFiveDegrees, fourtyFiveDegrees);
    let slope = Math.tan(angle);
    return {
      x: this.side == "L" ? 1 : -1,
      y: slope
    };
  }
  static map(a, b, c, d, f, g) {
    let h = (a - b) / (c - b) * (f - d) + d;
    return g ? d < f ? constrain(h, d, f) : constrain(h, f, d) : h;
    function constrain(a, b, c) {
      if (a < b) return b;
      if (a > c) return c;
      return a;
    }
  }
}
