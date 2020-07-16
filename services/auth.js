import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";

const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3;
    }
  );
  return params;
};

export const extractInfoFromHash = () => {
  if (process.SERVER_BUILD) return;
  const { id_token, state } = getQueryParams();
  return {
    token: id_token,
    secret: state
  };
};

export const setToken = token => {
  if (process.SERVER_BUILD) return;
  window.localStorage.setItem("bitcore_jwt", token);
  // window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
  // console.log(JSON.stringify(token.token))
  // Cookie.set('bitcore_jwt', JSON.stringify(token.token))
};

export const unsetToken = () => {
  if (process.SERVER_BUILD) return;
  // window.localStorage.removeItem('token');
  // window.localStorage.removeItem('user');
  // window.localStorage.removeItem('secret');
  // window.localStorage.setItem('logout', Date.now())
  Cookie.remove("bitcore_jwt");
};

export const getUserFromCookie = req => {
  console.log("from cookie");

  if (!req.headers.cookie) return;
  const jwtCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("jwt="));
  if (!jwtCookie) return;
  const jwt = jwtCookie.split("=")[1];
  return jwtDecode(jwt);
};


export const setSecret = secret =>
  window.localStorage.setItem("secret", secret);

