import homepageActions from "./action";
import siteConfig from "../../configs/siteConfig";

const initState = {
    memberGroup: {},
    listData: {
        items: [],
        pagination: [],
        total: 0
    },
    filter: {
        page: 1,
        per_page: siteConfig.defaultItemPerPage,
        sort: 'asc',
        sort_by_column: 'id',
        group_id: 0,
        category_id:2
    },
    imageData: {
        big: {
            id: '',
            url: '',
        },
        thumb: {
            id: '',
            url: '',
        }
    },
    listGroup: [],
    formData: {
        id: '',
        title: '',
        short_description: '',
        description: '',
        image: '',
        category_id: 2,
        image_origin: ''
    }
};

export default function pageReducer(state = initState, action) {

    switch (action.type) {
        case homepageActions.HOMEPAGE_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case homepageActions.HOMEPAGE_GET_LIST: {
            return {
                ...state,
                filter: action.filter
            };
        }
        case homepageActions.HOMEPAGE_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case homepageActions.HOMEPAGE_GET_LIST_FAILED: {
            return {
                ...state,
                listData: {
                    items: [],
                    pagination: []
                }
            };
        }
        case homepageActions.HOMEPAGE_UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                imageData: action.state.data
            };
        }
        case homepageActions.HOMEPAGE_UPLOAD_LOGO_SUCCESS: {
            return {
                ...state,
                logo: action.state.data
            };
        }
        case homepageActions.HOMEPAGE_GET_LIST_GROUP_SUCCESS: {
            return {
                ...state,
                listGroup: action.state.data.items,
            };
        }
        case homepageActions.HOMEPAGE_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data
            };
        }
        case homepageActions.HOMEPAGE_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        default:
            return state;
    }
}