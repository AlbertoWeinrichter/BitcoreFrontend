<template>
  <bitbox class="userdetails-bitbox" :btitle="author.username || 'Usuario'">
    <slot>
      <nuxt-link
        class="profilelink"
        :to="{
          name: 'usuario-username',
          params: { username: author.username }
        }"
      >
        <div class="avatar">
          <img
            :src="staticUrl('frames/' + author.active_border)"
            class="avatar-frame"
          />
          <img
            :src="author.avatar_cropped"
            class="avatar-img rounded-circle"
            alt="user avatar"
          />
        </div>
        <div class="user-title">
          {{ author.active_title }}
        </div>
        <div class="achievements">
          <div
            class="achievement-item"
            v-for="achievement in author.active_achievements"
            :key="achievement"
          >
            <img
              class="img-fluid"
              :src="staticUrl('achievements/' + achievement)"
              alt=""
            />
          </div>
        </div>
      </nuxt-link>
    </slot>
  </bitbox>
</template>

<script>
import Bitbox from "~/components/sidebar/BaseBitbox.vue";
import { mapGetters } from "vuex";

export default {
  name: "userdetails-bitbox",
  props: {
    author: {
      type: Object
    }
  },
  components: {
    Bitbox
  },
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"])
  }
};
</script>

<style lang="scss">
.bitbox.userdetails-bitbox {
  text-align: center;
  .bitbox-content {
    padding: 20px;
    .avatar {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      display: flex;
      padding: 44px 0px;
      justify-content: center;
      margin: -15px auto 0px auto;
      position: relative;
      overflow: hidden;
      @include transition-hover-intent();
      .avatar-frame {
        width: 330px;
        height: 330px;
        top: -60px;
        position: absolute;
      }
      .avatar-img {
        width: 120px;
        height: 120px;
      }
      @media (max-width: 767px) {
        .avatar-frame {
          width: 220px;
          height: 220px;
          top: -25px;
        }
        .avatar-img {
          width: 80px;
          height: 80px;
        }
      }
    }

    h4 {
      font-size: 22px;
      line-height: 35px;
      max-width: 220px;
      margin: auto;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: gray("200");
      @include transition-hover-intent();
    }
    h6 {
      font-size: 14px;
      line-height: 26px;
      max-width: 220px;
      margin: auto;
    }
    .achievements {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .achievement-item {
        width: 75px;
        height: 75px;
        margin: 0px 15px;
      }
    }
    .ach-name {
      font-weight: 600;
      margin: 10px 0;
      padding: 0 5px;
      color: #fff;
    }
    .tags {
      padding-top: 20px;
      @include clearfix;
      .btn {
        font-weight: 600;
        font-size: 13px;
        float: left;
        margin: 4px;
      }
    }
    .user-title {
      margin: 0px auto 10px auto;
      font-size: 14px;
      line-height: 24px;
      color: gray("600");
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: center;
      padding-top: 10px;
      height: 34px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @include transition-hover-intent();
      @media (max-width: 767px) {
        font-size: 12px;
      }
    }
  }
  &.incomment {
    margin: 0;
    .bitbox-content {
      margin: 0;
    }
  }
  &:hover {
    h4 {
      color: color("yellow");
    }
    .avatar {
      transform: scale(1.1);
    }
  }
}
</style>
