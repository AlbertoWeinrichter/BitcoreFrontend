import { parse } from "cookie";
import Cookies from "js-cookie";

export default function({ $axios, req }) {
  let token = null;

  if (process.server && req.headers.cookie) {
    token = parse(req.headers.cookie).bitcore_jwt;
  } else {
    token = Cookies.get("bitcore_jwt");
  }

  setInterceptor(token, $axios);
}

export const setInterceptor = (token, axios) => {
  axios.interceptors.request.use(request => {
    if (token) {
      request.headers.common["Authorization"] = "Token " + token;
    }
    return request;
  });
};
