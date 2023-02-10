import { all } from 'redux-saga/effects';
import userSaga from './user/saga';
import authSaga from './auth/saga';
import categorySaga from './category/saga';
import roomTypeSaga from './roomType/saga';
import roomFacilitySaga from './roomFacility/saga';
import pageSaga from './page/saga';
import roomSaga from './room/saga'
import categoryPageSaga from './categoryPage/saga';
import promotionSaga from './promotion/saga';
import roleSaga from './role/saga';
import homepageSaga from './homepage/saga';
import gallerySaga from './gallery/saga';
import serviceSaga from './service/saga';
import informationSaga from './information/saga';

export default function* rootSaga(getState) {
    yield all([
        userSaga(),
        authSaga(),
        categorySaga(),
        roomTypeSaga(),
        roomFacilitySaga(),
        pageSaga(),
        roomSaga(),
        categoryPageSaga(),
        promotionSaga(),
        roleSaga(),
        homepageSaga(),
        gallerySaga(),
        serviceSaga(),
        informationSaga()
    ]);
}
