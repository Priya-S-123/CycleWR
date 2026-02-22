/* Home page Splide carousel */
(function () {
    const carousel = document.querySelector('.gh-home-splide');
    if (!carousel || typeof Splide === 'undefined') return;

    new Splide('.gh-home-splide', {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: 0,
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        pauseOnFocus: true,
        arrows: true,
        pagination: true,
        paginationKeyboard: true,
        speed: 400,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        drag: true,
        keyboard: true,
        i18n: {
            prev: 'Previous slide',
            next: 'Next slide',
            first: 'Go to first slide',
            last: 'Go to last slide',
            slideX: 'Go to slide %s',
            pageX: 'Page %s',
            play: 'Start autoplay',
            pause: 'Pause autoplay'
        }
    }).mount();
})();
