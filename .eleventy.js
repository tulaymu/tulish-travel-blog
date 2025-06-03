// .eleventy.js
const { DateTime } = require("luxon"); // Add this line at the top

module.exports = function(eleventyConfig) {
  // Add a filter to format dates
  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });

  // You can add custom configuration here.
  // For now, let's keep it minimal.

  // Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: "./",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};