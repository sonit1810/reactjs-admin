import promotionActions from "./action";
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
        short_description: {
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
        start_date: '',
        end_date: '',
        status: 0,
        image: '',
        image_origin: '',
        room_id: 0,
    },
    listRoom: []
};

export default function promotionReducer(state = initState, action) {

    switch (action.type) {
        case promotionActions.PROMOTION_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case promotionActions.PROMOTION_SEARCH_LIST: {
            return {
                ...state,
                keyword: action.keyword,
            };
        }
        case promotionActions.PROMOTION_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case promotionActions.PROMOTION_GET_LIST_FAILED: {
            return {
                ...state,
                listData: initState.listData
            };
        }
        case promotionActions.PROMOTION_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data
            };
        }
        case promotionActions.PROMOTION_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        case promotionActions.PROMOTION_GET_LIST_ROOM_SUCCESS: {
            return {
                ...state,
                listRoom: action.state.data.items,
            };
        }
        case promotionActions.PROMOTION_GET_LIST_ROOM_FAILED: {
            return {
                ...state,
                listRoom: initState.listRoom
            };
        }
        default:
            return state;
    }
}
