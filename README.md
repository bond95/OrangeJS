# OrangeLib
Small front-end library for fast working with DOM elements and their attributes

## Installation

For connect Orange with your project you need to get file `dist/orange.min.js`. Orange working only with jQuery. So you must connect first jQuery than Orange.

## Structure

Basic structure of Orange is:
```JavaScript
let app = new Orange();
app.setPreloader(function () {
	//Some actions before start
});
app.setControllers({
    'block1': Block1Controller,		//'block1' is id of DOM element (block), Block1Controller is a function
    'block2': Block2Controller
});
app.run();
```

## Controllers

Controller is a function that get OrangeElements as parameter.
Every child DOM element of parent blcok, that need to use, must have `orange-id` as attribute (a few elements can have same `orange-id`), elements with `orange-id` are called OrangeElements.

