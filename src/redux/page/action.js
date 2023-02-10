const pageActions = {
    PAGE_UPDATE_FILTER: "PAGE_UPDATE_FILTER",
    PAGE_GET_LIST: "PAGE_GET_LIST",
    PAGE_GET_LIST_SUCCESS: "PAGE_GET_LIST_SUCCESS",
    PAGE_GET_LIST_FAILED: "PAGE_GET_LIST_FAILED",
    PAGE_GET_DETAIL: "PAGE_GET_DETAIL",
    PAGE_GET_DETAIL_SUCCESS: "PAGE_GET_DETAIL_SUCCESS",
    PAGE_GET_DETAIL_FAILED: "PAGE_GET_DETAIL_FAILED",
    PAGE_STATUS_SUCCESS: "PAGE_STATUS_SUCCESS",
    PAGE_STATUS_FAILED: "PAGE_STATUS_FAILED",
    PAGE_ADD: "PAGE_ADD",
    PAGE_ADD_SUCCESS: "PAGE_ADD_SUCCESS",
    PAGE_EDIT: "PAGE_EDIT",
    PAGE_EDIT_SUCCESS: "PAGE_EDIT_SUCCESS",
    PAGE_DELETE: "PAGE_DELETE",
    PAGE_DELETE_SUCCESS: "PAGE_DELETE_SUCCESS",
    PAGE_DELETE_FAILED: "PAGE_DELETE_FAILED",
    PAGE_UPLOAD_IMAGE: "PAGE_UPLOAD_IMAGE",
    PAGE_UPLOAD_IMAGE_SUCCESS: "PAGE_UPLOAD_IMAGE_SUCCESS",
    PAGE_UPLOAD_IMAGE_FAILED: "PAGE_UPLOAD_IMAGE_FAILED",
    PAGE_UPLOAD_LOGO: "PAGE_UPLOAD_LOGO",
    PAGE_UPLOAD_LOGO_SUCCESS: "PAGE_UPLOAD_LOGO_SUCCESS",
    PAGE_UPLOAD_LOGO_FAILED: "PAGE_UPLOAD_LOGO_FAILED",

    PAGE_GET_LIST_GROUP: "ROOM_GET_LIST_GROUP",
    PAGE_GET_LIST_GROUP_SUCCESS: "ROOM_GET_LIST_GROUP_SUCCESS",
    PAGE_RESET_FORM_DATA: "ROOM_RESET_FORM_DATA",

    updateFilter(filter) {
        return {
            type: pageActions.PAGE_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: pageActions.PAGE_GET_LIST,
            filter: filter
        }
    },
    getById(params) {
        return {
            type: pageActions.PAGE_GET_DETAIL,
            params: params
        }
    },
    add(params) {
        return {
            type: pageActions.PAGE_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: pageActions.PAGE_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: pageActions.PAGE_DELETE,
            params: params
        }
    },
    uploadImage(params) {
        return {
            type: pageActions.PAGE_UPLOAD_IMAGE,
            params: params
        }
    },
    uploadLogo(params) {
        return {
            type: pageActions.PAGE_UPLOAD_LOGO,
            params: params
        }
    },
    getListGroup() {
        return {
            type: pageActions.PAGE_GET_LIST_GROUP
        }
    },
    resetFormData() {
        return {
            type: pageActions.PAGE_RESET_FORM_DATA
        }
    },
};
export default pageActions;
