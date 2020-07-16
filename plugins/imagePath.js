import Vue from "vue";

let compatibility = null;

if (process.browser) {
  const browser = require("./browserCheck");
  compatibility = browser.default;
  compatibility.isChrome;
}


Vue.mixin({
  methods: {
    mediaUrl: function(article, image_type) {
      var imgs = article.images;
      var path = null;

      if (image_type === "main") {
        const main_image = imgs.find(function(o) {
          return o.image_type === "main";
        });
        if (typeof main_image !== "undefined") {
          path = main_image.path;
        } else {
          path = "";
        }
      } else if (image_type === "masonry") {
        const masonry_image = imgs.find(function(o) {
          return o.image_type === "masonry";
        });
        if (typeof masonry_image !== "undefined") {
          path = masonry_image.path;
        } else {
          path = "";
        }
      } else if (image_type === "search") {
        const search_image = imgs.find(function(o) {
          return o.image_type === "search";
        });
        if (typeof search_image !== "undefined") {
          path = search_image.path;
        } else {
          path = "";
        }
      } else if (image_type === "rrss") {
        const rrss_image = imgs.find(function(o) {
          return o.image_type === "rrss";
        });
        if (typeof rrss_image !== "undefined") {
          path = rrss_image.path;
        } else {
          path = "";
        }
      } else if (image_type === "thumbnail") {
        const thumbnail_image = imgs.find(function(o) {
          return o.image_type === "thumbnail";
        });
        if (typeof thumbnail_image !== "undefined") {
          path = thumbnail_image.path;
        } else {
          path = "";
        }
      }

      if (
        compatibility &&
        (compatibility.isChrome ||
          compatibility.isFirefox ||
          compatibility.isOpera)
      ) {
        path = path.replace(/\.png/g, ".webp");
      }

      return path;
    },
    staticUrl: function(slug) {
      let format = ".png";
      if (
        compatibility &&
        (compatibility.isChrome ||
          compatibility.isFirefox ||
          compatibility.isOpera)
      )
        format = ".webp";

      return process.env.MEDIABASE_URL + "static/images/" + slug + format;
    },
    getDefaultMetaImage: function() {
      return `${process.env.MEDIABASE_URL}static/images/default_image_600x400.png`;
    },
    getAvatarUrl: function(slug) {
      return process.env.MEDIABASE_URL + "avatars/" + slug;
    },
    calendarUrl: function(slug) {
      return process.env.MEDIABASE_URL + "media/" + slug;
    }
  }
});
