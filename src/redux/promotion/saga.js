import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import PromotionService from "../../services/PromotionService";
import promotionActions from './action';
import notification from "../../helpers/Notification";
import * as PageUrls from '../../configs/PagesUrl';
import { push } from 'connected-react-router';
import PageService from "../../services/PageService";
import ImageService from "../../services/ImageService";
import RoomService from "../../services/RoomService";

export function* fetchData() {
    yield takeLatest(promotionActions.PROMOTION_GET_LIST, function* (action) {
        try {
            const data = yield call(PromotionService.list, action.filter);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: promotionActions.PROMOTION_GET_LIST_SUCCESS, state });
            } else {
                yield put({ type: promotionActions.PROMOTION_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });

    yield takeLatest(promotionActions.PROMOTION_GET_LIST_ROOM, function* (action) {
        try {
            const data = yield call(RoomService.list, {per_page: 1000000});
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: promotionActions.PROMOTION_GET_LIST_ROOM_SUCCESS, state });
            } else {
                yield put({ type: promotionActions.PROMOTION_GET_LIST_ROOM_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });

}

export function* fetchDataById() {
    yield takeLatest(promotionActions.PROMOTION_GET_DETAIL, function* (action) {
        try {
            const data = yield call(PromotionService.show, action.params);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: promotionActions.PROMOTION_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: promotionActions.PROMOTION_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* addData() {
    yield takeLatest(promotionActions.PROMOTION_ADD, function* (action) {
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
            const data = yield call(PromotionService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: promotionActions.PROMOTION_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: promotionActions.PROMOTION_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* uploadImage() {
    yield takeLatest(promotionActions.PROMOTION_UPLOAD_IMAGE, function* (action) {
        try {
            const data = yield call(ImageService.upload, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                notification.success('Upload success!');
                yield put({ type: promotionActions.PROMOTION_UPLOAD_IMAGE_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                notification.error('Upload failed!');
                yield put({ type: promotionActions.PROMOTION_UPLOAD_IMAGE_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* editData() {
    yield takeLatest(promotionActions.PROMOTION_EDIT, function* (action) {
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

            //update promotion data
            notification.info("Đang cập nhât...");
            const data = yield call(PromotionService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: promotionActions.PROMOTION_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: promotionActions.PROMOTION_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* deleteData() {
    yield takeLatest(promotionActions.PROMOTION_DELETE, function* (action) {
        try {
            notification.info("Deleting...");
            const data = yield call(PromotionService.delete, action.params);
            const state = {
                message: data.message,
            };
            if (data.status) {
                yield put({ type: promotionActions.PROMOTION_DELETE_SUCCESS, state });
            } else {
                yield put({ type: promotionActions.PROMOTION_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {
    yield takeEvery(promotionActions.PROMOTION_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_PROMOTION_LIST));
    });
    yield takeEvery(promotionActions.PROMOTION_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_PROMOTION_LIST));
    });
    yield takeEvery(promotionActions.PROMOTION_DELETE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_PROMOTION_LIST));
    });

    yield takeEvery(promotionActions.PROMOTION_STATUS_FAILED, function*(action) {
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
