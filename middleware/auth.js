import jwtDecode from "jwt-decode";

export default function({ $axios, store }) {
  const Cookie = require("js-cookie");
  const token = Cookie.get("bitcore_jwt");

  if (token && !store.getters.isAuthenticated) {
    const user = jwtDecode(token);
    store.commit("SET_USER_ID", user.sub);

    return $axios.$get(`/login`).then(response => {
      store.commit("SET_USER", response);
    });
  }
}
