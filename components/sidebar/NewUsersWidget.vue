<template>
  <bitbox btitle="Nuevos usuarios">
    <div class="item media" v-for="user in newUsers" :key="user.id">
      <nuxt-link
        :to="{ name: 'usuario-username', params: { username: user.username } }"
      >
        <div class="widget-avatar-small">
          <img
            :src="user.avatar_cropped"
            class="avatar-img rounded-circle"
            :alt="user.avatar_cropped"
          />
        </div>
        <div class="media-body">
          <span>{{ user.username }}</span>
        </div>
      </nuxt-link>
    </div>
  </bitbox>
</template>

<script>
import Bitbox from "~/components/sidebar/BaseBitbox.vue";

export default {
  name: "new-users-widget",
  props: ["newUsers"],
  components: {
    Bitbox
  }
};
</script>

<style lang="scss" scoped>
.item.media {
  height: 75px;
  padding: 15px 20px !important;
  @include transition-hover-intent();
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
    &:link,
    &:visited {
      color: gray("200");
    }
    &:hover,
    &:active {
      color: color("yellow");
      text-decoration: none;
    }
    .widget-avatar-small {
      vertical-align: middle;
      display: inline-block;
      img {
        width: 45px;
        height: 45px;
      }
    }
    .media-body {
      vertical-align: middle;
      display: inline-block;
      font-size: 16px !important;
      line-height: 40px;
      letter-spacing: 0.05em;
      font-weight: 600;
      padding-left: 15px;
      span {
        margin-top: 0;
        @include transition-hover-intent();
      }
    }
  }
}
</style>
