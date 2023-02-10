import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import PageService from "../../services/PageService";
import pageActions from './action';
import notification from "../../helpers/Notification";
import {push} from "connected-react-router";
import * as PageUrls from "../../configs/PagesUrl";
import ImageService from "../../services/ImageService";

export function* fetchData() {
    yield takeLatest(pageActions.PAGE_GET_LIST, function* (action) {
        try {
            const data = yield call(PageService.list, action.filter);
            const state = {
                data: data.data,
                message: data.message
            };
            if (data.status) {
                yield put({ type: pageActions.PAGE_GET_LIST_SUCCESS, state });
            } else {
                yield put({ type: pageActions.PAGE_GET_LIST_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* fetchDataById() {

    yield takeLatest(pageActions.PAGE_GET_DETAIL, function* (action) {
        try {
            const data = yield call(PageService.show, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: pageActions.PAGE_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: pageActions.PAGE_GET_DETAIL_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* addData() {
    yield takeLatest(pageActions.PAGE_ADD, function* (action) {
        try {
            //upload image
            const dataUploadImage = yield call(ImageService.upload,
                { image: action.params.image, nothumb: true });
            if (!dataUploadImage.status) {
                notification.error(dataUploadImage.message);
                return;
            }
            //override image params
            let info = {
                ...action.params.data,
                sample_image: dataUploadImage.data.big.id
            };

            //add product data
            notification.info("Adding page template");
            const data = yield call(PageService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: pageActions.PAGE_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: pageActions.PAGE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* editData() {
    yield takeLatest(pageActions.PAGE_EDIT, function* (action) {
        try {
            //get form params
            let info = {
                ...action.params.data
            };
            //upload image
            if (action.params.image !== undefined) {
                const dataUploadImage = yield call(ImageService.upload,
                    {image: action.params.image, nothumb: true});
                if (!dataUploadImage.status) {
                    notification.error(dataUploadImage.message);
                    return;
                }
                //override image params
                info = {
                    ...action.params.data,
                    sample_image: dataUploadImage.data.big.id
                };
                //delete old images
                yield call(ImageService.delete, info.sample_image_origin);
            } else {
                //do not post old one, it's url
                delete info.sample_image;
            }
            //update product data
            notification.info("Updating page template");
            const data = yield call(PageService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: pageActions.PAGE_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: pageActions.PAGE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* uploadImage() {
    yield takeLatest(pageActions.PAGE_UPLOAD_IMAGE, function* (action) {
        try {
            const data = yield call(PageService.upload, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: pageActions.PAGE_UPLOAD_IMAGE_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: pageActions.PAGE_UPLOAD_IMAGE_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* uploadLogo() {
    yield takeLatest(pageActions.PAGE_UPLOAD_LOGO, function* (action) {
        try {
            const data = yield call(PageService.upload, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: pageActions.PAGE_UPLOAD_LOGO_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: pageActions.PAGE_UPLOAD_LOGO_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* deleteData() {
    yield takeLatest(pageActions.PAGE_DELETE, function* (action) {
        try {
            const data = yield call(PageService.delete, action.params.id);
            const state = {
                message: data.message,
                id: parseInt(data.data)
            };
            if (data.status) {
                yield put({ type: pageActions.PAGE_DELETE_SUCCESS, state });
                yield call(ImageService.delete, action.params.image);

            } else {
                yield put({ type: pageActions.PAGE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {
    yield takeEvery(pageActions.PAGE_STATUS_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        // yield put(push(PageUrls.PAGE_MEMBER_GROUP_DETAILS + "/" + action.state.id));
    });

    yield takeEvery(pageActions.PAGE_STATUS_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });

    yield takeEvery(pageActions.PAGE_GET_LIST_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });

    yield takeEvery(pageActions.PAGE_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_MASTER_PAGE_LIST));
    });

    yield takeEvery(pageActions.PAGE_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_MASTER_PAGE_LIST));
    });

    yield takeEvery(pageActions.PAGE_DELETE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_MASTER_PAGE_LIST));
    });
    yield takeEvery(pageActions.PAGE_DELETE_FAILED, function*(action) {
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
        fork(uploadImage),
        fork(uploadLogo),
    ]);
}
