(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

window.addEventListener('load', function () {
  var bgFront = document.querySelector('.yosemite__background_front'),
      bgBack = document.querySelector('.yosemite__background_back'),
      overlay = document.querySelector('.yosemite__overlay'),
      buttonTop = document.querySelector('.yosemite__button-top'),
      buttonBottom = document.querySelector('.yosemite__button-bottom'),
      containerTop = document.querySelector('.yosemite__top'),
      containerBottom = document.querySelector('.yosemite__bottom');

  function showTopContainer() {
    buttonBottom.classList.remove('active');
    buttonTop.classList.add('active');
    containerBottom.classList.add('hide');
    containerTop.classList.remove('hide');
  }

  function showBottomContainer() {
    buttonTop.classList.remove('active');
    containerTop.classList.add('hide');
    setTimeout(function () {
      buttonBottom.classList.add('active');
      containerBottom.classList.remove('hide');
    }, 800);
  }

  function showTop() {
    removeZoom();
    hideOverlay();
    showTopContainer();
  }

  function showBottom() {
    showBottomContainer();
    addZoom();
    showOverlay();
  }
  buttonTop.addEventListener('click', function (e) {
    showBottom();
  });

  buttonBottom.addEventListener('click', function (e) {
    showTop();
  });

  function showOverlay() {
    overlay.classList.add('active');
  }

  function hideOverlay() {
    overlay.classList.remove('active');
  }

  function addZoom() {
    bgFront.classList.add('zoom');
    bgBack.classList.add('zoom');
  }

  function removeZoom() {
    bgFront.classList.remove('zoom');
    bgBack.classList.remove('zoom');
  }
});

},{}]},{},[1])

//# sourceMappingURL=main.js.map
