import {all, fork, put, call, takeLatest, takeEvery} from 'redux-saga/effects';
import RoleService from "../../services/RoleService";
import roleActions from './action';
import notification from "../../helpers/Notification";
import {push} from "connected-react-router";
import * as PageUrls from "../../configs/PagesUrl";

export function* fetchData() {
    yield takeLatest(roleActions.ROLE_GET_LIST, function* (action) {
        try {
            const data = yield call(RoleService.list, action.filter);
            //call other apis if success

            if(data.status) {
                const state = {
                    data: data.data,
                    message: data.message
                };
                yield put({type: roleActions.ROLE_GET_LIST_SUCCESS, state});
            } else {
                yield put({type: roleActions.ROLE_GET_LIST_FAILED});
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

export function* displayMessage() {

    yield takeEvery(roleActions.ROLE_STATUS_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });
}


export default function* rootSaga() {
    yield all([
        fork(fetchData),
        fork(displayMessage)
    ]);
}
