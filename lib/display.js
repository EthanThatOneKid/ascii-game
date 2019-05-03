// Dependencies
const Model = require('./model.js');

// Main
module.exports = class Display {

  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.data;
    this.cls();
    this.el;
  }

  createConsoleOutput() {
    let output = "";
    for (let row of this.data) {
      for (let cell of row)
        output += !cell.length ? " " : cell[0];
      output += "\n";
    }
    return output;
  }

  createElement() {
    return this.data.reduce((tb, row) => {
      tb.appendChild(row.reduce((tr, cell) => {
        let td = document.createElement("td");
        td.innerHTML = cell == "" ? "&nbsp;" : cell;
        tr.appendChild(td);
        return tr;
      }, document.createElement("tr")));
      return tb;
    }, document.createElement("table"));
  }

  flush() {
    this.el = this.createElement();
  }

  append(s, x, y) {
    try {
      this.data[y][x] = s;
    } catch(e) {
      console.error(`Oops.. (${x}, ${y}) is out of bounds.`);
    }
  }

  appendModel(model, x_, y_) {
    for (let y = 0; y < model.rows; y++) {
      for (let x = 0; x < model.cols; x++)
        this.append(model.data[y][x], x + x_, y + y_);
    }
  }

  appendModels(appendations) {
    for (let appendation of appendations)
      this.appendModel(appendation.model, appendation.x, appendation.y);
  }

  cls() {
    this.data = [];
    for (let y = 0; y < this.h; y++) {
      let row = [];
      for (let x = 0; x < this.w; x++) row.push("");
      this.data.push(row);
    }
  }

  capture() {
    return new Model(this.data);
  }

  render(sel) {
    document.querySelector(sel).innerHTML = this.el.outerHTML;
  }

  log() {
    console.table(this.data);
  }

}
