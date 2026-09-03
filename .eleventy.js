module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  );

  eleventyConfig.addFilter("readableDateFull", (d) =>
    new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  );

  eleventyConfig.addFilter("timeAgo", (d) => {
    const hours = Math.floor((Date.now() - new Date(d).getTime()) / 36e5);
    if (hours < 1) return "just now";
    if (hours < 24) return hours + (hours === 1 ? " hour ago" : " hours ago");
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return days + " days ago";
  });

  eleventyConfig.addFilter("yearOnly", (d) => new Date(d).getFullYear());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  eleventyConfig.addFilter("slugify", (s) =>
    String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  );
  // Look a person up in _data/staff.js by their byline.
  eleventyConfig.addFilter("byName", (list, name) =>
    (list || []).find((x) => x && x.name === name)
  );
  // Slicing with "loop.index0 < n" inside an {% if %} counts position in the
  // WHOLE list, not matches — so a filtered list silently comes back empty.
  // Filter first, then limit.
  eleventyConfig.addFilter("limit", (list, n) => (list || []).slice(0, n));
  eleventyConfig.addFilter("where", (list, key, val) =>
    (list || []).filter((x) => (x.data ? x.data[key] : x[key]) === val)
  );
  eleventyConfig.addFilter("exclude", (list, key, val) =>
    (list || []).filter((x) => (x.data ? x.data[key] : x[key]) !== val)
  );
  eleventyConfig.addFilter("urlencode", (s) => encodeURIComponent(String(s || "")));
  eleventyConfig.addFilter("readtime", (body) => {
    const words = String(body || "").split(/\s+/).length;
    return Math.max(1, Math.round(words / 220)) + " min read";
  });

  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("src/articles/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("columns", (api) =>
    api.getFilteredByGlob("src/columns/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("explainers", (api) =>
    api.getFilteredByGlob("src/explainers/*.md").sort((a, b) => (a.data.number > b.data.number ? 1 : -1))
  );
  eleventyConfig.addCollection("everything", (api) =>
    api.getFilteredByGlob(["src/articles/*.md", "src/columns/*.md", "src/explainers/*.md"])
      .sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
