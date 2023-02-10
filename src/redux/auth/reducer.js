import authActions from "./action";

const initState = {
    payload: {
        username: '',
        password: '',
    },
    isLoggedIn: false,
    loading: false,
    tokenInfo: {},
    userInfo: {},
};

export default function authReducer(state = initState, action) {

    switch (action.type) {
        case authActions.AUTH_AUTHORIZE: {
            return {
                ...state,
            };
        }
        case authActions.AUTH_AUTHORIZE_SUCCESS: {
            return {
                ...state,
                user: action.state.user,
                loading: false,
                isLoggedIn: action.state.isLoggedIn
            };
        }
        case authActions.AUTH_AUTHORIZE_FAILED: {
            return {
                ...state,
                user: {},
                loading: false,
                isLoggedIn: false,
            };
        }
        case authActions.AUTH_GET_USER_SUCCESS: {
            return {
                ...state,
                userInfo: action.state.userInfo,
            };
        }
        case authActions.AUTH_GET_USER_FAILED: {
            return {
                ...state,
                userInfo: {},
            };
        }
        case authActions.AUTH_UPDATE_PARAM: {
            return {
                ...state,
                payload: action.payload,
                isLoggedIn: false,
                message: ''
            };
        }
        case authActions.AUTH_LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                tokenInfo: initState.tokenInfo,
                userInfo: initState.userInfo,
                payload: initState.payload
            };
        }
        default:
            return state;
    }
}
