import serviceActions from "./action";
import siteConfig from "../../configs/siteConfig";

const initState = {
    listData: {
        items: [],
        total: 0,
        actualPage: 1,
    },
    filter: {
        page: 1,
        per_page: siteConfig.defaultItemPerPage,
        sort: 'asc',
        sort_by_column: 'id',
        s: '',
    },
    keyword: {
        s: ''
    },
    formData: {
        id: '',
        name: {
            vi: '',
            en: '',
            jp: {
                kanji: '',
                romaji: ''
            },
            kr: '',
        },
        description: {
            vi: '',
            en: '',
            jp: {
                kanji: '',
                romaji: ''
            },
            kr: '',
        },
        images: {
            source: '',
            thumbnail: '',
        },
        images_origin: {
            source: '',
            thumbnail: '',
        }
    }
};

export default function informationReducer(state = initState, action) {

    switch (action.type) {
        case serviceActions.INFORMATION_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case serviceActions.INFORMATION_SEARCH_LIST: {
            return {
                ...state,
                keyword: action.keyword,
            };
        }
        case serviceActions.INFORMATION_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case serviceActions.INFORMATION_GET_LIST_FAILED: {
            return {
                ...state,
                listData: [],
            };
        }
        case serviceActions.INFORMATION_UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                imageData: action.state.data
            };
        }
        case serviceActions.INFORMATION_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data
            };
        }
        case serviceActions.INFORMATION_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        default:
            return state;
    }
}
