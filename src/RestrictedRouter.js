import React from "react";
import { Route, Switch } from 'react-router-dom';

import * as PagesUrl from './configs/PagesUrl';
import ScreensDashboardIndex from './screens/Dashboard/Index';
import ScreensUserRegister from "./screens/User/Add";
import ScreensUserList from './screens/User/List';
import ScreensUserEdit from './screens/User/Edit';
import ScreensUserDelete from './screens/User/Delete';
import ScreensUserDetail from './screens/User/Detail';

import ScreensCategoryList from './screens/Category/List';
import ScreensCategoryAdd from './screens/Category/Add';
import ScreensCategoryEdit from './screens/Category/Edit';
import ScreensCategoryDelete from './screens/Category/Delete';

import ScreensRoomTypeList from './screens/RoomType/List';
import ScreensRoomTypeAdd from './screens/RoomType/Add';
import ScreensRoomTypeEdit from './screens/RoomType/Edit';
import ScreensRoomTypeDelete from './screens/RoomType/Delete';

import ScreensRoomFacilityList from './screens/RoomFacility/List';
import ScreensRoomFacilityAdd from './screens/RoomFacility/Add';
import ScreensRoomFacilityEdit from './screens/RoomFacility/Edit';
import ScreensRoomFacilityDelete from './screens/RoomFacility/Delete';

import ScreensPageList from './screens/Page/List';
import ScreensPageDetail from './screens/Page/Detail';
import ScreensPageAdd from './screens/Page/Add';
import ScreensPageEdit from './screens/Page/Edit';
import ScreensPageDelete from './screens/Page/Delete';

import ScreensRoomList from './screens/Room/List';
import ScreensRoomDetail from './screens/Room/Detail';
import ScreensRoomAdd from './screens/Room/Add';
import ScreensRoomEdit from './screens/Room/Edit';
import ScreensRoomDelete from './screens/Room/Delete';
import ScreensRoomListImage from './screens/Room/ListImage';

import ScreensServiceList from './screens/Service/List';
import ScreensServiceAdd from './screens/Service/Add';
import ScreensServiceEdit from './screens/Service/Edit';
import ScreensServiceDetail from './screens/Service/Detail';
import ScreensServiceDelete from './screens/Service/Delete';

import ScreensPromotionList from './screens/Promotion/List';
import ScreensPromotionDetail from './screens/Promotion/Detail';
import ScreensPromotionAdd from './screens/Promotion/Add';
import ScreensPromotionEdit from './screens/Promotion/Edit';
import ScreensPromotionDelete from './screens/Promotion/Delete';

import ScreensRoleList from './screens/Role/List';

import ScreensHomePageList from './screens/Homepage/List';
import ScreensHomePageAdd from './screens/Homepage/Add';
import ScreensHomePageEdit from './screens/Homepage/Edit';
import ScreensHomePageDelete from './screens/Homepage/Delete';

import ScreensGalleryList from './screens/Gallery/List';
import ScreensGalleryAdd from './screens/Gallery/Add';
import ScreensGalleryEdit from './screens/Gallery/Edit';
import ScreensGalleryDelete from './screens/Gallery/Delete';

import ScreensInformationList from './screens/Information/List';
import ScreensInformationAdd from './screens/Information/Add';
import ScreensInformationEdit from './screens/Information/Edit';
import ScreensInformationDetail from './screens/Information/Detail';
import ScreensInformationDelete from './screens/Information/Delete';

import PageNotFound from "./components/Layout/PageNotFound";

const privateComponents = [
    {
        path: PagesUrl.PAGE_DASHBOARD,
        component: ScreensDashboardIndex,
        exact: true
    },
    {
        path: PagesUrl.PAGE_CATEGORY_LIST,
        component: ScreensCategoryList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_CATEGORY_ADD,
        component: ScreensCategoryAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_CATEGORY_EDIT + '/:categoryId',
        component: ScreensCategoryEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_CATEGORY_DELETE + '/:categoryId',
        component: ScreensCategoryDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_GROUP_LIST,
        component: ScreensRoomTypeList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_GROUP_ADD,
        component: ScreensRoomTypeAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_GROUP_EDIT + '/:groupId',
        component: ScreensRoomTypeEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_GROUP_DELETE + '/:groupId',
        component: ScreensRoomTypeDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_MASTER_PAGE_LIST,
        component: ScreensPageList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_MASTER_PAGE_DETAIL + '/:pageId',
        component: ScreensPageDetail,
        exact: true
    },
    {
        path: PagesUrl.PAGE_MASTER_PAGE_ADD,
        component: ScreensPageAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_MASTER_PAGE_EDIT + '/:pageId',
        component: ScreensPageEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_MASTER_PAGE_DELETE + '/:pageId',
        component: ScreensPageDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_LIST,
        component: ScreensRoomList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_DETAIL + '/:id',
        component: ScreensRoomDetail,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_ADD,
        component: ScreensRoomAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_EDIT + '/:id',
        component: ScreensRoomEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_DELETE + '/:id',
        component: ScreensRoomDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_LIST_IMAGE + '/:id',
        component: ScreensRoomListImage,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_FACILITY_LIST,
        component: ScreensRoomFacilityList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_FACILITY_ADD,
        component: ScreensRoomFacilityAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_FACILITY_EDIT + '/:variantId',
        component: ScreensRoomFacilityEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_FACILITY_DELETE + '/:variantId',
        component: ScreensRoomFacilityDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_TYPE_LIST,
        component: ScreensRoomTypeList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_TYPE_ADD,
        component: ScreensRoomTypeAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_TYPE_EDIT + '/:id',
        component: ScreensRoomTypeEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROOM_TYPE_DELETE + '/:id',
        component: ScreensRoomTypeDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_PROMOTION_LIST,
        component: ScreensPromotionList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_PROMOTION_ADD,
        component: ScreensPromotionAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_PROMOTION_EDIT + '/:promotionId',
        component: ScreensPromotionEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_PROMOTION_DETAIL + '/:promotionId',
        component: ScreensPromotionDetail,
        exact: true
    },
    {
        path: PagesUrl.PAGE_PROMOTION_DELETE + '/:promotionId',
        component: ScreensPromotionDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_ROLE_LIST,
        component: ScreensRoleList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_USER_ADD,
        component: ScreensUserRegister,
        exact: true
    },
    {
        path: PagesUrl.PAGE_USER_LIST,
        component: ScreensUserList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_USER_DETAIL + '/:userId',
        component: ScreensUserDetail,
        exact: true
    },
    {
        path: PagesUrl.PAGE_USER_EDIT + '/:userId',
        component: ScreensUserEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_USER_DELETE + '/:userId',
        component: ScreensUserDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_HOMEPAGE_GALLERY_LIST,
        component: ScreensHomePageList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_HOMEPAGE_GALLERY_ADD,
        component: ScreensHomePageAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_HOMEPAGE_GALLERY_EDIT + '/:pageId',
        component: ScreensHomePageEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_HOMEPAGE_GALLERY_DELETE + '/:pageId',
        component: ScreensHomePageDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_GALLERY_LIST,
        component: ScreensGalleryList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_GALLERY_ADD,
        component: ScreensGalleryAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_GALLERY_EDIT + '/:pageId',
        component: ScreensGalleryEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_GALLERY_DELETE + '/:pageId',
        component: ScreensGalleryDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_SERVICE_LIST,
        component: ScreensServiceList,
        exact: true
    },
    {
        path: PagesUrl.PAGE_SERVICE_ADD,
        component: ScreensServiceAdd,
        exact: true
    },
    {
        path: PagesUrl.PAGE_SERVICE_EDIT + '/:id',
        component: ScreensServiceEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_SERVICE_DETAIL + '/:id',
        component: ScreensServiceDetail,
        exact: true
    },
    {
        path: PagesUrl.PAGE_SERVICE_DELETE + '/:id',
        component: ScreensServiceDelete,
        exact: true
    },
    {
        path: PagesUrl.PAGE_INFORMATION_LIST,
        component: ScreensInformationList,
        exact: true
    },
    // {
    //     path: PagesUrl.PAGE_INFORMATION_ADD,
    //     component: ScreensInformationAdd,
    //     exact: true
    // },
    {
        path: PagesUrl.PAGE_INFORMATION_EDIT + '/:id',
        component: ScreensInformationEdit,
        exact: true
    },
    {
        path: PagesUrl.PAGE_INFORMATION_DETAIL + '/:id',
        component: ScreensInformationDetail,
        exact: true
    },
    // {
    //     path: PagesUrl.PAGE_INFORMATION_DELETE + '/:id',
    //     component: ScreensInformationDelete,
    //     exact: true
    // },
];

class GroupRestrictedRoute extends React.Component {
    render() {
        return (
            <Switch>
                {privateComponents.map(singleRoute => {
                    const {path, exact, ...otherProps} = singleRoute;
                    return (
                        <Route
                            exact={exact !== false}
                            key={singleRoute.path}
                            path={singleRoute.path}
                            {...otherProps}
                        />
                    );
                })}
                <Route component={PageNotFound}/>
            </Switch>
        )
    }
}

export default GroupRestrictedRoute;
