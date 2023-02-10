import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import PageService from "../../services/PageService";
import categoryPageActions from './action';
import notification from "../../helpers/Notification";
import CategoryPageService from '../../services/CategoryPageService';
export function* fetchData() {
    yield takeLatest(categoryPageActions.CATEGORY_PAGE_GET_LIST, function* (action) {
        try {
            const data = yield call(PageService.list, action.filter);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: categoryPageActions.CATEGORY_PAGE_GET_LIST_STATUS_SUCCESS, state });
            } else {
                yield put({ type: categoryPageActions.CATEGORY_PAGE_GET_LIST_STATUS_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* fetchDataById() {

    yield takeLatest(categoryPageActions.CATEGORY_PAGE_DETAIL, function* (action) {
        try {
            const data = yield call(CategoryPageService.show, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: categoryPageActions.CATEGORY_PAGE_DETAIL_STATUS_SUCCESS, state });
            } else {
                yield put({ type: categoryPageActions.CATEGORY_PAGE_DETAIL_STATUS_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* addCategoryPage() {

    yield takeLatest(categoryPageActions.CATEGORY_PAGE_ADD, function* (action) {
        try {
            const data = yield call(CategoryPageService.add, action.params);
            if (data.status) {
                let newRecord = data.data;
                newRecord.page_info = action.selectedPageTemplate;
                const state = {
                    data: newRecord,
                    message: data.message
                };
                yield put({ type: categoryPageActions.CATEGORY_PAGE_ADD_STATUS_SUCCESS, state });
            } else {
                yield put({ type: categoryPageActions.CATEGORY_PAGE_ADD_STATUS_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* editCategoryPage() {

    yield takeLatest(categoryPageActions.CATEGORY_PAGE_EDIT, function* (action) {
        try {
            const data = yield call(CategoryPageService.edit, action.params);
            if (data.status) {
                let newRecord = data.data;
                newRecord.page_info = action.selectedPageTemplate;
                const state = {
                    data: newRecord,
                    message: data.message
                };
                yield put({ type: categoryPageActions.CATEGORY_PAGE_EDIT_STATUS_SUCCESS, state });
            } else {
                yield put({ type: categoryPageActions.CATEGORY_PAGE_EDIT_STATUS_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* deleteCategoryPage() {

    yield takeLatest(categoryPageActions.CATEGORY_PAGE_DELETE, function* (action) {
        try {
            const data = yield call(CategoryPageService.delete, action.params);
            if (data.status) {
                const state = {
                    data: data.data,
                    message: data.message
                };
                yield put({ type: categoryPageActions.CATEGORY_PAGE_DELETE_STATUS_SUCCESS, state });
            } else {
                yield put({ type: categoryPageActions.CATEGORY_PAGE_DELETE_STATUS_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* fetchCategoryPageProductData() {
    yield takeLatest(categoryPageActions.CATEGORY_PAGE_ROOM_GET_LIST, function* (action) {
        try {
            const data = yield call(CategoryPageService.listCatePageProduct, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: categoryPageActions.CATEGORY_PAGE_ROOM_GET_LIST_STATUS_SUCCESS, state });
            } else {
                yield put({ type: categoryPageActions.CATEGORY_PAGE_ROOM_GET_LIST_STATUS_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* editDataById() {

    yield takeLatest(categoryPageActions.CATEGORY_PAGE_ROOM_EDIT, function* (action) {
        try {
            const data = yield call(CategoryPageService.edit, action.params);
            if (data.status) {
                const state = {
                    data: data.data,
                    message: 'SUCCESS'
                };
                yield put({ type: categoryPageActions.CATEGORY_PAGE_ROOM_EDIT_STATUS_SUCCESS, state });
               
            } else {
                yield put({ type: categoryPageActions.CATEGORY_PAGE_ROOM_EDIT_STATUS_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* displayMessage() {
    yield takeEvery(categoryPageActions.CATEGORY_PAGE_ADD_STATUS_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
    });

    yield takeEvery(categoryPageActions.CATEGORY_PAGE_DELETE_STATUS_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
    });
}

export default function* rootSaga() {
    yield all([
        fork(fetchData),
        fork(fetchDataById),
        fork(addCategoryPage),
        fork(deleteCategoryPage),
        fork(fetchCategoryPageProductData),
        fork(editDataById),
        fork(editCategoryPage),
        fork(displayMessage)
    ]);
}
