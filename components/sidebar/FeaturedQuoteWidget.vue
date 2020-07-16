<template>
  <bitbox class="quote-widget" btitle="Frase destacada">
    <slot>
      <div class="quote-text">“{{ quote.content }}”</div>
      <div class="quote-author">- {{ quote.author }}</div>
    </slot>
  </bitbox>
</template>

<script>
import Bitbox from "~/components/sidebar/BaseBitbox.vue";

export default {
  props: ["quote"],
  components: {
    Bitbox
  }
};
</script>

<style lang="scss">
.quote-widget {
  .bitbox-content {
    padding: 0px 24px 30px 24px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: uppercase;
  }

  .quote-text {
    font-family: "Merriweather", serif;
    font-size: 30px;
    letter-spacing: 0.05em;
    font-weight: 400;
    text-align: left;
    color: gray("200");
    font-style: italic;
    @media (max-width: 991px) {
      font-size: 24px;
    }
  }

  .quote-author {
    margin-top: 10px;
    text-align: right;
    font-weight: 700;
    color: color("yellow");
    letter-spacing: 0.05em;
  }
}
</style>
