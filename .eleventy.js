// .eleventy.js
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add a filter to format dates
  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });

  // Add a filter for slugifying tags (used in the template for tag links)
  eleventyConfig.addFilter("slug", (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w-]+/g, '')     // Remove all non-word chars
      .replace(/--+/g, '-')        // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  });

  // Add a filter to truncate text
  eleventyConfig.addFilter("truncate", (text, length, killwords, end) => {
    if (text.length > length) {
      text = text.substring(0, length);
      if (killwords) {
        text = text.substring(0, text.lastIndexOf(' '));
      }
      text += end != null ? end : '...';
    }
    return text;
  });

  // Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");

  // Configure collections for content types
  // Gastronomic Itineraries
  eleventyConfig.addCollection("gastronomicItineraries", function(collectionApi) {
    return collectionApi.getFilteredByGlob("gastronomic-itineraries/*.md").sort((a, b) => {
      return b.data.date - a.data.date; // Sort by date, newest first
    });
  });

  // Restaurant Reviews
  eleventyConfig.addCollection("restaurantReviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("restaurant-reviews/*.md").sort((a, b) => {
      return b.data.date - a.data.date; // Sort by date, newest first
    });
  });

  // Culture/Family Trips
  eleventyConfig.addCollection("cultureFamilyTrips", function(collectionApi) {
    return collectionApi.getFilteredByGlob("culture-family-trips/*.md").sort((a, b) => {
      return b.data.date - a.data.date; // Sort by date, newest first
    });
  });


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