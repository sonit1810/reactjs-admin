import userActions from "./action";
import siteConfig from "../../configs/siteConfig";
import variantActions from "../roomFacility/action";

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
        s:''
    },
    formData: {
        id: '',
        name: '',
        email: '',
        roles: [],
    },
    roleList: []
};

export default function userReducer(state = initState, action) {
    switch (action.type) {
        case userActions.USER_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case userActions.USER_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case userActions.USER_GET_LIST_FAILED: {
            return {
                ...state,
                listData: [],
            };
        }
        case userActions.USER_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data
            };
        }
        case userActions.USER_GET_ROLE_LIST_SUCCESS: {
            return {
                ...state,
                roleList: action.state.data.items
            };
        }
        case userActions.USER_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        default:
            return state;
    }
}
