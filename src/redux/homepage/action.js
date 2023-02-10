const homepageActions = {
    HOMEPAGE_UPDATE_FILTER: "HOMEPAGE_UPDATE_FILTER",
    HOMEPAGE_GET_LIST: "HOMEPAGE_GET_LIST",
    HOMEPAGE_GET_LIST_SUCCESS: "HOMEPAGE_GET_LIST_SUCCESS",
    HOMEPAGE_GET_LIST_FAILED: "HOMEPAGE_GET_LIST_FAILED",
    HOMEPAGE_GET_DETAIL: "HOMEPAGE_GET_DETAIL",
    HOMEPAGE_GET_DETAIL_SUCCESS: "HOMEPAGE_GET_DETAIL_SUCCESS",
    HOMEPAGE_GET_DETAIL_FAILED: "HOMEPAGE_GET_DETAIL_FAILED",
    HOMEPAGE_STATUS_SUCCESS: "HOMEPAGE_STATUS_SUCCESS",
    HOMEPAGE_STATUS_FAILED: "HOMEPAGE_STATUS_FAILED",
    HOMEPAGE_ADD: "HOMEPAGE_ADD",
    HOMEPAGE_ADD_SUCCESS: "HOMEPAGE_ADD_SUCCESS",
    HOMEPAGE_EDIT: "HOMEPAGE_EDIT",
    HOMEPAGE_EDIT_SUCCESS: "HOMEPAGE_EDIT_SUCCESS",
    HOMEPAGE_DELETE: "HOMEPAGE_DELETE",
    HOMEPAGE_DELETE_SUCCESS: "HOMEPAGE_DELETE_SUCCESS",
    HOMEPAGE_DELETE_FAILED: "HOMEPAGE_DELETE_FAILED",
    HOMEPAGE_UPLOAD_IMAGE: "HOMEPAGE_UPLOAD_IMAGE",
    HOMEPAGE_UPLOAD_IMAGE_SUCCESS: "HOMEPAGE_UPLOAD_IMAGE_SUCCESS",
    HOMEPAGE_UPLOAD_IMAGE_FAILED: "HOMEPAGE_UPLOAD_IMAGE_FAILED",
    HOMEPAGE_UPLOAD_LOGO: "HOMEPAGE_UPLOAD_LOGO",
    HOMEPAGE_UPLOAD_LOGO_SUCCESS: "HOMEPAGE_UPLOAD_LOGO_SUCCESS",
    HOMEPAGE_UPLOAD_LOGO_FAILED: "HOMEPAGE_UPLOAD_LOGO_FAILED",

    HOMEPAGE_GET_LIST_GROUP: "ROOM_GET_LIST_GROUP",
    HOMEPAGE_GET_LIST_GROUP_SUCCESS: "ROOM_GET_LIST_GROUP_SUCCESS",
    HOMEPAGE_RESET_FORM_DATA: "ROOM_RESET_FORM_DATA",

    updateFilter(filter) {
        return {
            type: homepageActions.HOMEPAGE_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: homepageActions.HOMEPAGE_GET_LIST,
            filter: filter
        }
    },
    getById(params) {
        return {
            type: homepageActions.HOMEPAGE_GET_DETAIL,
            params: params
        }
    },
    add(params) {
        return {
            type: homepageActions.HOMEPAGE_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: homepageActions.HOMEPAGE_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: homepageActions.HOMEPAGE_DELETE,
            params: params
        }
    },
    uploadImage(params) {
        return {
            type: homepageActions.HOMEPAGE_UPLOAD_IMAGE,
            params: params
        }
    },
    uploadLogo(params) {
        return {
            type: homepageActions.HOMEPAGE_UPLOAD_LOGO,
            params: params
        }
    },
    getListGroup() {
        return {
            type: homepageActions.HOMEPAGE_GET_LIST_GROUP
        }
    },
    resetFormData() {
        return {
            type: homepageActions.HOMEPAGE_RESET_FORM_DATA
        }
    },
};
export default homepageActions;
