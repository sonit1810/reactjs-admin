const categoryActions = {
    CATEGORY_UPDATE_FILTER: "CATEGORY_UPDATE_FILTER",
    CATEGORY_GET_LIST: "CATEGORY_GET_LIST",
    CATEGORY_GET_LIST_SUCCESS: "CATEGORY_GET_LIST_SUCCESS",
    CATEGORY_GET_LIST_FAILED: "CATEGORY_GET_LIST_FAILED",
    CATEGORY_GET_DETAIL: "CATEGORY_GET_DETAIL",
    CATEGORY_GET_DETAIL_SUCCESS: "CATEGORY_GET_DETAIL_SUCCESS",
    CATEGORY_GET_DETAIL_FAILED: "CATEGORY_GET_DETAIL_FAILED",
    CATEGORY_STATUS_SUCCESS: "CATEGORY_STATUS_SUCCESS",
    CATEGORY_STATUS_FAILED: "CATEGORY_STATUS_FAILED",
    CATEGORY_ADD: "CATEGORY_ADD",
    CATEGORY_ADD_SUCCESS: "CATEGORY_ADD_SUCCESS",
    CATEGORY_EDIT: "CATEGORY_EDIT",
    CATEGORY_EDIT_SUCCESS: "CATEGORY_EDIT_SUCCESS",
    CATEGORY_DELETE: "CATEGORY_DELETE",
    CATEGORY_DELETE_SUCCESS: "CATEGORY_DELETE_SUCCESS",
    CATEGORY_DELETE_FAILED: "CATEGORY_DELETE_FAILED",
    CATEGORY_RESET_FORM_DATA: "CATEGORY_RESET_FORM_DATA",
    CATEGORY_GET_LIST_GROUP: "CATEGORY_GET_LIST_GROUP",
    CATEGORY_GET_LIST_GROUP_SUCCESS: "CATEGORY_GET_LIST_GROUP_SUCCESS",

    updateFilter(filter) {
        return {
            type: categoryActions.CATEGORY_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: categoryActions.CATEGORY_GET_LIST,
            filter: filter
        }
    },
    getById(params) {
        return {
            type: categoryActions.CATEGORY_GET_DETAIL,
            params: params
        }
    },
    add(params) {
        return {
            type: categoryActions.CATEGORY_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: categoryActions.CATEGORY_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: categoryActions.CATEGORY_DELETE,
            params: params
        }
    },
    getListGroup() {
        return {
            type: categoryActions.CATEGORY_GET_LIST_GROUP
        }
    },
    resetFormData() {
        return {
            type: categoryActions.CATEGORY_RESET_FORM_DATA
        }
    },
};
export default categoryActions;