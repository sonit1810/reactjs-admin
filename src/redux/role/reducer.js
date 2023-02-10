import roleActions from "./action";
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
};

export default function roleReducer(state = initState, action) {
    switch (action.type) {
        case roleActions.ROLE_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case roleActions.ROLE_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case roleActions.ROLE_GET_LIST_FAILED: {
            return {
                ...state,
                listData: [],
            };
        }
        default:
            return state;
    }
}
