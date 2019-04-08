# __ascii.js__
![GitHub forks](https://img.shields.io/github/forks/EthanThatOneKid/ascii.svg?style=social&label=Fork)
![GitHub stars](https://img.shields.io/github/forks/EthanThatOneKid/ascii.svg?style=social&label=Star)

## Implementations
* ### __[Pong](https://ethanthatonekid.github.io/ascii/pong)__
* ### __[Snake](https://ethanthatonekid.github.io/ascii/snake)__
* ### __[Breakout (under construction)](https://ethanthatonekid.github.io/ascii/breakout)__

## Documentation:
* ### __Display Class__
  * #### __Create new instance__:
  > `const display = new Display(w, h)`
    * `w` = columns of display
    * `h` = rows of display
  * #### __Privates__:
    * `display.el`: the current html element
    * `display.w`: columns of display
    * `display.h`: rows of display
  * #### __Methods__:
    * `display.createElement()`: returns html element of display
    * `display.flush()`: updates `display.el`
    * `display.append(s, x, y)`: overwrites one cell of the display
      * `s` = character being appended
      * `x` = x position in the display
      * `y` = y position in the display
    * `display.appendModel(model, x, y)`: appends a model to the display
      * `model` = instance of the `Model` class
      * `x` = x position in the display
      * `y` = y position in the display
    * `display.appendModels(appendations)`: appends multiple models to the display
      * `appendations` =
        ```javascript
        const appendations = [
          {
            model, // instance of Model class
            x, // x position in the display
            y // y position in the display
          },
          (...)
        ];
        ```
    * `display.capture()`: returns a new model of the data in the display
    * `display.cls()`: clears all of the cells in the display
    * `display.log()`: logs the display data to the console (meant for development)
* ### __Model Class__
  * #### __Create new instance__:
  > `const model = new Model(2dArr)`
      ```javascript
      const 2dArr = [
        ["+", "-", "+"],
        ["|", " ", "|"],
        ["|", " ", "|"],
        ["+", "-", "+"]
      ];
      ```
  * #### __Privates__:
    * `model.data`: the 2dArr entered upon instigation
    * `model.rows`: the amount of rows in `model.data`
    * `model.cols`: the amount of columns in `model.data`
  * #### __Methods__:
    * `model.log()`: logs the model data to the console (meant for development)
