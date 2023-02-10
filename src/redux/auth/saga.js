import {all, takeEvery, fork, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import UserService from "../../services/UserService";
import authActions from './action';
import notification from "../../helpers/Notification";
import {getToken, clearToken, setToken} from '../../helpers/Ultis';
import * as PageUrls from '../../configs/PagesUrl';

export function* authorize() {
    yield takeLatest(authActions.AUTH_AUTHORIZE, function* (action) {
        try {

            const params = {email: action.payload.username, password: action.payload.password};
            const data = yield call(UserService.login, params);

            if (data.status) {
                const state = {
                    isLoggedIn: true,
                    tokenInfo: data.data,
                    message: data.message,
                };
                yield put({type: authActions.AUTH_AUTHORIZE_SUCCESS, state});
            } else {
                const state = {
                    isLoggedIn: false,
                    tokenInfo: [],
                    message: data.message,
                };
                yield put({type: authActions.AUTH_AUTHORIZE_FAILED, state});
            }

        } catch (e) {
            //already handle error in super fetch
            //we show error only for dev if call wrong function
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* loginSuccess() {
    yield takeEvery(authActions.AUTH_AUTHORIZE_SUCCESS, function*(action) {
        yield setToken(JSON.stringify(action.state));

        const data = yield call(UserService.getLoggedUserInfo);
        if (data.status) {
            const state = {
                userInfo: data.data,
                message: data.message,
            };
            yield put({type: authActions.AUTH_GET_USER_SUCCESS, state});
        } else {
            const state = {
                userInfo: {},
                message: data.message,
            };
            yield put({type: authActions.AUTH_GET_USER_FAILED, state});
        }

        //from login back or background check
        if (action.background === undefined) {
            notification.success(action.state.message);
            yield put(push(PageUrls.PAGE_DASHBOARD));
        }
    });
}

export function* loginError() {
    yield takeEvery(authActions.AUTH_AUTHORIZE_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });
}

export function* logout() {
    yield takeEvery(authActions.AUTH_LOGOUT, function*() {
        clearToken();
        yield put(push(PageUrls.PAGE_ROOT));
    });
}
export function* checkAuthorization() {
    yield takeEvery(authActions.AUTH_CHECK_AUTHORIZATION, function*() {
        const data = getToken().get('data');
        if (data) {
            yield put({
                type: authActions.AUTH_AUTHORIZE_SUCCESS,
                state: JSON.parse(data),
                background: true,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(authorize),
        fork(checkAuthorization),
        fork(loginSuccess),
        fork(loginError),
        fork(logout),
    ]);
}
