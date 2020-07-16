<template>
  <div class="pt-5 pb-5">
    <div class="row title-row">
      <h1>Social</h1>
      <div class="title-row-tabs">
        <v-btn
          @click="selectTab('followed')"
          :class="{ act: activeTab === 'followed' }"
          class="title-tab-button"
        >
          Siguiendo
        </v-btn>
        <v-btn
          @click="selectTab('followers')"
          :class="{ act: activeTab === 'followers' }"
          class="title-tab-button"
        >
          Seguidores
        </v-btn>
        <v-btn
          @click="selectTab('blocked')"
          :class="{ act: activeTab === 'blocked' }"
          class="title-tab-button"
        >
          Bloqueados
        </v-btn>
      </div>
    </div>

    <div class="col-12 users-container" v-if="activeTab === 'followed'">
      <div v-if="followed.length < 1" class="info-wrapper">
        <h2 class="info-message">No estas siguiendo a nadie</h2>
      </div>
      <div v-else>
        <div class="row users-row">
          <div
            v-for="(friend, index) in followed"
            class="user-profile-container col-xl-3 col-lg-4 col-md-6"
          >
            <ProfileCard
              v-bind:item_index="index"
              v-bind:user="friend.friend"
              v-bind:card_type="'followed'"
            >
            </ProfileCard>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 users-container" v-else-if="activeTab === 'followers'">
      <div v-if="followers.length < 1" class="info-wrapper">
        <h2 class="info-message">Nadie te esta siguiendo</h2>
      </div>
      <div v-else>
        <div class="row users-row">
          <div
            v-for="(follower, index) in followers"
            class="user-profile-container col-xl-3 col-lg-4 col-md-6"
          >
            <ProfileCard
              v-bind:item_index="index"
              v-bind:user="follower.follower"
              v-bind:card_type="'follower'"
            >
            </ProfileCard>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 users-container" v-else-if="activeTab === 'blocked'">
      <div v-if="blockedUsers.length < 1" class="info-wrapper">
        <h2 class="info-message">No estas bloqueando a ningún usuario</h2>
      </div>
      <div v-else>
        <div class="row users-row">
          <div
            v-for="(blocked, index) in blockedUsers"
            class="user-profile-container col-xl-3 col-lg-4 col-md-6"
          >
            <ProfileCard
              v-bind:item_index="index"
              v-bind:user="blocked.friend"
              v-bind:card_type="'blocked'"
            >
            </ProfileCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "~/components/user/ProfileCard.vue";
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      activeTab: "followed",
      followed: [],
      followers: [],
      blockedUsers: [],
      followed_tags: [],
      isLoading: true,
      activeUser: ""
    };
  },
  name: "usuario-social",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"])
  },
  components: {
    ProfileCard
  },
  methods: {
    selectTab(tabToSwitch) {
      this.activeTab = tabToSwitch;
    },
    fetchSubscriptions(username) {
      this.$axios.$get("/subscripcion/" + username).then(response => {
        this.followed = response.friendships;
        this.followers = response.followers;
        this.blockedUsers = response.blocked;
        this.followed_tags = response.followed_tags;
      });
    }
  },
  mounted() {
    this.fetchSubscriptions(this.loggedUser.username);
  }
};
</script>

<style lang="scss">
.info-wrapper {
  margin: 150px 0px;
  text-align: center;
  .info-message {
    color: gray("300");
  }
}

.usr-infoblock {
  padding: 25px 3px;
  .usr-infoname {
    padding: 8px 0;
    color: #1c1c21;
    font-size: 18px;
    line-height: 35px;
    font-weight: 600;
  }
  .avatar-full-img {
    img {
      display: block;
    }
  }
}

.users-container {
  .users-row {
    margin: 0px -10px;
    .user-profile-container {
      padding: 0px 10px;
      margin-bottom: 20px;
    }
  }
  @media (max-width: 767px) {
    padding: 0px !important;
    h2 {
      text-align: center;
    }
  }
}

.title-row {
  padding: 0px 30px;
  .title-row-tabs {
    margin-left: 30px;
    margin-top: 15px;
    .title-tab-button {
      background: none;
      border: none;
      outline: none;
      appearance: none;
      border-bottom: 3px solid transparent;
      border-radius: 0px;
      @include transition-hover-intent();
      margin: 0px 5px;
      &:hover,
      &:focus,
      &:active {
        color: $white;
        background: none;
        border-bottom-color: $white;
        box-shadow: none;
        text-decoration: none;
      }
      &.act {
        color: color("yellow");
        border-bottom: 3px solid color("yellow");
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0px 15px;
    h1 {
      margin: 0px auto 15px auto;
    }
    .title-row-tabs {
      text-align: center;
      width: 100%;
      margin: 0px auto 15px auto;
      .title-tab-button {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
