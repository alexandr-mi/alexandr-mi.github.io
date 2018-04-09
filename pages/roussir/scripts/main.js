(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _namespace = require('./namespace');

var _scroll = require('./scroll');

var _touch = require('./touch');

var _star = require('./star');

// scroll on all height to up or down
window.addEventListener('mousewheel', function (e) {
  (0, _scroll.toggleScroll)(e.deltaY > 0);
});

// scroll on all height to down on click button
_namespace.doc.scrollButton.addEventListener('click', _scroll.scrollBottom);

// for touch devices
window.addEventListener('touchstart', _touch.setTouchStart);
window.addEventListener('touchend', function (e) {
  (0, _touch.setTouchEnd)(e);
  (0, _scroll.toggleScroll)(_namespace.doc.touchStart > _namespace.doc.touchEnd);
});

// stars fall animation
window.addEventListener('load', function () {
  (0, _star.createStar)(300);
  (0, _star.createStar)(400);
  (0, _star.createStar)(250);

  (0, _star.setIntervalForFallStar)(_star.stars[0], 3000);
  (0, _star.setIntervalForFallStar)(_star.stars[1], 5000);
  (0, _star.setIntervalForFallStar)(_star.stars[2], 6000);
});

},{"./namespace":2,"./scroll":4,"./star":6,"./touch":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var doc = {
  sea: document.querySelector('.sea'),
  space__bgStars: document.querySelector('.space__bg-stars'),
  scrollButton: document.querySelector('.button-more'),
  pageWrapper: document.querySelector('.pageWrapper'),
  seaContentLeft: document.querySelector('.sea__content-left'),
  seaContentCenter: document.querySelector('.sea__content-center'),
  seaContentRight: document.querySelector('.sea__content-right'),
  touchStart: 0,
  touchEnd: 0
};

exports.doc = doc;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

exports.randomInteger = randomInteger;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollBottom = exports.scrollTop = exports.toggleScroll = undefined;

var _namespace = require('./namespace');

var _sea = require('./sea');

var scrollPosition = -100;

function scrollBottom() {
  if (scrollPosition > -200) {
    scrollPosition -= 100;
    _namespace.doc.pageWrapper.style.top = scrollPosition + 'vh';
    (0, _sea.showSeaContent)();
  }
}

function scrollTop() {
  if (scrollPosition < 0) {
    scrollPosition += 100;
    _namespace.doc.pageWrapper.style.top = scrollPosition + 'vh';
    (0, _sea.hideSeaContent)();
  }
}

function toggleScroll(condition) {
  condition ? scrollBottom() : scrollTop();
}

exports.toggleScroll = toggleScroll;
exports.scrollTop = scrollTop;
exports.scrollBottom = scrollBottom;

},{"./namespace":2,"./sea":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideSeaContent = exports.showSeaContent = undefined;

var _namespace = require('./namespace');

function showSeaContent() {
  setTimeout(function () {
    _namespace.doc.seaContentLeft.classList.add('show');
  }, 500);
  setTimeout(function () {
    _namespace.doc.seaContentCenter.classList.add('show');
  }, 700);
  setTimeout(function () {
    _namespace.doc.seaContentRight.classList.add('show');
  }, 900);
}

function hideSeaContent() {
  _namespace.doc.seaContentLeft.classList.remove('show');
  _namespace.doc.seaContentCenter.classList.remove('show');
  _namespace.doc.seaContentRight.classList.remove('show');
}

exports.showSeaContent = showSeaContent;
exports.hideSeaContent = hideSeaContent;

},{"./namespace":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setIntervalForFallStar = exports.moveStar = exports.createStar = exports.stars = undefined;

var _namespace = require('./namespace');

var _random = require('./random');

var stars = [];

function setIntervalForFallStar(star, interval) {
  setInterval(function () {
    var top = (0, _random.randomInteger)(0, 50);
    var left = (0, _random.randomInteger)(0, 100);
    var deg = (0, _random.randomInteger)(20, 140);
    var length = (0, _random.randomInteger)(500, 800);
    moveStar(star, top, left, deg, length);
  }, interval);
}
function createStar(speed) {
  var star = document.createElement('div');
  star.classList.add('space__star');

  star.setAttribute('data-speed', speed);
  star.style.transition = 'width ' + speed / 1000 + 's linear, opacity 0.8s';
  stars.push(star);

  _namespace.doc.space__bgStars.appendChild(star);
}

function moveStar(star, top, left, deg, length) {
  star.style.top = top + '%';
  star.style.left = left + '%';
  star.style.transform = 'rotate(' + deg + 'deg)';
  star.style.opacity = '1';
  setTimeout(function () {
    star.style.width = length + 'px';
  }, 0);

  setTimeout(function () {
    star.style.opacity = '0';
  }, star.dataset.speed);

  setTimeout(function () {

    star.style.width = '0px';
  }, star.dataset.speed * 2);
}
exports.stars = stars;
exports.createStar = createStar;
exports.moveStar = moveStar;
exports.setIntervalForFallStar = setIntervalForFallStar;

},{"./namespace":2,"./random":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTouchEnd = exports.setTouchStart = undefined;

var _namespace = require("./namespace");

function setTouchStart(e) {
  _namespace.doc.touchStart = e.changedTouches[0].screenY;
}

function setTouchEnd(e) {
  _namespace.doc.touchEnd = e.changedTouches[0].screenY;
}

exports.setTouchStart = setTouchStart;
exports.setTouchEnd = setTouchEnd;

},{"./namespace":2}]},{},[1])

//# sourceMappingURL=main.js.map
