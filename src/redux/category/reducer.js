import categoryActions from "./action";
import siteConfig from "../../configs/siteConfig";

const initState = {
    listData: {
        items: [],
        total: 0,
        current_page: 1,
    },
    filter: {
        page: 1,
        per_page: siteConfig.defaultItemPerPage,
        sort: 'asc',
        sort_by_column: 'id',
        s:''
    },
    listGroup: [],
    formData: {
        id: '',
        code: '',
        name: {
            vi: '',
            en: '',
            jp: {
                kanji: '',
                romaji: ''
            }
        },
        description: {
            vi: '',
            en: '',
            jp: {
                kanji: '',
                romaji: ''
            }
        },
        group_id: ''
    }
};

export default function categoryReducer(state = initState, action) {
    switch (action.type) {
        case categoryActions.CATEGORY_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case categoryActions.CATEGORY_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case categoryActions.CATEGORY_GET_LIST_FAILED: {
            return {
                ...state,
                listData: initState.listData
            };
        }
        case categoryActions.CATEGORY_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data,
            };
        }
        case categoryActions.CATEGORY_GET_LIST_GROUP_SUCCESS: {
            return {
                ...state,
                listGroup: action.state.data.items,
            };
        }
        case categoryActions.CATEGORY_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        default:
            return state;
    }
}