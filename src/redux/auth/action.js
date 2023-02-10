const authActions = {
    AUTH_CHECK_AUTHORIZATION: "AUTH_CHECK_AUTHORIZATION",
    AUTH_AUTHORIZE: "AUTH_AUTHORIZE",
    AUTH_AUTHORIZE_SUCCESS: "AUTH_AUTHORIZE_SUCCESS",
    AUTH_AUTHORIZE_FAILED: "AUTH_AUTHORIZE_FAILED",
    AUTH_UPDATE_PARAM: "AUTH_UPDATE_PARAM",
    AUTH_GET_USER_SUCCESS: "AUTH_GET_USER_SUCCESS",
    AUTH_GET_USER_FAILED: "AUTH_GET_USER_FAILED",
    AUTH_LOGOUT: "AUTH_LOGOUT",

    checkAuthorization: () => ({ type: authActions.AUTH_CHECK_AUTHORIZATION }),

    authorize(payload) {
        return {
            type: authActions.AUTH_AUTHORIZE,
            payload: payload
        }
    },
    updateParam(payload) {
        return {
            type: authActions.AUTH_UPDATE_PARAM,
            payload: payload
        }
    },
    logout() {
        return {
            type: authActions.AUTH_LOGOUT
        }
    },
};
export default authActions;
