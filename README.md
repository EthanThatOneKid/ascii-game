# ascii-game
![GitHub forks](https://img.shields.io/github/forks/EthanThatOneKid/ascii.svg?style=social&label=Fork)
![GitHub stars](https://img.shields.io/github/forks/EthanThatOneKid/ascii.svg?style=social&label=Star)
![bundle size](https://img.shields.io/bundlephobia/min/ascii-game.svg)
![npm downloads](https://img.shields.io/npm/dt/ascii-game.svg)

## Implementations
* ### __[Pong](https://ethanthatonekid.github.io/ascii/pong)__
* ### __[Snake](https://ethanthatonekid.github.io/ascii/snake)__

## Installation
`npm i ascii-game`

## Usage
```javascript
// Dependencies
const A = require('ascii-game');

// AsciiGame.Display takes an object with properties *w* and *h* to determine the dimensions of the display
const display = new A.Display({
  "w": <int rows>,
  "h": <int cols>
});

// AsciiGame.Model takes and stores a two-dimensional array of single-character strings
const model = new A.Model([
  ["+", "-", "+"],
  ["|", " ", "|"],
  ["|", " ", "|"],
  ["+", "-", "+"]
]);
```

## Documentation

### `AsciiGame.Display`
#### `AsciiGame.Display.append(s, x, y)`
* `s`: character being appended
* `x`: x-position in the display data
* `y`: y-position in the display data
* returns nothing
#### `AsciiGame.Display.appendModel(model, x, y)`
* `model`: instance of the `AsciiGame.Model` class
* `x`: x-position in the display data
* `y`: y-position in the display data
* returns nothing
#### `AsciiGame.Display.appendModels(appendations)`
* `appendations`: `[{model, x, y}, ...]`
* returns nothing
#### `AsciiGame.Display.capture()`
* returns a new instance of the `AsciiGame.Model` class of the current display data
#### `AsciiGame.Display.cls()`
* clears all of the cells in the display data
* returns nothing
#### `AsciiGame.Display.createConsoleOutput()`
* returns stringified rendition of the display data that can be immediately printed to the console
#### `AsciiGame.Display.createElement()`
* returns html element rendition of the display data
#### `AsciiGame.Display.flush()`
* updates the instance's `el` property
* returns nothing
#### `AsciiGame.Display.log()`
* prints the current display data in the console
* returns nothing

### `AsciiGame.Model`
#### `AsciiGame.Model.log()`
* prints the current model data in the console
* returns nothing

---

Engineered with ♥ by [@EthanThatOneKid](https://github.com/EthanThatOneKid)
