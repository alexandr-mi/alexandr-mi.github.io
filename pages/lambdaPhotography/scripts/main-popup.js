(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

$(function (e) {
	$('.gallery__item').magnificPopup({
		type:'image',
		gallery: {
				enabled: true, // set to true to enable gallery

				preload: [0,2], // read about this option in next Lazy-loading section

				navigateByImgClick: true,

				arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

				tPrev: 'Previous', // title for left button
				tNext: 'Next', // title for right button
				tCounter: '<span class="mfp-counter"></span>',
			},
		removalDelay: 100,
		mainClass: 'mfp-fade',
	});
});
},{}]},{},[1])

//# sourceMappingURL=main-popup.js.map
