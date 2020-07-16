<template>
  <bitbox class="score-bitbox" :btitle="btitle">
    <slot>
      Cargando...
    </slot>
  </bitbox>
</template>

<script>
import Bitbox from "~/components/sidebar/BaseBitbox.vue";

export default {
  name: "plain-bitbox",
  components: {
    Bitbox
  },
  props: {
    btitle: {
      default: "Info",
      type: String
    }
  }
};
</script>

<style lang="scss">
.bitbox.score-bitbox {
  .bitbox-content {
    padding: 15px 10px;
    .item {
      width: 50%;
      float: left;
      &:nth-child(2n-1) {
        clear: both;
      }
      &:nth-child(2n-1):after {
        content: "";
        display: block;
        width: 100%;
      }
      &:hover {
        .score-name {
          color: color("yellow");
        }
      }
    }
    .item.media {
      justify-content: center;
      align-items: center !important;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      line-height: 35px;
      display: block;
      text-align: center;
      @media (min-width: grid-breakpoints("md")) and (max-width: 1240px) {
        font-size: 13px;
      }
    }
    .score-img {
      display: block;
      width: 100%;
      margin: 15px 0;
      min-width: 60px;
      margin-right: 20px;
      img {
        width: 110px;
      }
    }
    h4 {
      font-size: 22px;
      line-height: 35px;
      margin: auto;
    }
    h6 {
      font-size: 14px;
      line-height: 26px;
      margin: auto;
    }
    .score-name {
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-top: 5px;
      color: gray("200");
      @include transition-hover-intent();
    }
    .price {
      display: inline-block;
      font-weight: 300;
      color: color("yellow");
      font-size: 28px;
      letter-spacing: 0.05em;
      margin-bottom: 5px;
    }
  }
}
</style>
