const userActions = {
    USER_UPDATE_FILTER: "USER_UPDATE_FILTER",
    USER_GET_LIST: "USER_GET_LIST",
    USER_GET_LIST_SUCCESS: "USER_GET_LIST_SUCCESS",
    USER_GET_LIST_FAILED: "USER_GET_LIST_FAILED",
    USER_GET_DETAIL: "USER_GET_DETAIL",
    USER_GET_DETAIL_SUCCESS: "USER_GET_DETAIL_SUCCESS",
    USER_STATUS_SUCCESS: "USER_STATUS_SUCCESS",
    USER_STATUS_FAILED: "USER_STATUS_FAILED",
    USER_ADD: "USER_ADD",
    USER_ADD_SUCCESS: "USER_ADD_SUCCESS",
    USER_EDIT: "USER_EDIT",
    USER_EDIT_SUCCESS: "USER_EDIT_SUCCESS",
    USER_DELETE: "USER_DELETE",
    USER_DELETE_SUCCESS: "USER_DELETE_SUCCESS",
    USER_RESET_FORM_DATA: "USER_RESET_FORM_DATA",
    USER_GET_ROLE_LIST: "USER_GET_ROLE_LIST",
    USER_GET_ROLE_LIST_SUCCESS: "USER_GET_ROLE_LIST_SUCCESS",
    USER_GET_ROLE_LIST_FAILED: "USER_GET_ROLE_LIST_FAILED",

    updateFilter(filter) {
        return {
            type: userActions.USER_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: userActions.USER_GET_LIST,
            filter: filter
        }
    },
    add(params) {
        return {
            type: userActions.USER_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: userActions.USER_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: userActions.USER_DELETE,
            params: params
        }
    },
    getById(params) {
        return {
            type: userActions.USER_GET_DETAIL,
            params: params
        }
    },
    getRoleList(params) {
        return {
            type: userActions.USER_GET_ROLE_LIST,
            params: params
        }
    },
    resetFormData() {
        return {
            type: userActions.USER_RESET_FORM_DATA
        }
    },
};
export default userActions;
