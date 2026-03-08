/**
 * Category posts embed – finds .gh-category-posts-embed in page content,
 * fetches top N posts by tag via Ghost Content API, renders them in a grid.
 * Add this to the page content via the "HTML" block.
 */
(function () {
    function runEmbed(el) {
        var tag = el.getAttribute('data-tag') || '';
        var limit = parseInt(el.getAttribute('data-limit'), 10) || 6;
        var title = el.getAttribute('data-title') || 'Latest posts';
        var apiKey = el.getAttribute('data-api-key') || '';
        var noImage = el.getAttribute('data-no-image') === 'true';
        var feed = el.querySelector('.gh-feed');
        var titleEl = el.querySelector('.gh-container-title');
        var section = el.querySelector('.gh-container');

        if (!feed) return;
        if (titleEl) titleEl.textContent = title;
        if (section && noImage) section.classList.add('no-image');

        if (!tag || !apiKey) {
            feed.innerHTML = '<p>Set data-tag and data-api-key on the embed.</p>';
            return;
        }

        var base = window.location.origin;
        var url = base + '/ghost/api/v3/content/posts/?filter=tag:' + encodeURIComponent(tag) +
            '&limit=' + limit + '&key=' + encodeURIComponent(apiKey) +
            '&include=authors&fields=id,title,url,feature_image,feature_image_alt,custom_excerpt,excerpt,published_at,primary_tag';

        fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var posts = data.posts || [];
                feed.innerHTML = '';
                if (posts.length === 0) {
                    feed.innerHTML = '<p>No posts found for this category.</p>';
                    return;
                }
                /* Build each post as a gh-card – same structure as partials/post-card.hbs for theme styling */
                posts.forEach(function (p) {
                    var card = document.createElement('article');
                    card.className = 'gh-card' + (noImage ? ' no-image' : '');
                    var img = !noImage && p.feature_image
                        ? '<figure class="gh-card-image"><img src="' + (p.feature_image || '').replace(/"/g, '&quot;') + '" alt="' + (p.feature_image_alt || p.title || '').replace(/"/g, '&quot;') + '" loading="lazy"></figure>'
                        : '';
                    var tagName = (p.primary_tag && p.primary_tag.name)
                        ? '<p class="gh-card-tag">' + p.primary_tag.name + '</p>'
                        : '';
                    var raw = (p.custom_excerpt || p.excerpt || '').replace(/<[^>]+>/g, '').trim();
                    var excerpt = p.custom_excerpt ? raw : (raw.length > 160 ? raw.substring(0, 160) + '…' : raw);
                    var excerptHtml = excerpt
                        ? '<p class="gh-card-excerpt is-body">' + excerpt.replace(/</g, '&lt;').replace(/"/g, '&quot;') + '</p>'
                        : '';
                    var dateStr = '';
                    if (p.published_at) {
                        var d = new Date(p.published_at);
                        dateStr = '<time class="gh-card-date" datetime="' + d.toISOString().slice(0, 10) + '">' + d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + '</time>';
                    }
                    var authors = (p.authors || []).map(function (a) { return a.name; }).join(', ');
                    var authorHtml = authors ? '<span class="gh-card-author">By ' + authors + '</span>' : '';
                    var titleHtml = '<h3 class="gh-card-title is-title"><a href="' + (p.url || '#').replace(/"/g, '&quot;') + '">' + (p.title || '').replace(/</g, '&lt;') + '</a></h3>';
                    card.innerHTML = '<div class="gh-card-link">' + img + '<div class="gh-card-wrapper">' + tagName + titleHtml + excerptHtml + '<footer class="gh-card-meta">' + authorHtml + dateStr + '</footer></div></div>';
                    feed.appendChild(card);
                });
            })
            .catch(function () {
                feed.innerHTML = '<p>Could not load posts. Check the API key and tag slug.</p>';
            });
    }

    function init() {
        var embeds = document.querySelectorAll('.gh-category-posts-embed');
        embeds.forEach(runEmbed);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
