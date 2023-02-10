const serviceActions = {
    SERVICE_UPDATE_FILTER: "SERVICE_UPDATE_FILTER",
    SERVICE_GET_LIST: "SERVICE_GET_LIST",
    SERVICE_SEARCH_LIST: "SERVICE_SEARCH_LIST",
    SERVICE_GET_LIST_SUCCESS: "SERVICE_GET_LIST_SUCCESS",
    SERVICE_GET_LIST_FAILED: "SERVICE_GET_LIST_FAILED",
    SERVICE_GET_DETAIL: "SERVICE_GET_DETAIL",
    SERVICE_GET_DETAIL_SUCCESS: "SERVICE_GET_DETAIL_SUCCESS",
    SERVICE_STATUS_SUCCESS: "SERVICE_STATUS_SUCCESS",
    SERVICE_STATUS_FAILED: "SERVICE_STATUS_FAILED",
    SERVICE_ADD: "SERVICE_ADD",
    SERVICE_ADD_SUCCESS: "SERVICE_ADD_SUCCESS",
    SERVICE_EDIT: "SERVICE_EDIT",
    SERVICE_EDIT_SUCCESS: "SERVICE_EDIT_SUCCESS",
    SERVICE_DELETE: "SERVICE_DELETE",
    SERVICE_DELETE_SUCCESS: "SERVICE_DELETE_SUCCESS",
    SERVICE_GET_LIST_SERVICE_TYPE: "SERVICE_GET_LIST_SERVICE_TYPE",
    SERVICE_GET_LIST_SERVICE_TYPE_SUCCESS: "SERVICE_GET_LIST_SERVICE_TYPE_SUCCESS",
    SERVICE_UPLOAD_IMAGE: "SERVICE_UPLOAD_IMAGE",
    SERVICE_UPLOAD_IMAGE_SUCCESS: "SERVICE_UPLOAD_IMAGE_SUCCESS",
    SERVICE_UPLOAD_IMAGE_FAILED: "SERVICE_UPLOAD_IMAGE_FAILED",
    SERVICE_GET_LIST_GROUP: "SERVICE_GET_LIST_GROUP",
    SERVICE_GET_LIST_GROUP_SUCCESS: "SERVICE_GET_LIST_GROUP_SUCCESS",
    SERVICE_RESET_FORM_DATA: "SERVICE_RESET_FORM_DATA",
    SERVICE_GET_LIST_SERVICE_FACILITY: "SERVICE_GET_LIST_SERVICE_FACILITY",
    SERVICE_GET_LIST_SERVICE_FACILITY_SUCCESS: "SERVICE_GET_LIST_SERVICE_FACILITY_SUCCESS",

    updateFilter(filter) {
        return {
            type: serviceActions.SERVICE_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: serviceActions.SERVICE_GET_LIST,
            filter: filter
        }
    },
    getById(params) {
        return {
            type: serviceActions.SERVICE_GET_DETAIL,
            params: params
        }
    },
    add(params) {
        return {
            type: serviceActions.SERVICE_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: serviceActions.SERVICE_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: serviceActions.SERVICE_DELETE,
            params: params
        }
    },
    uploadImage(params) {
        return {
            type: serviceActions.SERVICE_UPLOAD_IMAGE,
            params: params
        }
    },
    resetFormData() {
        return {
            type: serviceActions.SERVICE_RESET_FORM_DATA
        }
    },
};
export default serviceActions;
