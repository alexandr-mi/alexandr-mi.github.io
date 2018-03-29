window.addEventListener('load', function() {
	var nav = $('.hero__nav');
	nav.addClass('hero__nav_up');
	$(window).on('scroll', function() {
		if (window.scrollY < 100) {
			nav.addClass('hero__nav_up')
		}
		else {
			nav.removeClass('hero__nav_up')
		}
	});

	$(".reviews-slider").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,
	});
	$(".hamburger-button").click(function() {
		if(this.classList.contains("active") === true) {
			$(".hamburger-button").removeClass("active");
			$(".nav").slideUp(500);
		}
		else {
			$(this).toggleClass("active");
			$(".nav").slideDown(500);
		};
	})
	window.sr = ScrollReveal({});
	window.sr_bottom = ScrollReveal({ duration: 1500, distance: '100%',});
	sr.reveal('.present__left', { duration: 1500, distance: '0px', delay: 400});
	sr.reveal('.page-part__caption', { duration: 800, distance: '0px',});
	sr.reveal('.page-part__border', { duration: 800, distance: '0px', delay: 250 });
	sr.reveal('.page-part__description', { duration: 800, distance: '0px', delay: 500 });
	sr.reveal('.app__capabilities', { duration: 800, distance: '0px', delay: 750 });
	sr.reveal('.features__left', { duration: 1500, origin: 'left', distance: '100%',});
	sr.reveal('.features__right', { duration: 1500, origin: 'right', distance: '100%',});
	sr_bottom.reveal('.features__mid');
	sr_bottom.reveal('.present__right');
	sr_bottom.reveal('.app__left');
	sr_bottom.reveal('.design__main', {delay: 300});




	var scrollBtn = $('[data-scroll]');
	var navBtn = $('[data-nav]');
	var scrollAllBlock = [];
	var windowHeight = window.innerHeight;


	for (var i = 0; i < navBtn.length; i++) {
		scrollAllBlock[i] = $(navBtn[i].getAttribute('href')).offset().top;
	}

	function scrollPage() {
		var thisScrollBtn = 0;
		$(navBtn).removeClass( 'active' )
		for (var i = 0; i < scrollAllBlock.length; i++) {
			if (($(window).scrollTop()+windowHeight/2) > scrollAllBlock[i]) {
				thisScrollBtn = i;
			}
		}
		var navBtnHref = navBtn[thisScrollBtn].getAttribute('href');

		$(navBtn).filter(function(index) {
			return $(this).attr('href') === navBtnHref;
		}).addClass( 'active' );
	}

	scrollPage();

	scrollBtn.on('click', function(e) {
		e.preventDefault();
		var elementToScroll = $(this.getAttribute('href')).offset().top;
		$("body").animate({scrollTop:elementToScroll - 80}, '1000');

	})

	$(window).on('scroll', function() {
		scrollPage();
	})
});