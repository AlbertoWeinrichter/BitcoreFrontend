<template>
  <div class="social-menu">
    <a
      href="https://www.facebook.com/bitcoregaming/"
      target="_blank"
      class="social-icon"
    >
      <fa
        class="facebook-icon"
        :icon="faFacebookF"
        style="font-style: italic;"
      />
    </a>
    <a
      href="https://twitter.com/bitcoregaming"
      target="_blank"
      class="social-icon"
    >
      <fa :icon="faTwitter" />
    </a>
    <a
      href="https://www.instagram.com/bitcoregaming/"
      target="_blank"
      class="social-icon"
    >
      <fa :icon="faInstagram" />
    </a>
    <a
      href="https://www.youtube.com/channel/UCt4miiuwo7SnkRqzR4tXFLg"
      target="_blank"
      class="social-icon"
    >
      <fa class="youtube-icon" :icon="faYoutubeSquare" />
    </a>
  </div>
</template>

<script>
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

export default {
  name: "social-menu",
  computed: {
    faFacebookF() {
      return faFacebookF;
    },
    faInstagram() {
      return faInstagram;
    },
    faYoutubeSquare() {
      return faYoutube;
    },
    faTwitter() {
      return faTwitter;
    }
  }
};
</script>

<style lang="scss">
.social-menu {
  display: inline-block;
  padding: 0 15px;
  a.social-icon {
    display: inline-block;
    color: theme-color("primary");
    font-size: 14px;
    height: 30px;
    width: 30px;
    line-height: 33px;
    text-align: center;
    position: relative;
    margin: 10px;
    .youtube-icon {
      position: relative;
      top: -1px;
      left: 0.5px;
    }
    .facebook-icon {
      position: relative;
      top: -1px;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid theme-color("primary");
      border-radius: 6px;
      transform: rotate(45deg);
      padding: 10px;
    }
    &:hover {
      color: $white;
      &::before {
        border-color: $white;
        z-index: 0;
      }
    }
  }
}
</style>
