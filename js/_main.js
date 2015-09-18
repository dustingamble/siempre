 /**
 * This demo was prepared for you by Petr Tichy - Ihatetomatoes.net
 * Want to see more similar demos and tutorials?
 * Help by spreading the word about Ihatetomatoes blog.
 * Facebook - https://www.facebook.com/ihatetomatoesblog
 * Twitter - https://twitter.com/ihatetomatoes
 * Google+ - https://plus.google.com/u/0/109859280204979591787/about
 * Article URL: http://ihatetomatoes.net/simple-parallax-scrolling-tutorial/
 */

$(function() {

	// Setup variables
	var $window = $(window),
      $body = $('body'),
      $slides = $('.slide'),
      $slideBg = $slides.find('.bcg'),
      $homeBg = $(".bg"),
      scenes = [],
      isMoving = false;

  $body.imagesLoaded(function() {

    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onCenter'
      }
    });

    // create scene for every slide
    $slides.each(function(index ,slide) {
      scenes['scene'+index] = new ScrollMagic.Scene({
        triggerElement: slide,
        duration: getEndOfSlide
      })
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    });

    // Customize each scene
    scenes['scene0']
      .on('enter', function() {
        // Intro animation
        $('#first').delay(1000).fadeIn(3500);
        $('#second').delay(1300).fadeIn(3500);
        $('#third').delay(1600).fadeIn(3500);
      })
      .on('leave', function() {
        $('#first').delay(1000).fadeOut(3500);
        $('#second').delay(1300).fadeOut(3500);
        $('#third').delay(1600).fadeOut(3500);
      });

    // Fade in sections
    $body.removeClass('loading').addClass('loaded');

    $homeBg.interactive_bg();

    bindEvents();
	});

  function getEndOfSlide() {
    var winH = $window.height();
    return winH - (winH/100) * 25;
  }

  function requestScroll() {
    if(!isMoving) {
      window.requestAnimationFrame(function() {
      });
      isMoving = true;
    }
  }

  function bindEvents() {
    $window.on('resize', _.debounce(function() {
      adjustWindow();
      $homeBg.interactive_bg();
    }));
    $window.on('scroll', requestScroll);
  }

	function adjustWindow() {

		// Get window size
    winH = $window.height();

    // Keep minimum height 550
    if(winH <= 550) {
			winH = 550;
		}

    // Resize our slides
    $slide.height(winH);
	}

});

//(function($) {
//
//	// Setup variables
//	$window = $(window);
//	$slide = $('.homeSlide');
//	$body = $('body');
//  $homeBg = $(".bg");
//
//  // FadeIn all sections
//	$body.imagesLoaded( function() {
//		setTimeout(function() {
//
//      // Resize sections
//      adjustWindow();
//
//      // Fade in sections
//      $body.removeClass('loading').addClass('loaded');
//
//      bindResizeEvent();
//
//		}, 800);
//
//    $homeBg.interactive_bg();
//	});
//
//  function bindResizeEvent() {
//    $(window).on('resize', _.debounce(function() {
//      adjustWindow();
//      $homeBg.interactive_bg();
//    }));
//  }
//
//	function adjustWindow() {
//
//		// Init Skrollr
//
//
//		// Get window size
//    winH = $window.height();
//
//    // Keep minimum height 550
//    if(winH <= 550) {
//			winH = 550;
//		}
//
//    // Resize our slides
//    $slide.height(winH);
//
//    // Refresh Skrollr after resizing our sections
//
//	}
//
//})( jQuery );