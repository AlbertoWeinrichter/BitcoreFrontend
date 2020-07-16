<template>
  <div class="article-comments">
    <div class="comments-list">
      <!--Reply to post-->
      <div class="comment-card">
        <div class="user-section">
          <img
            :src="loggedUser && loggedUser.avatar_cropped"
            class="avatar-image"
            alt="user profile image"
          />
          <span class="username">
            {{ isAuthenticated ? loggedUser.username : "User" }}
          </span>
        </div>

        <div class="profile-separator"></div>

        <WYSIWYG :slug="publication.id" @clicked="refreshComments"></WYSIWYG>

        <div v-if="!isAuthenticated" class="login-curtain">
          <nuxt-link :to="{ name: 'usuario-login' }" class="link">
            <b-button class="comment-button" variant="primary">
              Iniciar Sesión
            </b-button>
          </nuxt-link>
        </div>
      </div>

      <div class="comment-block" v-for="comment in comments" :key="comment.id">
        <!--Comment from a user-->
        <div
          class="comment-card"
          :class="{ 'reply-to-comment': comment.isChildren }"
        >
          <nuxt-link
            :to="{
              name: 'usuario-username',
              params: { username: comment.user.username }
            }"
            class="user-section user-section-link"
          >
            <img
              :src="comment.user.avatar_cropped"
              class="avatar-image"
              alt="user profile image"
            />
            <span class="username">{{ comment.user.username }}</span>
          </nuxt-link>

          <div class="profile-separator"></div>

          <div class="comment-section">
            <div class="comment-header">
              <span class="publication-time">
                {{ comment.timestamp | moment("lll") }}
              </span>
              <span class="comment-votes">
                <fa :icon="faCaretUp" />
                {{ comment.post_votes.up }}
              </span>
              <span class="comment-votes">
                <fa :icon="faCaretDown" />
                {{ comment.post_votes.down }}
              </span>
            </div>
            <div class="comment-body" v-html="comment.body"></div>
            <div class="comment-footer">
              <b-button
                class="round-btn reply-button"
                :class="{ rotated: replyCommentId === comment.id }"
                @click="setReplyToComment(comment.id)"
              >
                <fa :icon="faReply" />
              </b-button>
              <div class="vote-buttons">
                <b-button
                  class="round-btn yellow-btn"
                  @click="voteComment(comment.id, true)"
                >
                  <fa :icon="faCaretUp" />
                </b-button>
                <b-button
                  class="round-btn yellow-btn"
                  @click="voteComment(comment.id, false)"
                >
                  <fa :icon="faCaretDown" />
                </b-button>
              </div>
            </div>
          </div>
        </div>

        <!--Reply to comment-->
        <div
          class="comment-card reply-to-comment"
          v-if="replyCommentId === comment.id"
        >
          <div class="user-section">
            <img
              :src="loggedUser && loggedUser.avatar_cropped"
              class="avatar-image"
              alt="user profile image"
            />
            <span class="username">
              {{ isAuthenticated ? loggedUser.username : "User" }}
            </span>
          </div>

          <div class="comment-section">
            <WYSIWYG
              :slug="publication.id"
              :parentId="replyCommentId"
              @clicked="refreshComments"
            ></WYSIWYG>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faCaretUp,
  faCaretDown,
  faReply
} from "@fortawesome/free-solid-svg-icons";
import { mapGetters } from "vuex";
import WYSIWYG from "~/components/publication/WYSIWYG.vue";

export default {
  props: ["publication", "slug"],
  components: {
    WYSIWYG
  },
  data() {
    return {
      comments: null,
      replyCommentId: null
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedUser"]),
    faCaretUp() {
      return faCaretUp;
    },
    faCaretDown() {
      return faCaretDown;
    },
    faReply() {
      return faReply;
    }
  },
  methods: {
    refreshComments() {
      this.$axios
        .$get("/comentarios/publication/" + this.slug)
        .then(commentsResponse => {
          function flatPost(post) {
            post.isChildren = true;
            return [post, ...post.children.map(flatPost)];
          }
          this.replyCommentId = null;
          const threads = commentsResponse.comments.map(post => {
            return [post, ..._.flattenDeep(post.children.map(flatPost))];
          });
          this.comments = _.flatten(threads);
        });
    },
    setReplyToComment(commentId) {
      console.log(commentId);
      this.replyCommentId =
        this.replyCommentId === commentId ? null : commentId;
    },
    voteComment(commentId, positive) {
      this.$axios
        .$post("/voto_post", { post: commentId, value: positive ? 1 : -1 })
        .then(response => {
          if (response.status === "Success") {
            this.$notify({
              group: "bitcore-notification",
              type: "success",
              title: "¡Éxito!",
              text: "¡Voto realizado con exito!"
            });
            this.refreshComments();
          }
        })
        .catch(error => {
          console.log(error);
          this.$notify({
            group: "bitcore-notification",
            type: "error",
            title: "¡No se ha podido votar el comentario!",
            text: "Esto no es Cuba. No puedes votar 2 veces..."
          });
        });
    },
      reportComment(commentId) {//eslint-disable-line
      console.log("Not implemented: " + commentId);
    }
  },
  mounted() {
    this.refreshComments();
  }
};
</script>

<style lang="scss">
.article-comments {
  color: #333;
  margin-top: 50px;
  .quill-editor {
    min-height: 200px;
    max-height: 250px;
    overflow-y: auto;
  }
  .comments-list {
    display: flex;
    flex-direction: column;
  }
  .comment-card {
    position: relative;
    display: flex;
    padding: 30px;
    margin-bottom: 0px;
    background: linear-gradient(gray("100"), gray("200"));
    overflow: hidden;
    box-shadow: 0px -2px 20px rgba($black, 0.1);
    border-top: 4px solid color("yellow");
    &.reply-to-comment {
      border-left: 25px solid color("yellow");
      padding-left: 40px;
    }
  }
  .comment-button {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-top: 10px;
  }
  .editr--content {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 400;
  }
  .login-curtain {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(80, 80, 80, 0.8);
    z-index: 10;
  }
  .user-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar-image {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      object-fit: cover;
    }
    .username {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.025em;
      color: $black;
      @include transition-hover-intent();
    }
    &.user-section-link {
      &:hover,
      &:active {
        text-decoration: none;
        .username {
          color: darken(color("yellow"), 10);
        }
      }
    }
  }
  .profile-separator {
    margin: 0 20px;
    height: 100%;
    border-right: 2px solid gray("600");
  }
  .comment-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .comment-header {
    margin-bottom: 10px;
    .publication-time {
      font-family: "Roboto", sans-serif;
      font-size: 12px;
      font-weight: 400;
      margin-right: 20px;
      color: gray("700");
    }
    .comment-votes {
      margin-right: 10px;
      font-weight: 700;
      font-size: 14px;
    }
  }
  .comment-body {
    flex-grow: 1;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 400;

    img {
      max-height: 400px;
    }
  }
  .comment-footer {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 7px 0;
  }
  .round-btn {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    margin-right: 5px;
    text-align: center;
    @include transition-hover-intent();
    &.rotated {
      transform: rotate(-180deg);
    }
    &.reply-button {
    }
  }
}
</style>
