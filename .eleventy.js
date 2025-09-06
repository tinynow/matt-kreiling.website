const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const eleventySass = require("eleventy-sass");
const Image = require("@11ty/eleventy-img");
// const StyleDictionary = require('style-dictionary').extend({
//     source: ['src/_data/tokens.js'],
//     platforms: {
//         scss: {
//             transformGroup: 'css', //https://amzn.github.io/style-dictionary/#/transform_groups?id=css
//             buildPath: 'src/css/',
//             files: [{
//                 destination: 'customProperties.scss',
//                 format: 'css/variables',
//             }]
//         }
//     }
// });

module.exports = function (eleventyConfig) {
    // Copy the folders to the output
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/fonts");
    // Add plugins
    eleventyConfig.addPlugin(eleventySass);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(pluginNavigation);

    // Add responsive image shortcode
    eleventyConfig.addShortcode(
        "responsiveImage",
        async function (src, alt, sizes = "100vw") {
            if (alt === undefined) {
                throw new Error(
                    `Missing \`alt\` on responsiveImage from: ${src}`,
                );
            }

            let metadata = await Image(src, {
                widths: [400, 800, 1200], // Small mobile, tablet, desktop
                formats: ["webp", "jpeg"],
                outputDir: "./_site/img/",
                urlPath: "/img/",
            });

            let lowsrc = metadata.jpeg[0];
            let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

            return `<picture>
            ${Object.values(metadata)
                .map((imageFormat) => {
                    return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
                        .map((entry) => entry.srcset)
                        .join(", ")}" sizes="${sizes}">`;
                })
                .join("\n")}
            <img
                src="${lowsrc.url}"
                width="${highsrc.width}"
                height="${highsrc.height}"
                alt="${alt}"
                loading="lazy"
                decoding="async">
        </picture>`;
        },
    );

    // eleventyConfig.on('eleventy.beforeWatch', async (changedFiles) => {

    //     if (changedFiles.includes('./src/css/customProperties.scss') && changedFiles.length === 1) {
    //         return;
    //     }
    //     console.log(`Running style-dictionary..`, changedFiles);
    //     StyleDictionary.buildAllPlatforms();
    // });

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
            "LLL d, yyyy",
        );
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
            "yyyy-LL-dd",
        );
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if (n < 0) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    // Return the smallest number argument
    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    function filterTagList(tags) {
        return (tags || []).filter(
            (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1,
        );
    }

    eleventyConfig.addFilter("filterTagList", filterTagList);

    // Create an array of all tags
    eleventyConfig.addCollection("tagList", function (collection) {
        let tagSet = new Set();
        collection.getAll().forEach((item) => {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        });

        return filterTagList([...tagSet]);
    });

    // Customize Markdown library and settings:
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    }).use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.ariaHidden({
            placement: "after",
            class: "direct-link",
            symbol: "#",
            level: [1, 2, 3, 4],
        }),
        slugify: eleventyConfig.getFilter("slug"),
    });
    eleventyConfig.setLibrary("md", markdownLibrary);

    // Override Browsersync defaults (used only with --serve)
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync("_site/404.html");

                browserSync.addMiddleware("*", (req, res) => {
                    // Provides the 404 content without redirect.
                    res.writeHead(404, {
                        "Content-Type": "text/html; charset=UTF-8",
                    });
                    res.write(content_404);
                    res.end();
                });
            },
        },
        ui: false,
        ghostMode: false,
    });

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: ["md", "njk", "html", "liquid"],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",

        // -----------------------------------------------------------------
        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Don't worry about leading and trailing slashes, we normalize these.

        // If you don't have a subdirectory, use "" or "/" (they do the same thing)
        // This is only used for link URLs (it does not affect your file structure)
        // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

        // You can also pass this in on the command line using `--pathprefix`

        // Optional (default is shown)
        pathPrefix: "/",
        // -----------------------------------------------------------------

        // These are all optional (defaults are shown):
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site",
        },
    };
};
