<template>
  <div>
    <notifications
      group="bitcore-achievement-notification"
      position="top right"
    >
      <template slot="body" slot-scope="props">
        <div
          v-if="props.item.data.notification_type === 'achievement'"
          class="bitcore-achievement-notification-container"
        >
          <img
            class="notification-image"
            :src="staticUrl('achievements/' + props.item.data.new_achievement)"
            alt=""
          />
          <div class="notification-details">
            <span class="notification-tag">Nuevo Logro</span>
            <span class="notification-content">{{
              props.item.data.notification_message
            }}</span>
          </div>
        </div>
        <div
          v-if="props.item.data.notification_type === 'tag_content'"
          class="bitcore-achievement-notification-container"
        >
          <img
            class="notification-image"
            :src="
              `https://bitcoregaming.s3.amazonaws.com/media/${
                props.item.data.new_publication
              }_100x100.png`
            "
            alt=""
          />
          <div class="notification-details">
            <span class="notification-tag">Nuevo Contenido</span>
            <span class="notification-content">{{
              props.item.data.notification_message
            }}</span>
          </div>
        </div>
        <div
          v-if="props.item.data.notification_type === 'comment'"
          class="bitcore-achievement-notification-container"
        >
          <img
            class="notification-image"
            :src="staticUrl('achievements/' + props.item.data.new_achievement)"
            alt=""
          />
          <div class="notification-details">
            <span class="notification-tag">Nueva Respuesta</span>
            <span class="notification-content">{{
              props.item.data.notification_message
            }}</span>
          </div>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
export default {
  name: "Websocket",
  methods: {
    runNotify() {
      const data = {
        id: 4172,
        new: false,
        new_achievement: "get_over_here",
        new_post: null,
        new_publication: null,
        notification_message: "Get over here!",
        notification_type: "achievement",
        owner: 703,
        sender: null,
        timestamp: "2019-06-29T00:10:43.224165Z",
        voted_post: null
      };
      this.$notify({
        group: "bitcore-achievement-notification",
        data
      });
    }
  },
  created() {
    let socketConnection = null;
    const openSocket = () => {
      this.$store.commit("WEBSOCKET_CONNECTED", true);
    };

    const closeSocket = () => {
      this.$toast.error("Connection closed");
      this.$store.commit("WEBSOCKET_CONNECTED", false);
    };

    const messageReceived = ({ data }) => {
      const socketMessage = JSON.parse(data);
      saveSocketMessage(socketMessage);
    };

    const saveSocketMessage = ({ type, data }) => {
      switch (type) {
        case "welcome":
          break;
        case "message":
          switch (data.notification_type) {
            case "achievement":
            // this.$notify({
            //   group: "bitcore-achievement-notification",
            //   data
            // });
            // this.$store.commit("ADD_NOTIFICATION", data);
            case "tag_content":
              // TODO: Add to store
              this.$notify({
                group: "bitcore-achievement-notification",
                data
              });
              this.$store.commit("ADD_NOTIFICATION", data);
              break;
            case "chat":
              // console.log("hit chat socket");
              // TODO: Add to store if in chat page and in that conversation
              // this.addChatMessage(data);
              break;
          }
      }
    };
    const createConnection = () => {
      if (
        socketConnection &&
        socketConnection.readyState === socketConnection.OPEN
      )
        return;

      const { username } = this.$store.state.user;

      socketConnection = new WebSocket(
        process.env.WEBSOCKET_URL + `/ws/chat_socket?username=${username}`
      );

      socketConnection.addEventListener("open", openSocket);
      socketConnection.addEventListener("close", closeSocket);
      socketConnection.addEventListener("message", messageReceived);
    };
    const closeConnection = () => {
      if (socketConnection) socketConnection.close();
    };
    if (this.$store.getters.isAuthenticated) {
      createConnection();
    }
    this.$store.watch(
      () => this.$store.getters.isAuthenticated,
      auth => {
        if (auth) createConnection();
        else closeConnection();
      }
    );
  }
};
</script>

<style scoped lang="scss">
.bitcore-achievement-notification-container {
  display: flex;
  align-items: center;
  background: linear-gradient(#f0c800, #d6b200);
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  max-width: 400px;
  width: 100%;
  border-radius: 20px;
  margin-top: 5px;
  padding: 10px 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  letter-spacing: 0.025em;
  .notification-image {
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
      color: #fff;
      background-color: #ae9000;
      letter-spacing: 0.025em;
      padding: 2px 5px;
      display: inline;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 4px;
      margin-bottom: 4px;
    }
    .notification-content {
      color: #212529;
    }
  }
}
</style>
