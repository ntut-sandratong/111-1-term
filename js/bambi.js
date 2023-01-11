window.show_loading = function() {
    $('.loading').addClass('active');
    $('body').css('overflow', 'hidden');
}

window.hide_loading = function() {
    $('.loading').removeClass('active');
    $('body').removeAttr('style');
}

$(document).ready(function() {

    $('.js-popup').magnificPopup({
        removalDelay: 300,
        type: 'inline',
        mainClass: 'mfp-zoom-in',
        preloader: false,
        modal: false,
        fixedContentPos: true,
        callbacks: {
            beforeOpen: function() {
                console.log("before open");
                if(this.st.el.attr('data-effect')) {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
        }
    });

    $('.offcanvas.offcanvas-end').removeClass('d-none').addClass('.d-flex');

    $(".back-to-top").click(function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    $(".js-banner-carousel").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        autoplay: true,
        fade: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        adaptiveHeight: true,
        cssEase: "linear",
    });


    start_slick();
    function start_slick() {
        slick_common();
        slick_access();
    }

    function slick_common() {
        console.log('slick common: ', $(window).width());
        if($(window).width() >= 768 && $('.js-md-common-carousel.slick-initialized').length > 0) {
            $('.js-md-common-carousel').slick('unslick');
        }
        if($(window).width() < 768) {
            $('.js-md-common-carousel').slick({
                dots: true,
                arrows: false,
                infinite: true,
                speed: 300,
                autoplay: true,
                // fade: true,
                autoplaySpeed: 3000,
                slidesToShow: 1,
                adaptiveHeight: true,
                // cssEase: "linear",
                mobileFirst: true,
                centerMode: true,
                centerPadding: '40px',
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: "unslick"
                    },
                ]
            });
        }
    }

    function slick_access() {
        if($(window).width() >= 768 && $('.js-md-access-carousel.slick-initialized').length > 0) {
            $('.js-md-access-carousel').slick('unslick');
        }
        if($(window).width() < 768) {
            $('.js-md-access-carousel').slick({
                dots: true,
                arrows: false,
                infinite: true,
                speed: 300,
                autoplay: true,
                // fade: true,
                autoplaySpeed: 3000,
                slidesToShow: 1,
                adaptiveHeight: false,
                // cssEase: "linear",
                mobileFirst: true,
                centerMode: true,
                centerPadding: '40px',
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: "unslick"
                    },
                ]
            });
        }
    }

    $(".js-selected-carousel").slick({
        speed: 9000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
        dots: false,
        arrows: false,
    });

    $(window).resize(start_slick);

    gsap.registerPlugin(ScrollTrigger);

    const title_underline = gsap.utils.toArray('.title-underline');
    title_underline.forEach((line) => {
        gsap.from(line, {
            scrollTrigger: {
                start: 'center 90%',
                end: 'bottom top',
                trigger: line,
                toggleClass: 'active',
                // scrub: true,
                // markers: true,
            }
        });
    });
    const animal_bg = gsap.utils.toArray('.animal__wrapper');
    animal_bg.forEach((bg) => {
        gsap.from(bg, {
            scrollTrigger: {
                start: 'top bottom',
                end: 'bottom top',
                trigger: bg,
                toggleClass: 'active',
                // scrub: true,
                // markers: true,
            }
        });
    });

    const animal_img = gsap.utils.toArray('.animal__img');
    animal_img.forEach((img) => {
        gsap.from(img, {
            scrollTrigger: {
                start: 'top bottom',
                end: 'bottom top',
                trigger: img,
                toggleClass: 'active',
                // scrub: true,
                // markers: true,
            }
        });
    });
    const scroll_fade = gsap.utils.toArray('.gsap-scroll-fade');
    scroll_fade.forEach((img) => {
        gsap.from(img, {
            scrollTrigger: {
                start: 'top bottom',
                end: 'bottom top',
                trigger: img,
                toggleClass: 'active',
                // scrub: true,
                // markers: true,
            }
        });
    });

    const tl = new TimelineMax();

    tl.staggerFromTo(".gsap-fadein", 0.3, {
        opacity: 0,
        y: 100
    }, {
        opacity: 1,
        y: 0
    }, .25);

    $(window).scroll(function(){
        if($(this).scrollTop()>=200){
            $('.back-to-top').addClass('active');
            $('nav').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
            $('nav').removeClass('active');
        }
    });

});