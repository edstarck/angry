$(function(){

    var user = detect.parse(navigator.userAgent);

    //Gamburger
    var McButton = $("[data=hamburger-menu]");
    var McBar1 = McButton.find("b:nth-child(1)");
    var McBar2 = McButton.find("b:nth-child(2)");
    var McBar3 = McButton.find("b:nth-child(3)");

    McButton.click( function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
        if (McButton.hasClass("active")) {
            McBar1.velocity({ top: "50%" }, {duration: 200, easing: "swing"});
            McBar3.velocity({ top: "50%" }, {duration: 200, easing: "swing"})
                  .velocity({rotateZ:"90deg"}, {duration: 800, delay: 200, easing: [500,20] });
            McButton.velocity({rotateZ:"135deg"}, {duration: 800, delay: 200, easing: [500,20] });
        } else {
            McButton.velocity("reverse");
            McBar3.velocity({rotateZ:"0deg"}, {duration: 800, easing: [500,20] })
                  .velocity({ top: "100%" }, {duration: 200, easing: "swing"});
            McBar1.velocity("reverse", {delay: 800});
        }
    });

    function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }
        else if (navigator.appName == 'Netscape')
        {
            var ua = navigator.userAgent;
            var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }
        return rv;
    }

    // Animation scene
    var el             = $('.animation'),
        el2            = $('.animation--ipad'),
        text           = $('.mac__text'),
        text2          = $('.mac__text2'),
        zoom           = el.css('background-size'),
        zoom           = (getInternetExplorerVersion()!==-1 || user.browser.family === 'Edge') ? zoom : parseFloat(zoom) / 100,
        zoom2          = el2.css('background-size'),
        zoom2          = (getInternetExplorerVersion()!==-1 || user.browser.family === 'Edge') ? zoom2 : parseFloat(zoom2) / 100,
        size           = zoom * el.width(),
        size2          = zoom2 * el2.width(),
        windowHeight   = $(window).height(),
        windowWidth    = $(window).width(),
        controller     = new ScrollMagic.Controller(),
        tween          = new TimelineMax();

    if(getInternetExplorerVersion()!==-1 || user.browser.family === 'Edge') {

    } else if(user.browser.family === 'Edge') {

    } else {
        var scene = new ScrollMagic.Scene({
            triggerElement: '.animation__wrap',
            triggerHook: 'onLeave',
            duration: "600%"
        })
        .setPin('.animation__wrap')
        .addTo(controller);

        if (windowHeight > 880) {
            scene.duration('380%');
        }
        if (windowHeight > 1400) {
            scene.duration('300%');
        }

        if(windowWidth < 1050) {
            scene.duration('0px');
            scene.removePin(true);
        }

        window.onresize = function () {
            var width = document.documentElement.clientWidth;
            if (width < 1050) {
                scene.removePin(true);
                scene.enabled(false);
                scene.duration('0px');
            } else {
                scene.setPin('.animation__wrap');
                scene.enabled(true);
                scene.duration('480%');
            }
        }

        window.onscroll = function() {
            var scrollHeight   = window.pageYOffset || document.documentElement.scrollTop,
                newSize        = size - (scrollHeight) * 1.2;

            // if (newSize > el.width()) {
                el.css({
                    '-webkit-background-size': newSize,
                    '-ms-background-size': newSize,
                    '-moz-background-size': newSize,
                    '-o-background-size': newSize,
                    'background-size': newSize
                });

                if(scrollHeight > 500) {
                    var opacity = 1 - (scrollHeight - 500) / 1000;
                    el.css({
                        webkitFilter: 'blur(' + ((scrollHeight - 500) / 100) + 'px)',
                        mozFilter: 'blur(' + ((scrollHeight - 500) / 100) + 'px)',
                        oFilter: 'blur(' + ((scrollHeight - 500) / 100) + 'px)',
                        msFilter: 'blur(' + ((scrollHeight - 500) / 100) + 'px)',
                        filter: 'blur(' + ((scrollHeight - 500) / 100) + 'px)',
                        'opacity': opacity
                    });
                    if(opacity <= 0.210) {
                        el.css({
                            'opacity': 0.2
                        });
                    }
                }
                if(scrollHeight > 900) {
                    text.css({
                        display: 'block',
                        opacity: 0 + ((scrollHeight - 900) / 300)
                    });
                } else {
                    text.css({
                        display: 'none',
                        opacity: 1 - ((scrollHeight - 900) / 300)
                    });
                }
            // }
            if(scrollHeight > 1500) {
                var newSize2 = size2 - (scrollHeight - 1400) * 1.5,
                    opacity2 = 0 + ((scrollHeight - 1400) / 700),
                    blur = 19;

                if (newSize2 > el2.width()) {
                    el2.css({
                        '-webkit-background-size': newSize2,
                        '-moz-background-size': newSize2,
                        '-o-background-size': newSize2,
                        'background-size': newSize2,
                        webkitFilter: 'blur(' + (blur - ((scrollHeight - 700) / 100)) + 'px)',
                        mozFilter: 'blur(' + ((blur - scrollHeight - 700) / 100) + 'px)',
                        oFilter: 'blur(' + ((blur - scrollHeight - 700) / 100) + 'px)',
                        msFilter: 'blur(' + ((blur - scrollHeight - 700) / 100) + 'px)',
                        filter: 'blur(' + ((blur - scrollHeight - 700) / 100) + 'px)',
                        'opacity': opacity2
                    });
                }
            } else {
                el2.css({
                    'opacity': 0
                });
            }
            if(scrollHeight > 2300) {
                if(getInternetExplorerVersion()!==-1 || user.browser.family === 'Edge') {
                    el.css({'opacity': 0});
                    text.css({'opacity': 0});
                    el2.css({'opacity': 1});
                    text2.css({'opacity': 1});
                } else {
                    el.remove();
                    text.remove();
                }
            } else {
                el.appendTo('.animation__wrap');
                text.appendTo('.animation__wrap');
            }
            if(scrollHeight > 3060) {
                var opacity3 = 1 - ((scrollHeight - 3000) / 800);
                el2.css({
                    webkitFilter: 'blur(' + ((scrollHeight - 2500) / 100) + 'px)',
                    mozFilter: 'blur(' + ((scrollHeight - 2500) / 100) + 'px)',
                    oFilter: 'blur(' + ((scrollHeight - 2500) / 100) + 'px)',
                    msFilter: 'blur(' + ((scrollHeight - 2500) / 100) + 'px)',
                    filter: 'blur(' + ((scrollHeight - 2500) / 100) + 'px)',
                    'opacity': opacity3
                });
                if(opacity3 <= 0.310) {
                    el2.css({
                        'opacity': 0.3
                    });
                }
            }
            if(scrollHeight > 3100) {
                text2.css({
                    display: 'block',
                    opacity: 0 + ((scrollHeight - 3100) / 300)
                    });
            } else {
                text2.css({
                    display: 'none',
                    opacity: 1 - ((scrollHeight - 3100) / 300)
                });
            }
        }
    }

    // Slider
    var sceneSlider = new ScrollMagic.Scene({
        triggerElement: '.package',
        triggerHook: '50%',
        offset: '250px',
        duration: "100%"
    })
    .on('start', function () {
        var swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            speed: 600,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
            bulletClass: 'package__slider-item',
            bulletActiveClass: 'active',
            paginationClickable: false,
            slidesPerView: 1,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            loop: true,
            preloadImages: false,
            lazyLoading: true,
            paginationBulletRender: function (index, className) {
                var tabsName = ['Администирование on-the-go', 'Статистика по филиалам', 'Умный поиск внутри бренда'];
                return '<span class="' + className + '">' + tabsName[index] + '</span>';
            }
        });
    })
    //.addIndicators()
    .addTo(controller);

    // MagickScroll (scroll to id)
    var controller = new ScrollMagic.Controller();
        controller.scrollTo(function (newpos) {
        TweenMax.to(window, 1.2, {scrollTo: {y: newpos}, ease:Power2.easeOut});
    });

    $('.link-scroll[href^="#"]').on("click", function (e) {
        var id = $(this).attr("href");
        if ($(id).length > 0) {
            e.preventDefault();
            controller.scrollTo(id);
        }
    });

    $('.link-scroll__down').on('click', function(e){
        e.preventDefault();
        if(getInternetExplorerVersion()!==-1 || user.browser.family === 'Edge') {
            if (windowHeight > 1700) {
                TweenMax.to(window, 1.2, {scrollTo: {y: 1800}, ease:Power2.easeOut});
            } else if (windowHeight > 1400) {
                TweenMax.to(window, 1.2, {scrollTo: {y: 1440}, ease:Power2.easeOut});
            } else if (windowHeight > 1050) {
                TweenMax.to(window, 1.2, {scrollTo: {y: 1080}, ease:Power2.easeOut});
            } else if (windowHeight > 850) {
                TweenMax.to(window, 1.2, {scrollTo: {y: 900}, ease:Power2.easeOut});
            } else if (windowHeight > 750) {
                TweenMax.to(window, 1.2, {scrollTo: {y: 768}, ease:Power2.easeOut});
            } else if (windowHeight > 600) {
                TweenMax.to(window, 1.2, {scrollTo: {y: 650}, ease:Power2.easeOut});
            }
        } else {
            TweenMax.to(window, 1.2, {scrollTo: {y: 1300}, ease:Power2.easeOut});
        }
    });

    //Parallax
    var rellax = new Rellax('.package__wrap--red', {
        speed: 10
    });
    var rellax2 = new Rellax('.package__wrap--gray', {speed: 3});

    //form
    $('#try-form').on('submit', function(event) {
        event.preventDefault();
        var data = {
            company: $('#company').val(),
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val()
        }
        if ( data.company && (data.email || data.phone || data.name) ) {
          $.post('/send/', data).then(function(json) {
            if ( 'success' == json.status ) {
                $('#try-form').removeClass('form-error');
                $('#success-message').show();
                $('#company').val('');
                $('#name').val('');
                $('#phone').val('');
                $('#email').val('');
            }
          })
        } else {
            $('#try-form').addClass('form-error');
        }
    })

  //SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
        return $(this).attr("src").replace(".svg", ".png");
    });
  };

  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

// Overlay
(function() {
  var triggerBttn = $('.trigger-overlay'),
    overlay = document.querySelector( 'div.overlay' ),
    closeBttn = $('.link-scroll--inner');
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.add( overlay, 'close' );
      $('html').css('overflow', 'auto');
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close' ) ) {
      classie.add( overlay, 'open' );
      $('html').css('overflow', 'hidden');
    }
  }

  triggerBttn.bind( 'click', toggleOverlay );
  closeBttn.bind( 'click', toggleOverlay );
  closeBttn.bind('click', function(){
    var McButton = $("[data=hamburger-menu]");
    var McBar1 = McButton.find("b:nth-child(1)");
    var McBar2 = McButton.find("b:nth-child(2)");
    var McBar3 = McButton.find("b:nth-child(3)");

    McButton.toggleClass("active");
    if (McButton.hasClass("active")) {
      McBar1.velocity({ top: "50%" }, {duration: 200, easing: "swing"});
      McBar3.velocity({ top: "50%" }, {duration: 200, easing: "swing"})
            .velocity({rotateZ:"90deg"}, {duration: 800, delay: 200, easing: [500,20] });
      McButton.velocity({rotateZ:"135deg"}, {duration: 800, delay: 200, easing: [500,20] });
    } else {
      McButton.velocity("reverse");
      McBar3.velocity({rotateZ:"0deg"}, {duration: 800, easing: [500,20] })
            .velocity({ top: "100%" }, {duration: 200, easing: "swing"});
      McBar1.velocity("reverse", {delay: 800});
    }
  })
})();

// ymaps.ready(init);
// var map;
// function init() {
//     ymaps.geocode("Москва, Шухова 14").then(function(res) {
//         var coords = res.geoObjects.get(0).geometry.getCoordinates(),
//             map    = new ymaps.Map("map", {
//                 center: coords,
//                 zoom: 17,
//                 controls: ['zoomControl']
//             });
//         map.behaviors.disable('scrollZoom');
//         map.behaviors.disable('multiTouch');
//         map.behaviors.disable('drag');
//         var point = new ymaps.Placemark(coords, {
//             hintContent: 'Офис Энгри',
//             balloonContent: 'ул. Шухова, 14'
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/icons/angry_rubin.svg',
//             iconImageSize: [132, 115],
//             iconImageOffset: [-50, -120]
//         });
//         map.geoObjects.add(point);
//     })
// }

$("#loading").fadeOut();
$('body').removeClass('overflow');
