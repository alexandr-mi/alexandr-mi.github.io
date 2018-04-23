(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

window.addEventListener('load', function () {
  var $circle = $('.circle'),
      $papers = $('.paper'),
      $mail = $('.mail'),
      $mailBack = $('.mail-back__paper'),
      $mailFront = $('.mail-front__paper'),
      $check = $('.check');

  function mailAnimationShow() {
    $($mail).addClass('show');
    setTimeout(mailAnimationBack, 600);
    setTimeout(mailAnimationFront, 700);
  }

  function mailAnimationBack() {
    $($mailBack).addClass('animate');
  }

  function mailAnimationFront() {
    $($mailFront).addClass('animate');
  }

  function mailAnimationHide() {
    $($mail).addClass('hide');
  }

  function hidePapers() {
    $($papers).addClass('hide');
  }

  function checkAnimation() {
    $circle.animate({ width: '100px', height: '100px' }, 1000, 'easeOutBounce');
    $($check).addClass('show');
  }

  $($circle).on('click', function () {
    $($papers).addClass('folder');
    setTimeout(mailAnimationShow, 500);
    setTimeout(hidePapers, 1400);
    setTimeout(mailAnimationHide, 1600);
    setTimeout(checkAnimation, 2200);
  });
});

},{}]},{},[1])

//# sourceMappingURL=main.js.map
