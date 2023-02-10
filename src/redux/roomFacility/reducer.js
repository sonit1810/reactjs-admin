import variantActions from "./action";
import siteConfig from "../../configs/siteConfig";
// import roomActions from "../product/action";

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
            }
        },
        description: {
            vi: '',
            en: '',
            jp: {
                kanji: '',
                romaji: ''
            }
        }
    }
};

export default function roomFacilityReducer(state = initState, action) {
    switch (action.type) {
        case variantActions.VARIANT_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case variantActions.VARIANT_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case variantActions.VARIANT_GET_LIST_FAILED: {
            return {
                ...state,
                listData: [],
            };
        }
        case variantActions.VARIANT_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data
            };
        }
        case variantActions.VARIANT_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        default:
            return state;
    }
}
