var hero_text		= ".hero__facts li"
	hero__img		= ".hero__img"
	opacity			= "opacity"
	active			= "active"




$(document).ready( function () {
	addOpacity(1000);
	addActive(300, 1000)
	addActive(300, 7000)
	window.sr = ScrollReveal();
	sr.reveal('.advantages img', {viewFactor: 0.5, duration: 1000});
	sr.reveal('.header', { duration: 1000});
	sr.reveal('.advantages__head', { duration: 1000});
	sr.reveal('.advantages__line', { duration: 1000, delay: 500});
	sr.reveal('.advantages__mid ul li', {viewFactor: 0.2, duration: 1000, delay: 1000});
	sr.reveal('.btn__buy', {duration: 1000, delay: 1500});
	sr.reveal('.red__div', {viewFactor: 0.5, duration: 1000, delay: 0});
	sr.reveal('.checkers__img', {viewFactor: 0.5, duration: 1000, delay: 0});
	sr.reveal('.quote__text', {duration: 1000, delay: 0});

});

function heroAnimation(speedOpacity, speedActive, speedTimeout) {
	addOpacity(speedOpacity)
	setTimeout(function() {
		addActive(speedActive)
	}, speedTimeout)
}

function addOpacity(time) {
	let i = 0
	addOpacityID = setInterval(function() {
		if (i < 6) {
			$( hero_text ).eq(i).addClass( opacity );
			i++
		}
		else {
			clearInterval(addOpacityID)
		}
	}, time);
}

function addActive(interval, timeout) {
	setTimeout(function () {
		let i = 0,
		stop = 0;

		addActiveID = setInterval(function() {
			if (i == 0) {
				$( hero__img ).removeClass( active );
				$( hero__img ).eq(i).addClass( active );
				i++
				stop++
				if (stop > 8) {
					clearInterval(addActiveID)
				}
			}
			else if (i < 4) {
				$( hero__img ).removeClass( active );
				$( hero__img ).eq(i).addClass( active );
				if (i == 3) {
					i = 0
				}
				else {
					i++
				}
				stop++
			}
		}, interval);
	}, timeout)
}



function headerActive() {
	$('header').scroll(function() {
		alert('1')
		/*$('.advantages').addClass( opacity )*/
	})
}

