(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var body = document.querySelector('body');
var html = document.querySelector('html');

function addOverflowForPreloader() {
  body.style.overflow = 'hidden';
  html.style.overflow = 'hidden';
}

function removeOverflowForPreloader() {
  body.style.overflow = 'auto';
  html.style.overflow = 'auto';
}

addOverflowForPreloader();
window.onload = function (ev) {

  $(".hamburger-button").click(function() {
    $(this).toggleClass("active");
    $(".nav").toggleClass("active");
  });


  var $header = $('.header'),
    $upBtn = $('.up');
  $upBtn.on('click', function () {
    $(window).scrollTo( {top:'0px', left:'0px'} ,  500)
  });

  if ( window.pageYOffset > 0 ) {
    $header.addClass('scroll');
  }

  window.addEventListener('scroll', function(e) {
    if ( this.pageYOffset > 0 ) {
      $header.addClass('scroll');
    } else  {
      $header.removeClass('scroll');
    }

    if( this.pageYOffset > 100 ) {
      $upBtn.addClass('active');
    } else {
      $upBtn.removeClass('active');
    }
  });

  var $preloader = $('.preloader');
  $preloader.detach();
  removeOverflowForPreloader();
};


},{}]},{},[1])

//# sourceMappingURL=main_biography.js.map
