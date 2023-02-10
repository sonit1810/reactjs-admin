import roomTypeActions from "./action";
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
        s:'',
        hot: ''
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
            kr: ''
        },
        sub_types: [],
        hot: 0,
    },
    sort_order: 0,
    hot: 0,
};

export default function roomTypeReducer(state = initState, action) {
    switch (action.type) {
        case roomTypeActions.ROOM_TYPE_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case roomTypeActions.ROOM_TYPE_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case roomTypeActions.ROOM_TYPE_GET_LIST_FAILED: {
            return {
                ...state,
                listData: [],
            };
        }
        case roomTypeActions.ROOM_TYPE_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data
            };
        }
        case roomTypeActions.ROOM_TYPE_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        default:
            return state;
    }
}
