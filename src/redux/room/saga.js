import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import RoomService from "../../services/RoomService";
import roomActions from './action';
import notification from "../../helpers/Notification";
import * as PageUrls from '../../configs/PagesUrl';
import { push } from 'connected-react-router';
import PageService from "../../services/PageService";
import ImageService from "../../services/ImageService";
import RoomTypeService from "../../services/RoomTypeService";
import {store} from "../store";
import authActions from "../auth/action";

export function* fetchData() {
    yield takeLatest(roomActions.ROOM_GET_LIST, function* (action) {
        try {
            const data = yield call(RoomService.list, action.filter);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: roomActions.ROOM_GET_LIST_SUCCESS, state });
            } else {
                yield put({ type: roomActions.ROOM_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
    yield takeLatest(roomActions.ROOM_GET_LIST_ROOM_TYPE, function* (action) {
        try {
            const data = yield call(RoomTypeService.list, {per_page: 1000000});
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: roomActions.ROOM_GET_LIST_ROOM_TYPE_SUCCESS, state });
            } else {
                yield put({ type: roomActions.ROOM_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
    yield takeLatest(roomActions.ROOM_GET_LIST_ROOM_FACILITY, function* (action) {
        try {
            const data = yield call(RoomService.listVariant, {per_page: 1000000});
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: roomActions.ROOM_GET_LIST_ROOM_FACILITY_SUCCESS, state });
            } else {
                yield put({ type: roomActions.ROOM_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* fetchDataById() {
    yield takeLatest(roomActions.ROOM_GET_DETAIL, function* (action) {
        try {
            const data = yield call(RoomService.show, action.params);
            const state = {
                data: data.data,
                message: data.message,
            };
            if (data.status) {
                yield put({ type: roomActions.ROOM_GET_DETAIL_SUCCESS, state });
            } else {
                yield put({ type: roomActions.ROOM_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}
export function* addData() {
    yield takeLatest(roomActions.ROOM_ADD, function* (action) {
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
            const data = yield call(RoomService.add, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: roomActions.ROOM_ADD_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: roomActions.ROOM_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });

    yield takeLatest(roomActions.ROOM_ADD_IMAGE, function* (action) {
        try {
            //upload image
            const dataUploadImage = yield call(ImageService.upload, { image: action.params.image });
            if (!dataUploadImage.status) {
                notification.error(dataUploadImage.message);
                return;
            }

            //override image params
            let newGalleries = [...action.params.data.galleries, {
                source: dataUploadImage.data.big.id,
                thumbnail: dataUploadImage.data.thumb.id,
            }];

            let info = {
                ...action.params.data,
                galleries: newGalleries
            };

            //add product data
            notification.info("Adding image...");
            const data = yield call(RoomService.edit, info);
            if (data.status) {
                const state = {
                    id: info.id,
                    message: data.message,
                };
                yield put({ type: roomActions.ROOM_ADD_IMAGE_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                    id: info.id
                };
                yield put({ type: roomActions.ROOM_ADD_IMAGE_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* uploadImage() {
    yield takeLatest(roomActions.ROOM_UPLOAD_IMAGE, function* (action) {
        try {
            const data = yield call(ImageService.upload, action.params);
            if (data.status) {
                const state = {
                    data: data.data
                };
                notification.success('Upload success!');
                yield put({ type: roomActions.ROOM_UPLOAD_IMAGE_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                notification.error('Upload failed!');
                yield put({ type: roomActions.ROOM_UPLOAD_IMAGE_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* editData() {
    yield takeLatest(roomActions.ROOM_EDIT, function* (action) {
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
            const data = yield call(RoomService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: roomActions.ROOM_EDIT_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                };
                yield put({ type: roomActions.ROOM_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });

    yield takeLatest(roomActions.ROOM_DELETE_IMAGE, function* (action) {
        try {
            notification.info("Deleting image...");
            const params = action.params;

            //delete old images
            const [source, thumbnail] = yield all([
                call(ImageService.delete, params.needDelete.source),
                call(ImageService.delete, params.needDelete.thumbnail)
            ]);
            const newGalleries = params.galleries.filter((item) => {
               if (item.source !== params.needDelete.source) {
                   return item;
               }
            });
            const info = {
                id: params.id,
                galleries: newGalleries
            };

            //update
            const data = yield call(RoomService.edit, info);
            if (data.status) {
                const state = {
                    id: data.data.id,
                    message: data.message,
                };
                yield put({ type: roomActions.ROOM_DELETE_IMAGE_SUCCESS, state });
            } else {
                const state = {
                    message: data.message,
                    id: info.id
                };
                yield put({ type: roomActions.ROOM_DELETE_IMAGE_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* deleteData() {
    yield takeLatest(roomActions.ROOM_DELETE, function* (action) {
        try {
            notification.info("Deleting...");
            const data = yield call(RoomService.delete, action.params);
            const state = {
                message: data.message,
            };
            if (data.status) {
                yield put({ type: roomActions.ROOM_DELETE_SUCCESS, state });
            } else {
                yield put({ type: roomActions.ROOM_STATUS_FAILED, state });
            }
        } catch (e) {
            if (e.message.indexOf('call') !== -1) {
                notification.error('Call wrong function & params. Check the coding');
            }
        }
    });
}

export function* displayMessage() {
    yield takeEvery(roomActions.ROOM_ADD_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_LIST));
    });
    yield takeEvery(roomActions.ROOM_EDIT_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_LIST));
    });
    yield takeEvery(roomActions.ROOM_DELETE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        yield put(push(PageUrls.PAGE_ROOM_LIST));
    });

    yield takeEvery(roomActions.ROOM_STATUS_FAILED, function*(action) {
        yield notification.error(action.state.message);
    });
    yield takeEvery(roomActions.ROOM_ADD_IMAGE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        //window.location = PageUrls.PAGE_ROOM_LIST_IMAGE + '/' + action.state.id;
        console.log(action.state.id);
        store.dispatch(roomActions.getById(action.state.id));
    });
    yield takeEvery(roomActions.ROOM_DELETE_IMAGE_SUCCESS, function*(action) {
        yield notification.success(action.state.message);
        // window.location = PageUrls.PAGE_ROOM_LIST_IMAGE + '/' + action.state.id;
        store.dispatch(roomActions.getById(action.state.id));
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
