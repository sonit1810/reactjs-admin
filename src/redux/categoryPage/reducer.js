import categoryPageActions from "./action";
import siteConfig from "../../configs/siteConfig";

const initState = {
    memberGroup: {},
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
        memberGroupName: ''
    },
    id: 0,
    categoryPageParams: {
        category_id: 0,
        page_id: 0,
        name: '',
        page_position: 0,
        items: []
    },
    pageData: {
        items: [],
        total: 0,
        actualPage: 1,
    },
    productData: {
        pages: [],
        group_id: 0,
        description: {},
        name: {},
        thumb: ''
    },
    isLoading: false

};

export default function categoryPageReducer(state = initState, action) {

    switch (action.type) {
        case categoryPageActions.CATEGORY_PAGE_GET_LIST: {
            return {
                ...state,
                filter: action.filter,
                isLoading: false
            };
        }
        case categoryPageActions.CATEGORY_PAGE_GET_LIST_STATUS_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
            };
        }
        case categoryPageActions.CATEGORY_PAGE_GET_LIST_STATUS_FAILED: {
            return {
                ...state,
                listData: [],
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ROOM_GET_LIST: {
            return {
                ...state,
                params: action.params,
                isLoading: false
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ROOM_GET_LIST_STATUS_SUCCESS: {
            return {
                ...state,
                productData: action.state.data,
                isLoading: false
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ROOM_GET_LIST_STATUS_FAILED: {
            return {
                ...state,
                productData: [],
                isLoading: false
            };
        }
        case categoryPageActions.CATEGORY_PAGE_DETAIL: {
            return {
                ...state,
                params: action.params,
                isLoading: true
            };
        }
        case categoryPageActions.CATEGORY_PAGE_DETAIL_STATUS_SUCCESS: {
            return {
                ...state,
                pageData: action.state.data,
                isLoading: false
            };
        }
        case categoryPageActions.CATEGORY_PAGE_DETAIL_STATUS_FAILED: {
            return {
                ...state,
                pageData: [],
                isLoading: false
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ADD: {
            return {
                ...state,
                params: action.params,
                selectedPageTemplate: action.selectedPageTemplate
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ADD_STATUS_SUCCESS: {
            state.pageData.items.push(action.state.data);
            return {
                ...state,
                data: action.state.data,
                status: action.state.status
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ADD_STATUS_FAILED: {
            return {
                ...state,
                data: null,
            };
        }
        case categoryPageActions.CATEGORY_PAGE_EDIT: {
            return {
                ...state,
                params: action.params,
                selectedPageTemplate: action.selectedPageTemplate
            };
        }
        case categoryPageActions.CATEGORY_PAGE_EDIT_STATUS_SUCCESS: {
            for( let i = 0 ; i < state.pageData.items.length; i++) {
                if (state.pageData.items[i].id === parseInt(action.state.data.id)) {
                    state.pageData.items[i] = action.state.data;
                    break;
                }
            }
            return {
                ...state,
                data: action.state.data,
                status: action.state.status
            };
        }
        case categoryPageActions.CATEGORY_PAGE_EDIT_STATUS_FAILED: {
            return {
                ...state,
                data: null,
            };
        }
        case categoryPageActions.CATEGORY_PAGE_DELETE: {
            return {
                ...state,
                params: action.params
            };
        }
        case categoryPageActions.CATEGORY_PAGE_DELETE_STATUS_SUCCESS: {
            let index = -1;
            for( let i = 0 ; i < state.pageData.items.length; i++) {
                if (state.pageData.items[i].id === parseInt(action.state.data)) {
                    index = i;
                    break;
                }
            }
            state.pageData.items.splice(index, 1);

            return {
                ...state,
                data: action.state.data,
            };
        }
        case categoryPageActions.CATEGORY_PAGE_DELETE_STATUS_FAILED: {
            return {
                ...state,
                data: null,
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ROOM_EDIT: {
            return {
                ...state,
                params: action.params
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ROOM_EDIT_STATUS_SUCCESS: {
            return {
                ...state,
                data: action.state.data,
            };
        }
        case categoryPageActions.CATEGORY_PAGE_ROOM_EDIT_STATUS_FAILED: {
            return {
                ...state,
                data: null,
            };
        }
        default:
            return state;
    }
}
