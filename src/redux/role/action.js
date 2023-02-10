const roleActions = {
    ROLE_UPDATE_FILTER: "ROLE_UPDATE_FILTER",
    ROLE_GET_LIST: "ROLE_GET_LIST",
    ROLE_GET_LIST_SUCCESS: "ROLE_GET_LIST_SUCCESS",
    ROLE_GET_LIST_FAILED: "ROLE_GET_LIST_FAILED",
    ROLE_STATUS_SUCCESS: "ROLE_STATUS_SUCCESS",
    ROLE_STATUS_FAILED: "ROLE_STATUS_FAILED",
    ROLE_RESET_FORM_DATA: "ROLE_RESET_FORM_DATA",

    updateFilter(filter) {
        return {
            type: roleActions.ROLE_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: roleActions.ROLE_GET_LIST,
            filter: filter
        }
    },
    resetFormData() {
        return {
            type: roleActions.ROLE_RESET_FORM_DATA
        }
    },
};
export default roleActions;
