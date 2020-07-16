<template>
  <div class="bitbox">
    <div class="bitbox-inner">
      <span class="box-corners-top" v-if="showhdr"></span>
      <div class="bitbox-hdr" v-if="showhdr">
        <slot name="bheader">{{ btitle }}</slot>
      </div>
      <div class="bitbox-content clearfix">
        <slot>
          Nada que mostrar
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bitbox",
  props: {
    btitle: {
      default: "Info",
      type: String
    },
    showhdr: {
      default: true,
      type: Boolean
    }
  }
};
</script>

<style lang="scss">
.bitbox {
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 55px;
  @media (max-width: 991px) {
    margin-bottom: 30px;
  }
  .bitbox-inner {
    background: #1c1c21;
  }

  &.bitbox-center {
    text-align: center;
  }

  .bitbox-inner {
    @include curcornerstop(15px, 20px);
  }
  .bitbox-hdr {
    background: color("yellow");
    text-align: center;
    color: #111216;
    font-size: 14px;
    line-height: 18px;
    font-weight: bold;
    padding: 21px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin: 0 15px;
    position: relative;

    &::after,
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      left: auto;
      right: -15px;
      width: 15px;
      height: 60px;
      z-index: 2;
      background: darken(theme-color("primary"), 10%);
      background: url("~assets/img/bitbox-r.png") no-repeat;
    }

    &::before {
      background: url("~assets/img/bitbox-l.png") no-repeat;
      left: -15px;
      right: auto;
    }
  }

  &.scrollable {
    .bitbox-content {
      max-height: 460px;
      overflow-y: auto;
    }
  }
}
</style>
