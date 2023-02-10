const variantActions = {
    VARIANT_UPDATE_FILTER: "VARIANT_UPDATE_FILTER",
    VARIANT_GET_LIST: "VARIANT_GET_LIST",
    VARIANT_GET_LIST_SUCCESS: "VARIANT_GET_LIST_SUCCESS",
    VARIANT_GET_LIST_FAILED: "VARIANT_GET_LIST_FAILED",
    VARIANT_GET_DETAIL: "VARIANT_GET_DETAIL",
    VARIANT_GET_DETAIL_SUCCESS: "VARIANT_GET_DETAIL_SUCCESS",
    VARIANT_STATUS_SUCCESS: "VARIANT_STATUS_SUCCESS",
    VARIANT_STATUS_FAILED: "VARIANT_STATUS_FAILED",
    VARIANT_ADD: "VARIANT_ADD",
    VARIANT_ADD_SUCCESS: "VARIANT_ADD_SUCCESS",
    VARIANT_EDIT: "VARIANT_EDIT",
    VARIANT_EDIT_SUCCESS: "VARIANT_EDIT_SUCCESS",
    VARIANT_DELETE: "VARIANT_DELETE",
    VARIANT_DELETE_SUCCESS: "VARIANT_DELETE_SUCCESS",
    VARIANT_RESET_FORM_DATA: "VARIANT_RESET_FORM_DATA",

    updateFilter(filter) {
        return {
            type: variantActions.VARIANT_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: variantActions.VARIANT_GET_LIST,
            filter: filter
        }
    },
    add(params) {
        return {
            type: variantActions.VARIANT_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: variantActions.VARIANT_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: variantActions.VARIANT_DELETE,
            params: params
        }
    },
    getById(params) {
        return {
            type: variantActions.VARIANT_GET_DETAIL,
            params: params
        }
    },
    resetFormData() {
        return {
            type: variantActions.VARIANT_RESET_FORM_DATA
        }
    },
};
export default variantActions;