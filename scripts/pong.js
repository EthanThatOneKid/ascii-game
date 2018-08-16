class Puck {
  constructor(displayWidth, displayHeight) {
    this.model = new Model([["O"]]);
    this.pos = {x: displayWidth * 0.5, y: displayHeight * 0.5};
    this.speed = 0.1;
    this.vel = {x: -this.speed, y: 0};
    this.bounds = {w: displayWidth, h: displayHeight};
  }
  update() {
    if (puck.pos.x >= display.w - 1) return "R";
    if (puck.pos.x < 1) return "L";
    if (this.pos.y >= this.bounds.h - 1 || puck.pos.y < 1) puck.vel.y *= -1;
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
  constructor(side, h, pos) {
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
    this.wins = 0;
  }
  move(key) {
    let vel = 1;
    if (key == "ArrowDown" || key == "s") this.pos.y += vel;
    if (key == "ArrowUp" || key == "w") this.pos.y -= vel;
    if (this.pos.y > this.bound - this.model.rows) this.pos.y = this.bound - this.model.rows;
    if (this.pos.y < 0) this.pos.y = 0;
  }
  collide(puck) {
    if (this.side == "L") return this.collideL(puck);
    else if (this.side == "R") return this.collideR(puck)
  }
  collideL(puck) {
    let collision = puck.pos.y >= this.pos.y &&
      puck.pos.y <= this.pos.y + this.model.rows &&
      puck.pos.x <= this.pos.x + this.model.cols;
    if (collision) {
      let percentDown = (puck.pos.y - this.pos.y) / this.model.rows;
      return this.mapPercentToSlope(percentDown);
    }
    return puck.vel;
  }
  score() {
    console.log(`${this.side} scores!`)
    this.wins++;
  }
  mapPercentToSlope(percentDown) {
    const fourtyFiveDegrees = 0.7853981633974483;
    let angle = Paddle.map(percentDown, 0, 1, -fourtyFiveDegrees, fourtyFiveDegrees);
    let slope = Math.tan(angle);
    return {
      x: Math.abs(slope),
      y: slope < 0 ? -1 : 1
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
