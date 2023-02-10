import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import CategoryService from "../../services/CategoryService";
import categoryActions from './action';
import notification from "../../helpers/Notification";
import * as PageUrls from '../../configs/PagesUrl';
import RoomTypeService from "../../services/RoomTypeService";

export function* fetchData() {
    yield takeLatest(categoryActions.CATEGORY_GET_LIST, function* (action) {
        try {
            const data = yield call(CategoryService.list, action.filter);
            const state = {
                data: data.data,
                message: data.message
            };
            if (data.status) {
                yield put({ type: categoryActions.CATEGORY_GET_LIST_SUCCESS, state });
            } else {
                yield put({ type: categoryActions.CATEGORY_GET_LIST_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
    yield takeLatest(categoryActions.CATEGORY_GET_LIST_GROUP, function* (action) {
        try {
            const data = yield call(RoomTypeService.list, {per_page: 1000000});
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: categoryActions.CATEGORY_GET_LIST_GROUP_SUCCESS, state });
            } else {
                yield put({ type: categoryActions.CATEGORY_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* fetchDataById() {

    yield takeLatest(categoryActions.CATEGORY_GET_DETAIL, function* (action) {
        try {
            const data = yield call(CategoryService.show, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: categoryActions.CATEGORY_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: categoryActions.CATEGORY_STATUS_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* addData() {
    yield takeLatest(categoryActions.CATEGORY_ADD, function* (action) {
        try {
            let info = {
                ...action.params.data,
            };

            //add group data
            notification.info("Adding category");
            const data = yield call(CategoryService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: categoryActions.CATEGORY_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: categoryActions.CATEGORY_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* editData() {
    yield takeLatest(categoryActions.CATEGORY_EDIT, function* (action) {
        try {
            //get form params
            let info = {
                ...action.params.data
            };
            //update group
            notification.info("Updating category");
            const data = yield call(CategoryService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type:categoryActions.CATEGORY_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: categoryActions.CATEGORY_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* deleteData() {
    yield takeLatest(categoryActions.CATEGORY_DELETE, function* (action) {
        try {
            const data = yield call(CategoryService.delete, action.params);
            const state = {
                message: data.message,
                id: parseInt(data.data)
            };
            if (data.status) {
                yield put({ type: categoryActions.CATEGORY_DELETE_SUCCESS, state });
            } else {
                yield put({ type: categoryActions.CATEGORY_DELETE_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {

    yield takeEvery(categoryActions.CATEGORY_STATUS_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });

    yield takeEvery(categoryActions.CATEGORY_GET_LIST_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });

    yield takeEvery(categoryActions.CATEGORY_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_CATEGORY_LIST));
    });

    yield takeEvery(categoryActions.CATEGORY_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_CATEGORY_LIST));
    });

    yield takeEvery(categoryActions.CATEGORY_DELETE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_CATEGORY_LIST));
    });
    yield takeEvery(categoryActions.CATEGORY_DELETE_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });
}

export default function* rootSaga() {
    yield all([
        fork(fetchData),
        fork(fetchDataById),
        fork(addData),
        fork(editData),
        fork(deleteData),
        fork(displayMessage),
    ]);
}
