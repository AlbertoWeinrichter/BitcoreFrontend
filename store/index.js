import {parse} from "cookie";

export const state = () => {
    return {
        user: null,
        token: null,
        isSocketConnected: false
    };
};

export const mutations = {
    CLEAR_ACTIVE_NOTIFICATIONS(state) {
        if (state.user) {
            state.user.notifications = state.user.notifications.map(el => ({
                ...el,
                new: false
            }));
        }
    },
    SET_USER(state, user) {
        state.user = user || null;
    },
    SET_USER_ID(state, userId) {
        state.userId = userId || null;
    },
    ADD_NOTIFICATION(state, notification) {
        state.user.notifications.push(notification);
    },
    CLEAR_SESSION(state) {
        state.user = null;
    },
    WEBSOCKET_CONNECTED(state, websocket_status) {
        state.isSocketConnected = websocket_status || null;
    }
};
export const getters = {
    isAuthenticated(state) {
        return !!state.user;
    },
    loggedUser(state) {
        return state.user;
    }
};

export const actions = {
    async nuxtServerInit({commit}, {req}) {
        if (!req.headers.cookie) return;
        const tokenCookie = parse(req.headers.cookie).bitcore_jwt;
        if (tokenCookie) {
            try {
                const response = await this.$axios.$get(`/login`);
                commit("SET_USER", response);
            } catch (e) {
                console.log(e);
            }
        }
    }
};
