import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import ServiceService from "../../services/ServiceService";
import serviceActions from './action';
import notification from "../../helpers/Notification";
import * as PageUrls from '../../configs/PagesUrl';
import { push } from 'connected-react-router';
import ImageService from "../../services/ImageService";

export function* fetchData() {
    yield takeLatest(serviceActions.SERVICE_GET_LIST, function* (action) {
        try {
            const data = yield call(ServiceService.list, action.filter);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: serviceActions.SERVICE_GET_LIST_SUCCESS, state });
            } else {
                yield put({ type: serviceActions.SERVICE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* fetchDataById() {
    yield takeLatest(serviceActions.SERVICE_GET_DETAIL, function* (action) {
        try {
            const data = yield call(ServiceService.show, action.params);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: serviceActions.SERVICE_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: serviceActions.SERVICE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* addData() {
    yield takeLatest(serviceActions.SERVICE_ADD, function* (action) {
        try {
            //upload image
            const dataUploadImage = yield call(ImageService.upload, { image: action.params.image });
            if (!dataUploadImage.status) {
                notification.error(dataUploadImage.message);
                return;
            }
            //override image params
            let info = {
                ...action.params.data,
                images: {
                    source: dataUploadImage.data.big.id,
                    thumbnail: dataUploadImage.data.thumb.id,
                }
            };

            //add product data
            notification.info("Đang thêm...");
            const data = yield call(ServiceService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: serviceActions.SERVICE_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: serviceActions.SERVICE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* uploadImage() {
    yield takeLatest(serviceActions.SERVICE_UPLOAD_IMAGE, function* (action) {
        try {
            const data = yield call(ImageService.upload, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                notification.success('Upload success!');
                yield put({ type: serviceActions.SERVICE_UPLOAD_IMAGE_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                notification.error('Upload failed!');
                yield put({ type: serviceActions.SERVICE_UPLOAD_IMAGE_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* editData() {
    yield takeLatest(serviceActions.SERVICE_EDIT, function* (action) {
        try {
            //get form params
            let info = {
                ...action.params.data
            };
            //upload image
            if (action.params.image !== undefined) {
                const dataUploadImage = yield call(ImageService.upload, {image: action.params.image});
                if (!dataUploadImage.status) {
                    notification.error(dataUploadImage.message);
                    return;
                }
                //override image params
                info = {
                    ...action.params.data,
                    images: {
                        source: dataUploadImage.data.big.id,
                        thumbnail: dataUploadImage.data.thumb.id,
                    }
                };
                //delete old images
                const [source, thumbnail] = yield all([
                    call(ImageService.delete, info.images_origin.source),
                    call(ImageService.delete, info.images_origin.thumbnail)
                ]);
            } else {
                //do not post old one, it's url
                delete info.images;
            }
            //update product data
            notification.info("Đang cập nhât...");
            const data = yield call(ServiceService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: serviceActions.SERVICE_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: serviceActions.SERVICE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* deleteData() {
    yield takeLatest(serviceActions.SERVICE_DELETE, function* (action) {
        try {
            notification.info("Deleting...");
            const data = yield call(ServiceService.delete, action.params);
            const state = {
                message: data.message,
            };
            if (data.status) {
                yield put({ type: serviceActions.SERVICE_STATUS_SUCCESS, state });
            } else {
                yield put({ type: serviceActions.SERVICE_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {
    yield takeEvery(serviceActions.SERVICE_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_SERVICE_LIST));
    });
    yield takeEvery(serviceActions.SERVICE_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_SERVICE_LIST));
    });

    yield takeEvery(serviceActions.SERVICE_STATUS_FAILED, function*(action) {
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
    ]);
}
