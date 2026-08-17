module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("timeAgo", (dateObj) => {
    const diffMs = Date.now() - new Date(dateObj).getTime();
    const hours = Math.floor(diffMs / 36e5);
    if (hours < 1) return "just now";
    if (hours < 24) return hours + "h ago";
    return Math.floor(hours / 24) + "d ago";
  });
  eleventyConfig.addFilter("yearOnly", (dateObj) => new Date(dateObj).getFullYear());

  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("src/articles/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("bySection", (api) => {
    const articles = api.getFilteredByGlob("src/articles/*.md");
    const map = {};
    articles.forEach((a) => {
      const key = a.data.section;
      if (!key) return;
      if (!map[key]) map[key] = [];
      map[key].push(a);
    });
    return map;
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};