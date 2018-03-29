(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

$(function (e) {
	var $carouselImg	= $('.hero__img'),
		$prev			= $('.hero__btn_prev'),
		$next			= $('.hero__btn_next'),
		$timeLine		= $('.hero__timeLine');

	var slider = new Slider({
		images : $carouselImg,
		prev: $prev,
		next: $next,
		autoPlay : true,
		autoPlayDelay : 3000,
	})

	function Slider(options) {

		var slider = this, 
			i = 0,
			autoPlayTimer;

		slider.images = $(options.images);
		slider.prev = $(options.prev);
		slider.next = $(options.next);
		slider.autoPlay = options.autoPlay;
		slider.autoPlayDelay = options.autoPlayDelay;

		slider.prev.on('click', function() {
			clearInterval(autoPlayTimer);
			clickPrev();
			valueAutoPlayTimer();
		});

		slider.next.on('click', function() {
			clearInterval(autoPlayTimer);
			clickNext();
			valueAutoPlayTimer();
		});

		if (slider.autoPlay) {
			autoPlayTimer = setInterval(function(e) {
				clickNext();
			}, slider.autoPlayDelay);
		}

		function valueAutoPlayTimer(e) {
			autoPlayTimer = setInterval(function(e) {
				clickNext();
			}, slider.autoPlayDelay);
		}

		function clickPrev() {
			removeClassItActive();
			i--;
			checkForClickPrev();
			addClassItActive();
		}

		function clickNext() {
			removeClassItActive();
			i++;
			checkForClickNext();
			addClassItActive();
		}


		function addClassItActive() { $(slider.images).eq(i).fadeIn(500);}


		function removeClassItActive() { $(slider.images).eq(i).fadeOut(500);}

		function checkForClickPrev() {
			if (i < 0) {
				i = slider.images.length - 1;
			}
		}

		function checkForClickNext() {
			if (i == slider.images.length) {
				i = 0;
			}
		}
	};
});
},{}]},{},[1])

//# sourceMappingURL=main-slider.js.map
