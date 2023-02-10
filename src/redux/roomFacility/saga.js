import {all, fork, put, call, takeLatest, takeEvery} from 'redux-saga/effects';
import RoomFacilityService from "../../services/RoomFacilityService";
import variantActions from './action';
import notification from "../../helpers/Notification";
// import variantActions from "../variant/action";
// import memberVariantActions from "../memberVariant/action";
// import VariantService from "../../services/VariantService";
import {push} from "connected-react-router";
import * as PageUrls from "../../configs/PagesUrl";

export function* fetchData() {
    yield takeLatest(variantActions.VARIANT_GET_LIST, function* (action) {
        try {
            const data = yield call(RoomFacilityService.list, action.filter);
            //call other apis if success

            if(data.status) {
                const state = {
                    data: data.data,
                    message: data.message
                };
                yield put({type: variantActions.VARIANT_GET_LIST_SUCCESS, state});
            } else {
                yield put({type: variantActions.VARIANT_GET_LIST_FAILED});
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
    yield takeLatest(variantActions.VARIANT_GET_DETAIL, function* (action) {
        try {
            const data = yield call(RoomFacilityService.show, action.params);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: variantActions.VARIANT_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: variantActions.VARIANT_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}


export function* addData() {
    yield takeLatest(variantActions.VARIANT_ADD, function* (action) {
        try {
            let info = {
                ...action.params.data,
            };

            //add variant data
            notification.info("Đang thêm...");
            const data = yield call(RoomFacilityService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: variantActions.VARIANT_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: variantActions.VARIANT_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* editData() {
    yield takeLatest(variantActions.VARIANT_EDIT, function* (action) {
        try {
            //get form params
            let info = {
                ...action.params.data
            };
            //update variant
            notification.info("Đang cập nhât...");
            const data = yield call(RoomFacilityService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type:variantActions.VARIANT_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: variantActions.VARIANT_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* deleteData() {
    yield takeLatest(variantActions.VARIANT_DELETE, function* (action) {
        try {
            notification.info("Deleting...");
            const data = yield call(RoomFacilityService.delete, action.params);
            const state = {
                message: data.message,
            };
            if (data.status) {
                yield put({ type: variantActions.VARIANT_DELETE_SUCCESS, state });
            } else {
                yield put({ type: variantActions.VARIANT_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {
    yield takeEvery(variantActions.VARIANT_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_FACILITY_LIST));
    });
    yield takeEvery(variantActions.VARIANT_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_FACILITY_LIST));
    });
    yield takeEvery(variantActions.VARIANT_DELETE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_FACILITY_LIST));
    });
    yield takeEvery(variantActions.VARIANT_STATUS_FAILED, function*(action) {
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
