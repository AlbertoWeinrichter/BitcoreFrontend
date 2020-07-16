<template>
  <div class="patreon-support">
    <a href="https://www.patreon.com/bitcoregaming" target="_blank">
      <img class="patreon-logo" src="~assets/img/patreon-btn.png" alt="" />
      <span class="tagline">¡La resistencia continúa en Patreon!</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "patreon-support"
};
</script>

<style lang="scss">
.patreon-support {
  display: inline-block;
  line-height: 30px;
  padding: 10px 15px;
  a {
    @include transition-hover-intent();
    .patreon-logo {
      height: 30px;
      width: auto;
      margin: 0px 8px;
    }
    .tagline {
      font-family: "Roboto", sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.08em;
      line-height: 25px;
      margin-top: -4px;
      color: #fad000;
      text-decoration: none;
      background-color: transparent;
    }
    &:hover,
    &:active {
      color: $white;
      text-decoration: none;
    }
  }
}
</style>
