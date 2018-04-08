(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeHtml = undefined;

var _counter = require('./counter');

function changeTitleName(document, data) {
  document.basicDescription__title_name.classList.add('active');
  setTimeout(function () {
    document.basicDescription__title_name.innerHTML = data[_counter.counter].basicDescription__title_name;
    document.basicDescription__title_name.classList.add('hide');
  }, 500);
  setTimeout(function () {
    document.basicDescription__title_name.classList.remove('active');
    document.basicDescription__title_name.classList.remove('hide');
  }, 1000);
}
function changeTitleDescription(document, data) {
  setTimeout(function () {
    document.basicDescription__title_description.classList.add('active');
  }, 200);
  setTimeout(function () {
    document.basicDescription__title_description.innerHTML = data[_counter.counter].basicDescription__title_description;
    document.basicDescription__title_description.classList.add('hide');
  }, 700);
  setTimeout(function () {
    document.basicDescription__title_description.classList.remove('active');
    document.basicDescription__title_description.classList.remove('hide');
  }, 1200);
}
function changeRemaining(document, data) {
  setTimeout(function () {
    document.basicDescription__aboutIt.classList.add('hide');
    document.additionalDescription__itemCategory.classList.add('hide');
    document.additionalDescription__itemPhotographyBy.classList.add('hide');
    document.additionalDescription__itemWrittenBy.classList.add('hide');
    document.additionalDescription__itemPublishedOn.classList.add('hide');
  }, 700);
  setTimeout(function () {
    document.basicDescription__aboutIt.innerHTML = data[_counter.counter].basicDescription__aboutIt;
    document.additionalDescription__itemCategory.innerHTML = data[_counter.counter].additionalDescription__itemCategory;
    document.additionalDescription__itemPhotographyBy.innerHTML = data[_counter.counter].additionalDescription__itemPhotographyBy;
    document.additionalDescription__itemWrittenBy.innerHTML = data[_counter.counter].additionalDescription__itemWrittenBy;
    document.additionalDescription__itemPublishedOn.innerHTML = data[_counter.counter].additionalDescription__itemPublishedOn;

    document.basicDescription__aboutIt.classList.remove('hide');
    document.additionalDescription__itemCategory.classList.remove('hide');
    document.additionalDescription__itemPhotographyBy.classList.remove('hide');
    document.additionalDescription__itemWrittenBy.classList.remove('hide');
    document.additionalDescription__itemPublishedOn.classList.remove('hide');
  }, 1200);
}

function changeHtml(document, data) {
  changeTitleName(document, data);
  changeTitleDescription(document, data);
  changeRemaining(document, data);
}

exports.changeHtml = changeHtml;

},{"./counter":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.counter = exports.counterPrev = exports.counterNext = undefined;

var _data = require("./data");

var counter = 0;

function counterNext() {
  if (counter === _data.data.length - 1) {
    exports.counter = counter = 0;
    return;
  }
  exports.counter = counter += 1;
}

function counterPrev() {
  if (counter === 0) {
    exports.counter = counter = _data.data.length - 1;
    return;
  }
  exports.counter = counter -= 1;
}

exports.counterNext = counterNext;
exports.counterPrev = counterPrev;
exports.counter = counter;

},{"./data":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var data = [{
  basicDescription__title_name: "Clearview",
  basicDescription__title_description: "Chalet",
  basicDescription__aboutIt: "Nestled on the edge of the Notta&shy;wasaga Bay in Ontario, Canada, is the lovely Clearview Chalet. <br/> The stunning home was designed by AKB architect bureau.",
  additionalDescription__itemCategory: "Architecture",
  additionalDescription__itemPhotographyBy: "Shai Gil",
  additionalDescription__itemWrittenBy: "Jillian Japka",
  additionalDescription__itemPublishedOn: "9 november 2017"
}, {
  basicDescription__title_name: "The Gjovik",
  basicDescription__title_description: "House",
  basicDescription__aboutIt: "Arecent residence situated an hour outside of Oslo, Norway and designed by Norm Architects id an example of isolated architecture, so beautiful.",
  additionalDescription__itemCategory: "Architecture",
  additionalDescription__itemPhotographyBy: "Norm Architects",
  additionalDescription__itemWrittenBy: "Nhan Vo",
  additionalDescription__itemPublishedOn: "6 February 2018"
}, {
  basicDescription__title_name: "The Nook",
  basicDescription__title_description: "Chalet",
  basicDescription__aboutIt: "Located in a quiet area of the Eastern Townships in Quebec, the Nook Residence sits in continuity with the landscape in which it is part.",
  additionalDescription__itemCategory: "Architecture",
  additionalDescription__itemPhotographyBy: "Ulysse Bouchard",
  additionalDescription__itemWrittenBy: "Jenna McKnight",
  additionalDescription__itemPublishedOn: "3 June 2016"
}, {
  basicDescription__title_name: "The Atrium",
  basicDescription__title_description: "Chalet",
  basicDescription__aboutIt: "Atrium House es una casa de vacaciones para una familia de tres generaciones en la isla de Gotland, en el Mar Báltico. Está construida sobre una pequeña cresta que marca la antigua ubicación de la costa hace mil años.",
  additionalDescription__itemCategory: "Architecture",
  additionalDescription__itemPhotographyBy: "Ulysse Bouchard",
  additionalDescription__itemWrittenBy: "Jenna McKnight",
  additionalDescription__itemPublishedOn: "3 June 2016"
}];

exports.data = data;

},{}],4:[function(require,module,exports){
'use strict';

var _change = require('./change');

var _counter = require('./counter');

var _namespace = require('./namespace');

var _data = require('./data');

window.addEventListener('load', function () {

  var buttonPrev = document.querySelector('.control__prev');
  var buttonNext = document.querySelector('.control__next');

  for (var i = 1; i <= _data.data.length; i++) {
    var counter__step = document.createElement('div');
    counter__step.classList.add('counter__step');
    counter__step.innerHTML = '0' + i;
    _namespace.doc.counter__currentStep.appendChild(counter__step);
  }

  _namespace.doc.counter__allStep.innerHTML = '0' + _data.data.length;

  $('.slider').slick({
    arrows: false,
    draggable: false,
    infinite: false,
    speed: 400
  });

  function sliderPrev() {
    $('.slider').slick('slickPrev');
  }

  function sliderNext() {
    $('.slider').slick('slickNext');
  }

  function addListener() {
    buttonPrev.addEventListener('click', prev);
    buttonNext.addEventListener('click', next);
  }

  function removeListener() {
    buttonPrev.removeEventListener('click', prev);
    buttonNext.removeEventListener('click', next);
  }

  addListener();

  function prev() {
    if (_counter.counter === 0) return;

    removeListener();
    (0, _counter.counterPrev)();
    (0, _change.changeHtml)(_namespace.doc, _data.data);
    setTimeout(function () {
      sliderPrev();
    }, 700);
    setTimeout(function () {
      addListener();
    }, 1250);
  }

  function next() {
    if (_counter.counter === _data.data.length - 1) return;
    removeListener();
    (0, _counter.counterNext)();
    (0, _change.changeHtml)(_namespace.doc, _data.data);
    setTimeout(function () {
      sliderNext();
    }, 700);
    setTimeout(function () {
      addListener();
    }, 1250);
  }

  var prevSlide = void 0;
  $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    prevSlide = currentSlide;
    slick.$slides[nextSlide].classList.add('normalZoom');
  });
  $('.slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    slick.$slides[prevSlide].classList.remove('normalZoom');
    _namespace.doc.counter__currentStep.style.top = '-' + currentSlide * 16 + 'px';
  });
});

},{"./change":1,"./counter":2,"./data":3,"./namespace":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var doc = {
  basicDescription__title_name: document.querySelector('.basicDescription__title_name'),
  basicDescription__title_description: document.querySelector('.basicDescription__title_description'),
  basicDescription__aboutIt: document.querySelector('.basicDescription__about-it'),
  additionalDescription__itemCategory: document.querySelector('.additionalDescription__item-category .additionalDescription__item-value'),
  additionalDescription__itemPhotographyBy: document.querySelector('.additionalDescription__item-photographyBy .additionalDescription__item-value'),
  additionalDescription__itemWrittenBy: document.querySelector('.additionalDescription__item-writtenBy .additionalDescription__item-value'),
  additionalDescription__itemPublishedOn: document.querySelector('.additionalDescription__item-publishedOn .additionalDescription__item-value'),
  counter__currentStep: document.querySelector('.counter__currentStep'),
  counter__allStep: document.querySelector('.counter__allStep'),
  slider__item: document.querySelector('.slider__item')
};

exports.doc = doc;

},{}]},{},[4])

//# sourceMappingURL=main.js.map
