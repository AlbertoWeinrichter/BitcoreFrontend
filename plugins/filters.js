import Vue from "vue";
import VueMoment from "vue-moment";
import moment from "moment";

import "moment/locale/es";

Vue.filter("capitalize", val => val.toUpperCase());

Vue.filter("truncate", function(val, characters) {
  return val.substring(0, characters) + "…";
});

Vue.use(VueMoment, {
  moment
});
