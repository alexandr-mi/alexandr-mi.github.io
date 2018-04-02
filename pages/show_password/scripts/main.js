(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function animationEye(eye_frames, button) {

  button.dataset.in_process = 'true';

  var _eye_frames = [];

  var state = button.dataset.state;

  if (state === 'open') {
    button.dataset.state = 'close';
    _eye_frames = [].concat(_toConsumableArray(eye_frames));
  } else if (state === 'close') {
    button.dataset.state = 'open';
    _eye_frames = [].concat(_toConsumableArray(eye_frames)).reverse();
  } else {
    return;
  }

  var length = _eye_frames.length,
      i = 0;

  var openEyeInterval = setInterval(function () {
    if (i < length) {
      if (i === 0) {
        _eye_frames[i].style.display = 'block';
      } else {
        _eye_frames[i - 1].style.display = 'none';
        _eye_frames[i].style.display = 'block';
      }
      i++;
    } else {
      button.dataset.in_process = 'false';
      clearInterval(openEyeInterval);
    }
  }, 30);
};

window.addEventListener('load', function () {
  var eye_button = document.querySelector('.password__icon-container-eye');
  var bg_after = document.querySelector('.password__bg-after');
  var lock_icon = document.querySelector('.password__icon-lock');
  var eye_frames = document.querySelector('#eye').children;
  var password_input = document.querySelector('.password__input');

  eye_button.addEventListener('click', function (e) {
    if (e.currentTarget.dataset.in_process === 'false') {
      bg_after.classList.toggle('active');
      if (e.currentTarget.dataset.state === 'close') {
        setTimeout(function () {
          password_input.type = 'text';
        }, 200);
        setTimeout(function () {
          lock_icon.classList.toggle('active');
        }, 300);
      } else {
        setTimeout(function () {
          lock_icon.classList.toggle('active');
          password_input.type = 'password';
        }, 50);
      }

      animationEye(eye_frames, eye_button);
    };
  });
});

},{}]},{},[1])

//# sourceMappingURL=main.js.map
