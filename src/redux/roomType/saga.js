import {all, fork, put, call, takeLatest, takeEvery} from 'redux-saga/effects';
import RoomTypeService from "../../services/RoomTypeService";
import roomTypeActions from './action';
import notification from "../../helpers/Notification";
import {push} from "connected-react-router";
import * as PageUrls from "../../configs/PagesUrl";

export function* fetchData() {
    yield takeLatest(roomTypeActions.ROOM_TYPE_GET_LIST, function* (action) {
        try {
            const data = yield call(RoomTypeService.list, action.filter);
            //call other apis if success

            if(data.status) {
                const state = {
                    data: data.data,
                    message: data.message
                };
                yield put({type: roomTypeActions.ROOM_TYPE_GET_LIST_SUCCESS, state});
            } else {
                yield put({type: roomTypeActions.ROOM_TYPE_GET_LIST_FAILED});
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
    yield takeLatest(roomTypeActions.ROOM_TYPE_GET_DETAIL, function* (action) {
        try {
            const data = yield call(RoomTypeService.show, action.params);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: roomTypeActions.ROOM_TYPE_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: roomTypeActions.ROOM_TYPE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}


export function* addData() {
    yield takeLatest(roomTypeActions.ROOM_TYPE_ADD, function* (action) {
        try {
            let info = {
                ...action.params.data,
            };

            //add group data
            notification.info("Đang thêm...");
            const data = yield call(RoomTypeService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: roomTypeActions.ROOM_TYPE_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: roomTypeActions.ROOM_TYPE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* editData() {
    yield takeLatest(roomTypeActions.ROOM_TYPE_EDIT, function* (action) {
        try {
            //get form params
            let info = {
                ...action.params.data
            };
            //update group
            notification.info("Đang cập nhât...");
            const data = yield call(RoomTypeService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type:roomTypeActions.ROOM_TYPE_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: roomTypeActions.ROOM_TYPE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });

    yield takeLatest(roomTypeActions.ROOM_TYPE_UPDATE_SORT_LIST, function* (action) {
        try {
            notification.info("Đang cập nhât...");
            const data = yield call(RoomTypeService.updateSortList, action.params);
            if (data.status) {
                const state = {
                    message: data.message,
                };
                yield put({ type:roomTypeActions.ROOM_TYPE_UPDATE_SORT_LIST_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: roomTypeActions.ROOM_TYPE_UPDATE_SORT_LIST_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* deleteData() {
    yield takeLatest(roomTypeActions.ROOM_TYPE_DELETE, function* (action) {
        try {
            notification.info("Deleting...");
            const data = yield call(RoomTypeService.delete, action.params);
            const state = {
                message: data.message,
            };
            if (data.status) {
                yield put({ type: roomTypeActions.ROOM_TYPE_DELETE_SUCCESS, state });
            } else {
                yield put({ type: roomTypeActions.ROOM_TYPE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {
    yield takeEvery(roomTypeActions.ROOM_TYPE_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_TYPE_LIST));
    });
    yield takeEvery(roomTypeActions.ROOM_TYPE_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_TYPE_LIST));
    });
    yield takeEvery(roomTypeActions.ROOM_TYPE_DELETE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_TYPE_LIST));
    });
    yield takeEvery(roomTypeActions.ROOM_TYPE_STATUS_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });
    yield takeEvery(roomTypeActions.ROOM_TYPE_UPDATE_SORT_LIST_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
    });
    yield takeEvery(roomTypeActions.ROOM_TYPE_UPDATE_SORT_LIST_FAILED, function*(action) {
        yield notification.error(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_TYPE_LIST));
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
