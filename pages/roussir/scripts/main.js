(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var scrollButton = document.querySelector('.button-more');
var pageWrapper = document.querySelector('.pageWrapper');

window.addEventListener('load', function () {
  scrollButton.addEventListener('click', function () {
    pageWrapper.classList.add('toSea');
  });
});

window.addEventListener('mousewheel', function (e) {
  e.deltaY > 0 ? pageWrapper.classList.add('toSea') : pageWrapper.classList.remove('toSea');
});

var touchStart = void 0,
    touchEnd = void 0;

window.addEventListener('touchstart', function (e) {
  touchStart = e.changedTouches[0].screenY;
});

window.addEventListener('touchmove', function (e) {
  touchEnd = e.changedTouches[0].screenY;
  touchStart > touchEnd ? pageWrapper.classList.add('toSea') : pageWrapper.classList.remove('toSea');
});

},{}]},{},[1])

//# sourceMappingURL=main.js.map
