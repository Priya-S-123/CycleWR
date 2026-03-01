/**
 * Image carousel (snippet → Splide)
 *
 * Finds any element with class "image-carousel" (e.g. from a Ghost custom snippet)
 * that contains product cards (image + title + description), and converts it into
 * a Splide carousel using the same layout as gh-home-carousel (gh-home-slide structure).
 *
 * Snippet structure: root with class "image-carousel", children are cards. Each card
 * can have class "product-card" or be any direct child; we use first img, first
 * heading (h1–h4) or .product-title, and first p or .product-description.
 */
(function () {
    if (typeof Splide === 'undefined') return;

    var SPLIDE_OPTIONS = {
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
    };

    function getCards(container) {
        var byClass = container.querySelectorAll('.product-card');
        if (byClass.length > 0) return Array.prototype.slice.call(byClass);
        var children = [];
        for (var i = 0; i < container.children.length; i++) {
            var el = container.children[i];
            if (el.querySelector('img') || el.querySelector('h1, h2, h3, h4') || el.querySelector('p')) {
                children.push(el);
            }
        }
        return children;
    }

    function getSlideData(card) {
        var img = card.querySelector('img');
        var titleEl = card.querySelector('.product-title') || card.querySelector('h1, h2, h3, h4');
        var descEl = card.querySelector('.product-description') || card.querySelector('p');
        return {
            imgSrc: img ? img.getAttribute('src') || '' : '',
            imgAlt: img ? (img.getAttribute('alt') || '') : '',
            title: titleEl ? titleEl.textContent.trim() : '',
            description: descEl ? descEl.innerHTML.trim() : ''
        };
    }

    function buildSlide(data) {
        var li = document.createElement('li');
        li.className = 'splide__slide';
        li.innerHTML =
            '<div class="gh-home-slide">' +
                '<div class="gh-home-slide-image">' +
                    '<img src="' + (data.imgSrc || '').replace(/"/g, '&quot;') + '" alt="' + (data.imgAlt || '').replace(/"/g, '&quot;') + '">' +
                '</div>' +
                '<div class="gh-home-slide-text">' +
                    '<h2 class="gh-home-slide-heading">' + (data.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</h2>' +
                    '<div class="gh-home-slide-subheading">' + (data.description || '') + '</div>' +
                '</div>' +
            '</div>';
        return li;
    }

    function initImageCarousels() {
        var containers = document.querySelectorAll('.image-carousel');
        Array.prototype.forEach.call(containers, function (container, index) {
            var cards = getCards(container);
            if (cards.length === 0) return;

            container.classList.add('gh-home-carousel', 'gh-outer', 'kg-width-full');

            /* If the snippet is nested (e.g. inside a wrapper), move to be a direct child of
             * .gh-canvas so the grid’s kg-width-full rule applies and the carousel spans full width. */
            var canvas = container.closest('.gh-canvas');
            if (canvas && container.parentElement !== canvas) {
                var wrapper = container.parentElement;
                canvas.insertBefore(container, wrapper);
                if (wrapper && !wrapper.children.length) {
                    wrapper.parentNode.removeChild(wrapper);
                }
            }

            var inner = document.createElement('div');
            inner.className = 'gh-inner';

            var splideId = 'image-carousel-splide-' + index;
            var splideEl = document.createElement('div');
            splideEl.className = 'splide gh-home-splide';
            splideEl.id = splideId;
            splideEl.setAttribute('aria-label', 'Image carousel');

            var track = document.createElement('div');
            track.className = 'splide__track';
            var list = document.createElement('ul');
            list.className = 'splide__list';

            cards.forEach(function (card) {
                var data = getSlideData(card);
                list.appendChild(buildSlide(data));
            });

            track.appendChild(list);
            splideEl.appendChild(track);
            inner.appendChild(splideEl);
            container.innerHTML = '';
            container.appendChild(inner);

            var splide = new Splide('#' + splideId, SPLIDE_OPTIONS);
            splide.on('mounted', function () {
                var listEl = splideEl.querySelector('.splide__pagination');
                var realCount = splide.length;
                if (listEl && realCount) {
                    var items = listEl.querySelectorAll('li');
                    for (var i = realCount; i < items.length; i++) {
                        items[i].remove();
                    }
                }
            });
            splide.mount();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageCarousels);
    } else {
        initImageCarousels();
    }
})();
