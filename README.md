# Source

The default theme for [Ghost](http://github.com/tryghost/ghost/). This is the latest development version of Source! If you're just looking to download the latest release, head over to the [releases](https://github.com/TryGhost/Source/releases) page.

This repository contains a **customized version for CycleWR**, with a home-page image carousel, category posts section, and Get Involved component. See [CycleWR customizations](#cyclewr-customizations) below.

&nbsp;

# CycleWR customizations

The following changes have been made on top of the base Source theme:

- **Home page image carousel** – A full-width image carousel on the home page built with [Splide](https://splidejs.com/). Each slide has a full-height image plus heading and subheading. The carousel uses the `gh-home-carousel`, `gh-home-splide`, and `gh-home-slide` class names, with Splide CSS in `assets/css/splide/` and initialization in `default.hbs` (inline) and `assets/js/carousel.js`. It is responsive, supports autoplay, arrows, pagination, keyboard and drag, and uses the sea-green Splide theme.
- **Category posts component** – A reusable partial that shows the latest 3 posts for a given tag (category). Used on the home page as “Latest from Advocacy” with configurable `tagSlug` and optional `title`. See `partials/components/category-posts.hbs`. The section title styling was updated for consistency with the rest of the theme.
- **Get Involved component** – A home page section (`partials/components/get-involved.hbs`) that lists “ways to get involved” from **posts with a specific tag** (e.g. `get-involved`). Each post is shown as a card: post **title** = card title, post **excerpt** = body text, post **URL** = “Learn more” link. Configure the tag in Ghost Admin → Design → Customize → Get Involved (`get_involved_tag`); the section heading is optional (`get_involved_heading`). No per-item custom configs needed.
- **Latest post section** – The theme’s latest-post area was updated for layout and styling consistency.
- **Theme configuration** – Theme settings were extended to support the category-posts block and related options (e.g. `post_feed_style`, header style).
&nbsp;

# First time using a Ghost theme?

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes.

This theme has lots of code comments to help explain what's going on just by reading the code. Once you feel comfortable with how everything works, we also have full [theme API documentation](https://ghost.org/docs/themes/) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The parent template file, which includes your global header/footer
- `home.hbs` - The homepage
- `index.hbs` - The main template to generate a list of posts
- `post.hbs` - The template used to render individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives, eg. "all posts tagged with `news`"
- `author.hbs` - Used for author archives, eg. "all posts written by Jamie"

One neat trick is that you can also create custom one-off templates by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for an `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive


# Development

Source styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# install dependencies
yarn install

# run development server
yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
# create .zip file
yarn zip
```

# PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.


# SVG Icons

Source uses inline SVG icons, included via Handlebars partials. You can find all icons inside `/partials/icons`. To use an icon just include the name of the relevant file, eg. To include the SVG icon in `/partials/icons/rss.hbs` - use `{{> "icons/rss"}}`.

You can add your own SVG icons in the same manner.


# Copyright & License

Copyright (c) 2013-2025 Ghost Foundation - Released under the [MIT license](LICENSE).
