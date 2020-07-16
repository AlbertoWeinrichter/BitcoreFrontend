<template>
  <div class="navbar-user-profile-container">
    <div class="avatar">
      <img
        :src="staticUrl('frames/' + user.active_border)"
        class="avatar-frame"
      />
      <img
        :src="user && user.avatar_cropped"
        class="avatar-img rounded-circle"
        alt="user avatar"
      />
    </div>

    <div class="user-title">
      {{ user.active_title }}
    </div>

    <div class="achievements">
      <div
        class="achievement-item"
        v-for="achievement in user.active_achievements"
        :key="achievement.name"
      >
        <img
          class="img-fluid"
          :src="staticUrl('achievements/' + achievement)"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar-user-profile",
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="scss">
.navbar-user-profile-container {
  padding: 0 15px 15px 15px;
  .avatar {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    padding: 44px 0;
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
  .user-title {
    margin: 0 auto 10px auto;
    font-size: 14px;
    color: gray("600");
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    @include transition-hover-intent();
  }
  .achievements {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    .achievement-item {
      width: 75px;
      margin: 0px 15px;
    }
  }
  &:hover {
    .avatar {
      transform: scale(1.1);
    }
    .user-title {
      color: color("yellow");
    }
  }
}
</style>
