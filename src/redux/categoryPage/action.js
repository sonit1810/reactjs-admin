const categoryPageActions = {
    CATEGORY_PAGE_GET_LIST: "CATEGORY_PAGE_GET_LIST",
    CATEGORY_PAGE_GET_LIST_STATUS_SUCCESS: "PAGE_GET_LIST_STATUS_SUCCESS",
    CATEGORY_PAGE_GET_LIST_STATUS_FAILED: "CATEGORY_PAGE_GET_LIST_STATUS_FAILED",

    CATEGORY_PAGE_DETAIL: 'CATEGORY_PAGE_DETAIL',
    CATEGORY_PAGE_DETAIL_STATUS_SUCCESS: 'CATEGORY_PAGE_DETAIL_STATUS_SUCCESS',
    CATEGORY_PAGE_DETAIL_STATUS_FAILED: 'CATEGORY_PAGE_DETAIL_STATUS_FAILED',

    CATEGORY_PAGE_ADD: 'CATEGORY_PAGE_ADD',
    CATEGORY_PAGE_ADD_STATUS_SUCCESS: 'CATEGORY_PAGE_ADD_STATUS_SUCCESS',
    CATEGORY_PAGE_ADD_STATUS_FAILED: 'CATEGORY_PAGE_ADD_STATUS_FAILED',
    
    CATEGORY_PAGE_EDIT: 'CATEGORY_PAGE_EDIT',
    CATEGORY_PAGE_EDIT_STATUS_SUCCESS: 'CATEGORY_PAGE_EDIT_STATUS_SUCCESS',
    CATEGORY_PAGE_EDIT_STATUS_FAILED: 'CATEGORY_PAGE_EDIT_STATUS_FAILED',

    CATEGORY_PAGE_DELETE: 'CATEGORY_PAGE_DELETE',
    CATEGORY_PAGE_DELETE_STATUS_SUCCESS: 'CATEGORY_PAGE_DELETE_STATUS_SUCCESS',
    CATEGORY_PAGE_DELETE_STATUS_FAILED: 'CATEGORY_PAGE_DELETE_STATUS_FAILED',

    CATEGORY_PAGE_ROOM_GET_LIST: "CATEGORY_PAGE_ROOM_GET_LIST",
    CATEGORY_PAGE_ROOM_GET_LIST_STATUS_SUCCESS: "CATEGORY_PAGE_ROOM_GET_LIST_STATUS_SUCCESS",
    CATEGORY_PAGE_ROOM_GET_LIST_STATUS_FAILED: "CATEGORY_PAGE_ROOM_GET_LIST_STATUS_FAILED",

    CATEGORY_PAGE_ROOM_EDIT: 'CATEGORY_PAGE_ROOM_EDIT',
    CATEGORY_PAGE_ROOM_EDIT_STATUS_SUCCESS: 'CATEGORY_PAGE_ROOM_EDIT_STATUS_SUCCESS',
    CATEGORY_PAGE_ROOM_EDIT_STATUS_FAILED: 'CATEGORY_PAGE_ROOM_EDIT_STATUS_FAILED',

    getPageList(filter) {
        return {
            type: categoryPageActions.CATEGORY_PAGE_GET_LIST,
            filter: filter
        }
    },
    getCategoryDetail(params) {
        return {
            type: categoryPageActions.CATEGORY_PAGE_DETAIL,
            params: params
        }
    },
    addPageToCategory(params, selectedPageTemplate) {
        return {
            type: categoryPageActions.CATEGORY_PAGE_ADD,
            params: params,
            selectedPageTemplate: selectedPageTemplate
        }
    },
    editPageToCategory(params, selectedPageTemplate) {
        return {
            type: categoryPageActions.CATEGORY_PAGE_EDIT,
            params: params,
            selectedPageTemplate: selectedPageTemplate
        }
    },
    deleteCategoryPage(params) {
        return {
            type: categoryPageActions.CATEGORY_PAGE_DELETE,
            params: params
        }
    },
    getCategoryPageProductList(params) {
        return {
            type: categoryPageActions.CATEGORY_PAGE_ROOM_GET_LIST,
            params: params
        }
    },
    updateCategoryPageProduct(params) {
        return {
            type: categoryPageActions.CATEGORY_PAGE_ROOM_EDIT,
            params: params
        }
    }
};
export default categoryPageActions;
