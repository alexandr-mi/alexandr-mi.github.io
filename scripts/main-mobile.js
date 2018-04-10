(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function startProgressAnimation(progressBars, type) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = progressBars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var path = _step.value;

      var progress = path.dataset.progress;
      var fullLengthSVGPath = type === 'circle' ? 235.2 : 300;

      path.style.strokeDashoffset = fullLengthSVGPath / 100 * (100 - progress);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function startFunctionAnimationOnVisibleObject(object, functionAnimation, param, visiblePercentage) {
  var checkVisibleThisContainer = function checkVisibleThisContainer() {
    var winHeight = window.innerHeight;
    var winScrollY = window.scrollY;

    var _object = object;
    var containerOffsetTop = _object.offsetTop;
    var containerHeight = _object.getBoundingClientRect().height;

    var offsetTopIncludeStartProgressAnimation = winHeight + winScrollY - containerHeight * (visiblePercentage || 0.5);

    var resultCheckVisibleThisContainer = offsetTopIncludeStartProgressAnimation >= containerOffsetTop;

    if (resultCheckVisibleThisContainer) {
      functionAnimation(param, 'circle');
      window.removeEventListener('scroll', checkVisibleThisContainer);
    }
  };

  window.addEventListener('scroll', checkVisibleThisContainer);

  checkVisibleThisContainer();
}

exports.startProgressAnimation = startProgressAnimation;
exports.startFunctionAnimationOnVisibleObject = startFunctionAnimationOnVisibleObject;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skillClickListener = undefined;

var _animations = require('./animations');

function skillClickListener(skills) {
  var involves = document.querySelectorAll('.software-skills__involve');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = skills[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var skill = _step.value;

      skill.addEventListener('click', function (e) {
        var involveList = e.currentTarget.querySelector('.software-skills__involve');
        var SVGsWithAnimationInThis = e.currentTarget.querySelectorAll('.line-progress-bar__container [data-progress]');
        if (involveList) {
          if (involveList.classList.contains('hidden')) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = involves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var involve = _step2.value;

                involve.classList.add('hidden');
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            involveList.classList.remove('hidden');
            (0, _animations.startProgressAnimation)(SVGsWithAnimationInThis, 'line');
          } else {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = involves[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _involve = _step3.value;

                _involve.classList.add('hidden');
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

exports.skillClickListener = skillClickListener;

},{"./animations":1}],3:[function(require,module,exports){
'use strict';

var _animations = require('./components/animations');

var _listeners = require('./components/listeners');

window.onload = function () {
  var circleProgressBars = document.querySelectorAll('.circle-progress-bar__front');
  var skills = document.querySelectorAll('.software-skills__skill');
  var skillsList = document.querySelector('.software-skills__list');

  (0, _listeners.skillClickListener)(skills);

  (0, _animations.startFunctionAnimationOnVisibleObject)(skillsList, _animations.startProgressAnimation, circleProgressBars);
};

},{"./components/animations":1,"./components/listeners":2}]},{},[3])

//# sourceMappingURL=main-mobile.js.map
