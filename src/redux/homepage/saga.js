import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import HomepageService from "../../services/HomepageService";
import homepageActions from './action';
import notification from "../../helpers/Notification";
import {push} from "connected-react-router";
import * as PageUrls from "../../configs/PagesUrl";
import ImageService from "../../services/ImageService";

export function* fetchData() {
    yield takeLatest(homepageActions.HOMEPAGE_GET_LIST, function* (action) {
        try {
            const data = yield call(HomepageService.list, action.filter);
            const state = {
                data: data.data,
                message: data.message
            };
            if (data.status) {
                yield put({ type: homepageActions.HOMEPAGE_GET_LIST_SUCCESS, state });
            } else {
                yield put({ type: homepageActions.HOMEPAGE_GET_LIST_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* fetchDataById() {

    yield takeLatest(homepageActions.HOMEPAGE_GET_DETAIL, function* (action) {
        try {
            const data = yield call(HomepageService.show, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: homepageActions.HOMEPAGE_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: homepageActions.HOMEPAGE_GET_DETAIL_FAILED });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* addData() {
    yield takeLatest(homepageActions.HOMEPAGE_ADD, function* (action) {
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
                image: dataUploadImage.data.big.id
            };

            //add product data
            notification.info("Đang thêm...");
            const data = yield call(HomepageService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: homepageActions.HOMEPAGE_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: homepageActions.HOMEPAGE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* editData() {
    yield takeLatest(homepageActions.HOMEPAGE_EDIT, function* (action) {
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
                    image: dataUploadImage.data.big.id
                };
                //delete old images
                yield call(ImageService.delete, info.image_origin);
            } else {
                //do not post old one, it's url
                delete info.image;
            }
            //update product data
            notification.info("Đang cập nhât...");
            const data = yield call(HomepageService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: homepageActions.HOMEPAGE_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: homepageActions.HOMEPAGE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* uploadImage() {
    yield takeLatest(homepageActions.HOMEPAGE_UPLOAD_IMAGE, function* (action) {
        try {
            const data = yield call(HomepageService.upload, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: homepageActions.HOMEPAGE_UPLOAD_IMAGE_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: homepageActions.HOMEPAGE_UPLOAD_IMAGE_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* uploadLogo() {
    yield takeLatest(homepageActions.HOMEPAGE_UPLOAD_LOGO, function* (action) {
        try {
            const data = yield call(HomepageService.upload, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                yield put({ type: homepageActions.HOMEPAGE_UPLOAD_LOGO_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: homepageActions.HOMEPAGE_UPLOAD_LOGO_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* deleteData() {
    yield takeLatest(homepageActions.HOMEPAGE_DELETE, function* (action) {
        try {
            const data = yield call(HomepageService.delete, action.params.id);
            const state = {
                message: data.message,
                id: parseInt(data.data)
            };
            if (data.status) {
                yield put({ type: homepageActions.HOMEPAGE_DELETE_SUCCESS, state });
                yield call(ImageService.delete, action.params.image);

            } else {
                yield put({ type: homepageActions.HOMEPAGE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {
    yield takeEvery(homepageActions.HOMEPAGE_STATUS_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        // yield put(push(PageUrls.HOMEPAGE_MEMBER_GROUP_DETAILS + "/" + action.state.id));
    });

    yield takeEvery(homepageActions.HOMEPAGE_STATUS_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });

    yield takeEvery(homepageActions.HOMEPAGE_GET_LIST_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });

    yield takeEvery(homepageActions.HOMEPAGE_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_HOMEPAGE_GALLERY_LIST));
    });

    yield takeEvery(homepageActions.HOMEPAGE_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_HOMEPAGE_GALLERY_LIST));
    });

    yield takeEvery(homepageActions.HOMEPAGE_DELETE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_HOMEPAGE_GALLERY_LIST));
    });
    yield takeEvery(homepageActions.HOMEPAGE_DELETE_FAILED, function*(action) {
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
