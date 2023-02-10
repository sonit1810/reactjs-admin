import {all, fork, put, call, takeLatest, takeEvery} from 'redux-saga/effects';
import UserService from "../../services/UserService";
import userActions from './action';
import notification from "../../helpers/Notification";
import RoleService from "../../services/RoleService";
import {push} from "connected-react-router";
import * as PageUrls from "../../configs/PagesUrl";

export function* fetchData() {
    yield takeLatest(userActions.USER_GET_LIST, function* (action) {
        try {
            const data = yield call(UserService.list, action.filter);
            //call other apis if success

            if(data.status) {
                const state = {
                    data: data.data
                };
                yield put({type: userActions.USER_GET_LIST_SUCCESS, state});
            } else {
                yield put({type: userActions.USER_GET_LIST_FAILED});
            }
        } catch (e) {
            //already handle error in super fetch
            //we show error only for dev if call wrong function
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
    yield takeLatest(userActions.USER_GET_ROLE_LIST, function* (action) {
        try {
            const data = yield call(RoleService.list, {per_page:999999999});
            //call other apis if success

            if(data.status) {
                const state = {
                    data: data.data
                };
                yield put({type: userActions.USER_GET_ROLE_LIST_SUCCESS, state});
            } else {
                yield put({type: userActions.USER_GET_LIST_FAILED});
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

export function* fetchDataById() {
    yield takeLatest(userActions.USER_GET_DETAIL, function* (action) {
        try {
            const data = yield call(UserService.show, action.params);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: userActions.USER_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: userActions.USER_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* addData() {
    yield takeLatest(userActions.USER_ADD, function* (action) {
        try {
            let info = {
                ...action.params.data,
            };

            //add user data
            notification.info("Adding user");
            const data = yield call(UserService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: userActions.USER_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: userActions.USER_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* editData() {
    yield takeLatest(userActions.USER_EDIT, function* (action) {
        try {
            //get form params
            let info = {
                ...action.params.data
            };
            //update user
            notification.info("Updating user");
            const data = yield call(UserService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type:userActions.USER_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: userActions.USER_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* deleteData() {
    yield takeLatest(userActions.USER_DELETE, function* (action) {
        try {
            notification.info("Deleting user");
            const data = yield call(UserService.delete, action.params);
            const state = {
                message: data.message,
            };
            if (data.status) {
                yield put({ type: userActions.USER_DELETE_SUCCESS, state });
            } else {
                yield put({ type: userActions.USER_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {
    yield takeEvery(userActions.USER_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_USER_LIST));
    });
    yield takeEvery(userActions.USER_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_USER_LIST));
    });
    yield takeEvery(userActions.USER_DELETE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_USER_LIST));
    });
    yield takeEvery(userActions.USER_STATUS_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });
}

export default function* rootSaga() {
    yield all([
        fork(fetchData),
        fork(displayMessage),
        fork(addData),
        fork(editData),
        fork(deleteData),
        fork(fetchDataById)
    ]);
}
