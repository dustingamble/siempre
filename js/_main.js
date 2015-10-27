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
      isMoving = false,
      winH;

  $body.imagesLoaded(function() {

    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onCenter'
      }
    });

    // create scene for every slide
    $slides.each(function(index ,slide) {
      var $slide = $(slide),
          offsetStart = parseFloat($slide.attr('data-offset-start')),
          offsetEnd = parseFloat($slide.attr('data-offset-end'));
      scenes['scene'+index] = new ScrollMagic.Scene({
        triggerElement: slide,
        offset: getStartOfSlider(offsetStart),
        duration: getEndOfSlide(offsetEnd, getStartOfSlider(offsetStart)),
        tweenChanges: true
      })
        //.addIndicators() // add indicators (requires plugin)
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

    var $sceneTitleContainer = $('#slide-1 h2'),
        inScene1 = new TimelineMax()
          .add(TweenMax.fromTo("#slide-1 .bottle", 2, {bottom: 50}, {bottom: -36}))
          .add(TweenMax.fromTo("#thisIs", 1.5, {
              css: {
                transform: "translate3d(0px, 50px, 0px)",
                opacity: 0
              }
            },
            {
              css: {
                transform: "translate3d(0px, 0px, 0px)",
                opacity: 1.3
              }
            }
          ), '.5');
    scenes['scene1']
      .on('leave', function() {
        $sceneTitleContainer.addClass('out');
      })
      .on('enter', function() {
        $sceneTitleContainer.removeClass('out');
      })
      .on('progress', function(e) {
        /*
        if (e.state === 'DURING') {

          // 25 = start
          // 75 = end
          var offset = e.progress < .5 ? .25 : .2,
              opacity = (e.progress - offset) * 2;
          console.log(e.progress);
          console.log("opacity", opacity);
          $scene1Title.css('opacity', opacity);
        }
        */
      })
      .setTween(inScene1);

    var winHeight = $window.height(),
        inScene2 =  new TimelineMax();
    inScene2
      .set('#slide-2 .always-text', {
        css: {
          transform: 'translate3d(0px, -'+winHeight+'px, 0px)'
        }
      })
      .set('#slide-2 .always-bottle', {
        css: {
          transform: 'translate3d(0px, '+winHeight+'px, 0px)'
        }
      })
      .add(TweenMax.fromTo("#slide-2 .always-text", .75, {
          css: {
            transform: 'translate3d(0px, -'+winHeight+'px, 0px)'
          },
          ease: Power2.easeOut
        },
        {
          css: {
            transform: 'translate3d(0px, 0px, 0px)'
          },
          ease: Power2.easeOut
        }
      ), '-=1.5')
      .add(TweenMax.fromTo("#slide-2 .always-text", .75, {
          css: {
            transform: 'translate3d(0px, 0px, 0px)'
          },
          ease: Power2.easeOut
        },
        {
          css: {
            transform: 'translate3d(0px, '+winHeight+'px, 0px)'
          },
          ease: Power2.easeOut
        }
      ))
      .add(TweenMax.fromTo("#slide-2 .always-bottle", .75, {
          css: {
            transform: 'translate3d(0px, '+winHeight+'px, 0px)'
          },
          ease: Power2.easeOut
        },
        {
          css: {
            transform: 'translate3d(0px, 0px, 0px)'
          },
          ease: Power2.easeOut
        }
      ), '-=2')
      .add(TweenMax.fromTo("#slide-2 .always-bottle", .75, {
          css: {
            transform: 'translate3d(0px, 0px, 0px)'
          },
          ease: Power2.easeOut
        },
        {
          css: {
            transform: 'translate3d(0px, -'+winHeight+'px, 0px)'
          },
          ease: Power2.easeOut
        }
      ), '-=.75');
    scenes['scene2']
      .setTween(inScene2);


    var $sceneTitleContainer = $('#slide-3 h2'),
        inScene3 =  new TimelineMax();
    inScene3
      .add(TweenMax.fromTo("#slide-3 #craftedText", 1, {opacity: 0}, {opacity: 1}));

    scenes['scene3']
      .setTween(inScene3)
      .on('leave', function() {
        $sceneTitleContainer.addClass('out');
      })
      .on('enter', function() {
        $sceneTitleContainer.removeClass('out');
      })

    // Fade in sections
    $body.removeClass('loading').addClass('loaded');

    $homeBg.interactive_bg();

    bindEvents();
	});

  function getStartOfSlider(percent) {
    var winH = $window.height();
    return (winH/100) * percent;
  }

  function getEndOfSlide(percent, offset) {
    var winH = $window.height(),
        offset = offset || 0;
    return winH - offset - (winH/100) * percent;
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