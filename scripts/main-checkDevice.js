(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function changeHref(href) {
  var origin = document.location.origin,
      pathname = document.location.pathname;

  var splitPathname = pathname.split('/');
  splitPathname[splitPathname.length - 1] = href;

  var resultPathname = splitPathname.join('/').trim();

  return origin + resultPathname;
}

function checkDevice() {
  if (window.screen.availWidth < 1100) {
    document.location.origin;
    document.location.href = changeHref("mobile.html");
  }
}

exports.default = checkDevice;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

var _checkDevice = require('./components/checkDevice');

var _checkDevice2 = _interopRequireDefault(_checkDevice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _checkDevice2.default)();

},{"./components/checkDevice":1}]},{},[2])

//# sourceMappingURL=main-checkDevice.js.map
