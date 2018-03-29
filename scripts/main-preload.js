(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function checkInOptions(options, optionsObj, optionsDef) {
  return !options ? optionsDef : options[optionsObj] ? options[optionsObj] : optionsDef;
}

function preloader(options) {
  var html = document.querySelector('html');

  var background = checkInOptions(options, 'background', 'black'),
      spinnerColorFront = checkInOptions(options, 'spinnerColorFront', 'rgba(255, 255, 255, 1)'),
      spinnerColorBack = checkInOptions(options, 'spinnerColorBack', 'rgba(255, 255, 255, 0.2)'),
      spinnerWidth = checkInOptions(options, 'spinnerWidth', 50),
      spinnerHeight = checkInOptions(options, 'spinnerHeight', 50),
      spinnerBorderWidth = checkInOptions(options, 'spinnerBorderWidth', 2),
      preloader = document.createElement('div'),
      spinner = document.createElement('div'),
      spinnerTwist = void 0,
      i = 0;

  html.style.overflow = 'hidden';

  preloader.className = 'preloder';
  spinner.className = 'preloder__spinner';

  preloader.style.cssText = '\n      position: fixed;\n      z-index: 99999;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      background: ' + background + ';\n      overflow-y: hidden;';

  spinner.style.cssText = '\n      z-index: 999999;\n      width: ' + spinnerWidth + 'px;\n      height: ' + spinnerHeight + 'px;\n      position: absolute;\n      top: calc(50% - ' + spinnerHeight / 2 + 'px);\n      left: calc(50% - ' + spinnerWidth / 2 + 'px);\n      border-radius: 50%;\n      border-top: ' + spinnerBorderWidth + 'px solid ' + spinnerColorBack + ';\n      border-right: ' + spinnerBorderWidth + 'px solid ' + spinnerColorBack + ';\n      border-bottom: ' + spinnerBorderWidth + 'px solid ' + spinnerColorBack + ';\n      border-left: ' + spinnerBorderWidth + 'px solid ' + spinnerColorFront + ';';

  preloader.appendChild(spinner);

  html.insertBefore(preloader, html.children[0]);

  spinnerTwist = setInterval(function () {
    spinner.style.transform = 'rotate(' + i + 'deg)';
    i += 5;
  }, 10);

  window.addEventListener('load', function () {
    clearInterval(spinnerTwist);
    html.removeChild(preloader);
    html.style.overflow = 'auto';
  });
}

exports.default = preloader;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

var _preloader = require('./components/preloader');

var _preloader2 = _interopRequireDefault(_preloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _preloader2.default)();

},{"./components/preloader":1}]},{},[2])

//# sourceMappingURL=main-preload.js.map
