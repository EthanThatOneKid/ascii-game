// Main
module.exports = class Model {

  constructor(arr2d) {
    this.data = arr2d;
    this.rows = arr2d.length;
    this.cols = arr2d[0].length;
  }

  log() {
    console.table(this.data);
  }

}
