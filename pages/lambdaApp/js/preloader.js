(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

function preloader() {

  var html = document.querySelector('html');
  html.style.overflow = 'hidden';

  var background = 'black',
      spinnerColorFront = 'rgba(255, 255, 255, 1)',
      spinnerColorBack = 'rgba(255, 255, 255, 0.2)',
      spinnerWidth = 50,
      spinnerHeight = 50,
      spinnerBorderWidth = 2,
      preloader = document.createElement('div'),
      spinner = document.createElement('div'),
      spinnerTwist = void 0,
      i = 0;

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

preloader();

},{}]},{},[1])

//# sourceMappingURL=main-preloader.js.map
