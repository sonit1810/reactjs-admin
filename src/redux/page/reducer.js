import pageActions from "./action";
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
        group_id: 0
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
        description: '',
        layout: '',
        type: '',
        max_item: 3,
        sample_image: '',
        group_id: 0,
        sample_image_origin: ''
    }
};

export default function pageReducer(state = initState, action) {

    switch (action.type) {
        case pageActions.PAGE_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case pageActions.PAGE_GET_LIST: {
            return {
                ...state,
                filter: action.filter
            };
        }
        case pageActions.PAGE_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case pageActions.PAGE_GET_LIST_FAILED: {
            return {
                ...state,
                listData: {
                    items: [],
                    pagination: []
                }
            };
        }
        case pageActions.PAGE_UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                imageData: action.state.data
            };
        }
        case pageActions.PAGE_UPLOAD_LOGO_SUCCESS: {
            return {
                ...state,
                logo: action.state.data
            };
        }
        case pageActions.PAGE_GET_LIST_GROUP_SUCCESS: {
            return {
                ...state,
                listGroup: action.state.data.items,
            };
        }
        case pageActions.PAGE_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data
            };
        }
        case pageActions.PAGE_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        default:
            return state;
    }
}