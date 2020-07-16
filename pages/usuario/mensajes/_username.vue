<template>
  <div class="container-special bc-container-fluid">
    <h1 class="header-messages">Mensajes</h1>
    <div class="user-messages">
      <div :class="{ active: sidebarActive }" class="thread-nav-cont">
        <div class="thread-nav-cont-inner">
          <div
            class="thread-nav-card thread-nav-card-bitcore"
            @click="selectNotifications()"
            :class="{ 'selected-conversation': notificationSelected }"
          >
            <div class="thread-nav-card-inner">
              <div class="thread-nav-card-avatar">
                <img
                  src="~assets/img/logo-without-name.png"
                  class="rounded-circle"
                  alt=""
                />
              </div>
              <div class="thread-nav-details">
                <span class="autname">EQUIPO BITCORE</span>
                <div class="lastmsg-short">
                  <span>
                    {{ latestNotification }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="thread-nav" ref="conversationList">
            <div class="search-user">
              <input
                placeholder="Buscar usuario..."
                @keyup="findUserForConversation()"
                v-model="searchUserString"
              />
              <div class="user-suggestion-box">
                <div
                  class="user-suggestion"
                  v-for="suggestion in userSuggestions"
                  :key="suggestion.username"
                  @click="createConversation(suggestion.username)"
                >
                  <i class="fa fa-user"></i>
                  {{ suggestion.username }}
                </div>
              </div>
            </div>

            <div
              class="thread-nav-card clearfix"
              v-for="conversation in conversations"
              :key="conversation.id"
              :ref="`conversationId_${conversation.id}`"
              :class="{
                'selected-conversation':
                  selectedConversationId === conversation.id
              }"
              @click="selectConversation(conversation.id)"
            >
              <div class="thread-nav-card-inner">
                <div class="thread-nav-card-avatar">
                  <img
                    :src="conversation.avatar"
                    class="rounded-circle"
                    alt=""
                  />
                </div>

                <div class="thread-nav-details">
                  <span class="autname">{{ conversation.username }}</span>
                  <div class="lastmsg-short">
                    {{ conversation.last_snippet }}
                    <span :class="{ unread: conversation.unreadMessages }">
                    </span>
                  </div>
                  <div class="lastmsg-time">
                    <span class="msg-time">{{
                      conversation.last_timestamp | moment("MMM DD, HH:mm")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="msglist-cont">
        <div class="msg-top-bar d-sm-flex d-lg-none">
          <div class="msg-top-bar-left" v-on:click="showSidebar">
            <fa :icon="faArrowLeft"></fa>
          </div>
          <div class="msg-top-bar-middle">
            <span>{{ currentTitle }}</span>
          </div>
        </div>

        <div class="msglist-wrapper" ref="chatMessageScroll">
          <div class="msg-list" id="msg-list">
            <div ref="chatMessageList">
              <div
                class="msg-container row row-nomarg"
                v-for="message in chatMessages"
              >
                <div class="time-row">
                  {{ message.timestamp | moment("MMM DD, HH:mm") }}
                </div>
                <div
                  v-if="message.username === loggedUser.username"
                  class="align-bubble align-bubble-right"
                >
                  <div class="msg-bubble my-bubble">
                    {{ message.content }}
                  </div>
                </div>
                <div v-else class="align-bubble align-bubble-left">
                  <div class="msg-bubble other-bubble">
                    {{ message.content }}
                  </div>
                </div>
              </div>
            </div>

            <div v-if="notificationSelected" ref="notificationList">
              <div
                class="msg-container row row-nomarg"
                v-for="notification in loggedUser.notifications"
              >
                <div
                  class="align-bubble align-bubble-left"
                  v-if="notification.notification_type === 'achievement'"
                >
                  <div class="msg-bubble system-bubble">
                    <img
                      class="notification-icon"
                      :src="
                        staticUrl(
                          'achievements/' + notification.new_achievement
                        )
                      "
                      alt=""
                    />
                    <div class="notification-details">
                      <span class="notification-tag">Nuevo Logro</span>
                      <span class="notification-content">{{
                        notification.notification_message
                      }}</span>
                    </div>
                  </div>
                </div>
                <div
                  class="align-bubble align-bubble-left"
                  v-if="notification.notification_type === 'user_follow'"
                >
                  <div class="msg-bubble system-bubble">
                    <img
                      class="notification-icon"
                      :src="staticUrl('user_follow_symbol')"
                      alt=""
                    />
                    <div class="notification-details">
                      <span class="notification-content"
                        >!{{ notification.notification_message }} te esta
                        siguiendo!</span
                      >
                    </div>
                  </div>
                </div>

                <div
                  class="align-bubble align-bubble-left"
                  v-if="notification.notification_type === 'post_vote'"
                >
                  <div class="msg-bubble system-bubble">
                    <img
                      class="notification-icon"
                      :src="staticUrl('vote_symbol')"
                      alt=""
                    />
                    <div class="notification-details">
                      <span class="notification-content">
                        !{{ notification.notification_message }} ha votado tu
                        comentario!
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  class="align-bubble align-bubble-left"
                  v-if="notification.notification_type === 'tag_content'"
                >
                  <div class="msg-bubble system-bubble">
                    <img
                      class="notification-icon"
                      :src="staticUrl('new_tag_content_symbol')"
                      alt=""
                    />
                    <div class="notification-details">
                      <span class="notification-content">
                        {{ notification.notification_message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="respond-box" v-if="!notificationSelected">
          <input
            @keyup.enter="sendMessage()"
            v-model="chatMessageContent"
            placeholder="Introduce tu mensaje"
          />
          <button class="send-message" v-on:click="sendMessage()">
            <i class="fa fa-paper-plane"></i> Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "mensajes",
  data: function() {
    return {
      conversations: [],
      selectedConversationId: -1, // -1 means notifications selected
      chatMessageContent: "",
      lastNotificationTimestamp: "",
      chatSelected: false,
      lastMessageTimestamp: "",
      isLoading: true,
      sidebarActive: true,
      searchUserString: "",
      userSuggestions: [],
      latestNotification: "Cargando...",
      currentTitle: "Team Bitcore"
    };
  },
  created() {
    this.getConversations();
  },
  computed: {
    faArrowLeft() {
      return faArrowLeft;
    },
    ...mapGetters(["isAuthenticated", "loggedUser"]),
    chatMessages() {
      if (this.selectedConversationId !== -1) {
        let id = this.selectedConversationId;
        let c = this.conversations.find(function(conversation) {
          return conversation.id === id;
        });

        return c.messages;
      }
    },
    notificationSelected() {
      return this.selectedConversationId === -1;
    }
  },
  methods: {
    getConversations() {
      this.isLoading = true;
      this.$axios
        .$get("/chat")
        .then(conversationResponse => {
          this.conversations = conversationResponse.conversations;
        })
        .finally((this.isLoading = false));
    },
    findUserForConversation() {
      _.debounce(() => {
        if (!this.searchUserString) {
          this.userSuggestions = [];
          return;
        }

        this.$axios
          .$get("/user_autocomplete", {
            params: {
              user_search: this.searchUserString
            }
          })
          .then(userSuggestions => {
            this.userSuggestions = userSuggestions.results;
          });
      }, 400)();
    },
    createConversation(username) {
      this.searchUserString = "";
      this.userSuggestions = [];
      const conversationInStore = _.find(this.conversations, {
        username: username
      });
      if (conversationInStore) {
        this.selectedConversationId = conversationInStore.id;
        this.scrollToSelectedConversation();
      } else {
        this.$axios.$post("/chat/", { username: username }).then(() => {
          this.getConversations();
        });
      }
    },
    scrollToSelectedConversation() {
      const selectedConversationElement = this.$refs[
        `conversationId_${this.selectedConversationId}`
      ][0];
      this.$refs["conversationList"].scrollTop =
        selectedConversationElement.offsetTop - 96;
    },
    sendMessage() {
      if (!this.chatMessageContent) return;
      this.$axios
        .$post(`/chat/${this.selectedConversationId}`, {
          conversationId: this.selectedConversationId,
          message: this.chatMessageContent
        })
        .then(() => {
          this.chatMessageContent = "";
          this.getConversations();
        });
    },
    selectNotifications() {
      this.sidebarActive = false;
      this.selectedConversationId = -1;
      this.currentTitle = "Team Bitcore";
    },
    selectConversation(conversationId) {
      this.sidebarActive = false;
      this.selectedConversationId = conversationId;
    },
    scrollBottom() {
      this.$refs["chatMessageScroll"].scrollTop = this.$refs[
        "chatMessageList"
      ].clientHeight;
    },
    showSidebar() {
      this.sidebarActive = true;
    },
    getLatestNotification() {
      const notification = _.last(_.values(this.notifications));
      if (!notification) return;
      if (notification.notification_type == "achievement") {
        this.latestNotification =
          "Nuevo Logro: " + notification.notification_message;
      } else if (notification.notification_type == "user_follow") {
        this.latestNotification =
          "¡" + notification.notification_message + " te esta siguiendo!";
      } else if (notification.notification_type === "post_vote") {
        this.latestNotification =
          "¡" + notification.notification_message + " ha votado tu comentario!";
      } else {
        this.latestNotification = notification.notification_message;
      }
    }
  },
  updated() {
    this.$nextTick(() => {
      this.scrollBottom();
      this.getLatestNotification();
    });
  }
};
</script>

<style lang="scss">
.header-messages {
  color: color("yellow");
  font-weight: bold;
}
.user-messages {
  padding: 0;
  height: calc(100vh - 300px);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  @media (max-width: 767px) {
    height: calc(100vh - 200px);
  }
  .thread-nav-cont {
    display: inline-block;
    flex: 1;
    background: linear-gradient(gray("800"), gray("900"));
    overflow: hidden;
    padding: 0px;
    border-right: 1px solid gray("700");
    .thread-nav-cont-inner {
      position: relative;
      overflow: hidden;
      .thread-nav {
        max-height: calc(100vh - 300px);
        min-height: calc(100vh - 300px);
        padding-top: 100px;
        overflow: auto;
        position: relative;
        @media (max-width: 767px) {
          max-height: calc(100vh - 200px);
          min-height: calc(100vh - 200px);
          padding-top: 65px;
        }
        .search-user {
          background: gray("800");
          padding: 10px;
          border-bottom: 1px solid gray("700");
          input {
            appearance: none;
            outline: none;
            padding: 5px 15px;
            background: gray("900");
            border: none;
            border-radius: 10px;
            width: 100%;
            font-family: "Roboto", sans-serif;
            font-size: 14px;
            line-height: 24px;
            letter-spacing: 0.025em;
            color: color("yellow");
            @include transition-fast();
            &:focus {
              background: gray("700");
            }
          }
        }
        .user-suggestion-box {
          width: calc(100% - 20px);
          z-index: 100;
          background: rgba(gray("700"), 0.8);
          -webkit-backdrop-filter: blur(10px);
          position: absolute;
          margin-top: 10px;
          border-radius: 10px;
          overflow: hidden;
          .user-suggestion {
            padding: 10px 15px;
            font-size: 14px;
            line-height: 24px;
            letter-spacing: 0.05em;
            color: gray("300");
            font-weight: 600;
            @include transition-hover-intent();
            i {
              color: gray("500");
              margin-right: 2px;
            }
            &:not(:last-of-type) {
              border-bottom: 1px solid gray("600");
            }
            &:hover {
              background-color: color("yellow");
              color: gray("900");
            }
          }
        }
      }
      .thread-nav-card {
        overflow: hidden;
        border-bottom: 1px solid gray("700");
        @include transition-hover-intent();
        height: 97px;
        overflow: hidden;
        &.thread-nav-card-bitcore {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          background: gray("700");
          box-shadow: 0px 2px 10px rgba($black, 0.6);
          z-index: 200;
        }
        .thread-nav-card-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 15px;
          .thread-nav-card-avatar {
            img {
              width: 50px;
              height: 50px;
              @media (max-width: 767px) {
                width: 40px;
                height: 40px;
              }
            }
          }
          .thread-nav-details {
            padding-left: 15px;
            .autname {
              font-size: 18px;
              font-weight: 600;
              letter-spacing: 0.05em;
              margin-bottom: 2px;
              @include transition-hover-intent();
            }
            .lastmsg-short {
              font-family: "Roboto", sans-serif;
              font-size: 14px;
              line-height: 20px;
              letter-spacing: 0.025em;
              @include transition-hover-intent();
              .unread {
                float: left;
                display: inline-block;
                margin-top: 7px;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background-color: color("green");
                margin-right: 8px;
              }
            }
            .lastmsg-time {
              font-family: "Roboto", sans-serif;
              color: gray("500");
              font-size: 12px;
              line-height: 18px;
              letter-spacing: 0.025em;
              font-weight: 400;
              margin-top: 2px;
              @include transition-hover-intent();
            }
          }
        }
        &:hover,
        &.selected-conversation {
          background: color("yellow");
          .thread-nav-card-inner {
            .thread-nav-details {
              .autname {
                color: black;
              }
              .lastmsg-short {
                color: gray("800");
              }
              .lastmsg-time {
                color: gray("700");
              }
            }
          }
        }
        @media (max-width: 767px) {
          height: 62px;
          .thread-nav-card-inner {
            padding: 10px;
            .thread-nav-details {
              padding-left: 10px;
              width: calc(100% - 45px);
              .autname {
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.025em;
              }
              .lastmsg-short {
                font-size: 12px;
                line-height: 18px;
                letter-spacing: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .lastmsg-time {
                display: none;
              }
            }
          }
        }
      }
    }
  }
  .msglist-cont {
    display: inline-block;
    flex: 2;
    overflow: hidden;
    background: linear-gradient(gray("200"), $white);
    position: relative;
    .msg-top-bar {
      height: 44px !important;
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      background-color: rgba($white, 0.9);
      -webkit-backdrop-filter: blur(10px);
      z-index: 100;
      .msg-top-bar-left {
        color: gray("600");
        font-family: "Roboto", sans-serif;
        padding: 10px;
        display: inline-block;
        @include transition-hover-intent();
        cursor: pointer;
        i {
          font-size: 18px;
        }
        &:hover {
          color: color("yellow");
        }
      }
      .msg-top-bar-middle {
        color: gray("900");
        padding: 10px 5px;
        display: inline-block;
        text-align: left;
        span {
          font-size: 14px;
          line-height: 20px;
          font-weight: 600;
          letter-spacing: 0.025em;
        }
      }
    }
    .respond-box {
      height: 54px;
      position: absolute;
      left: 0px;
      bottom: 0px;
      right: 0px;
      background-color: rgba(gray("400"), 0.8);
      -webkit-backdrop-filter: blur(10px);
      padding: 10px;
      display: flex;
      flex-direction: row;
      input {
        appearance: none;
        outline: none;
        padding: 5px 15px;
        background: gray("100");
        border: none;
        border-radius: 10px;
        flex: 1;
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.025em;
        color: black;
        @include transition-fast();
        &:focus {
          box-shadow: inset 0px 0px 3px 1px color("yellow");
        }
      }
      button {
        width: 90px;
        appearance: none;
        border: none;
        background: linear-gradient(lighten(color("green"), 5), color("green"));
        margin-left: 10px;
        border-radius: 17px;
        color: $white;
        font-weight: 700;
        letter-spacing: 0.025em;
        font-size: 12px;
        outline: none;
        @include transition-hover-intent();
        &:hover,
        &:focus {
          background: linear-gradient(
            color("green"),
            lighten(color("green"), 5)
          );
        }
      }
    }
    .msglist-wrapper {
      width: 100%;
      height: 100%;
      overflow-y: auto !important;
      padding: 60px 0px;
      .msg-list {
        padding: 15px;
        .msg-container {
          margin-bottom: 10px;
          margin-top: 10px;
          margin-left: 0px;
          .time-row {
            width: 100%;
            font-family: "Roboto", sans-serif;
            color: gray("600");
            font-size: 12px;
            line-height: 18px;
            letter-spacing: 0.025em;
            font-weight: 400;
            text-align: center;
          }
          .align-bubble {
            width: 100%;
            display: flex;
            flex-direction: row;
            &.align-bubble-left {
              text-align: left;
              justify-content: flex-start;
            }
            &.align-bubble-right {
              text-align: right;
              justify-content: flex-end;
            }
            .msg-bubble {
              width: 67%;
              max-width: 400px;
              border-radius: 20px;
              margin-top: 5px;
              padding: 10px 15px;
              font-family: "Roboto", sans-serif;
              font-weight: 400;
              letter-spacing: 0.025em;
              @media (max-width: 767px) {
                width: 90%;
                padding: 5px 15px;
                font-size: 14px;
              }
              &.my-bubble {
                background: linear-gradient(
                  lighten(color("green"), 5),
                  color("green")
                );
              }
              &.system-bubble {
                background: linear-gradient(
                  darken(color("yellow"), 2),
                  darken(color("yellow"), 7)
                );
                display: flex;
                flex-direction: row;
                .notification-icon {
                  object-fit: cover;
                  height: 50px;
                  width: 50px;
                  display: inline-block;
                }
                .notification-details {
                  padding-left: 10px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: flex-start;
                  .notification-tag {
                    font-size: 9px;
                    line-height: 12px;
                    color: $white;
                    background-color: darken(color("yellow"), 15);
                    letter-spacing: 0.025em;
                    padding: 2px 5px;
                    display: inline;
                    text-transform: uppercase;
                    font-weight: 700;
                    border-radius: 4px;
                    margin-bottom: 4px;
                  }
                  .notification-content {
                    color: gray("900");
                  }
                }
              }
              &.other-bubble {
                background: linear-gradient(gray("600"), gray("700"));
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 991px) {
    .thread-nav-cont {
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      width: 270px;
      z-index: 200;
      box-shadow: 2px 0px 10px rgba($black, 0.6);
      margin-left: -330px;
      @include transition-fast();
      &.active {
        margin-left: 0;
      }
    }
  }
}
</style>
