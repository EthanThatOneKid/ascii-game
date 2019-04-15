// Dependencies
const Display = require('./lib/display.js'),
      Model = require('./lib/model.js');

// Main
module.exports = class AsciiGame {

  static get Display() {
    return Display;
  }

  static get Model() {
    return Model;
  }

}
