const galleryActions = {
    GALLERY_UPDATE_FILTER: "GALLERY_UPDATE_FILTER",
    GALLERY_GET_LIST: "GALLERY_GET_LIST",
    GALLERY_GET_LIST_SUCCESS: "GALLERY_GET_LIST_SUCCESS",
    GALLERY_GET_LIST_FAILED: "GALLERY_GET_LIST_FAILED",
    GALLERY_GET_DETAIL: "GALLERY_GET_DETAIL",
    GALLERY_GET_DETAIL_SUCCESS: "GALLERY_GET_DETAIL_SUCCESS",
    GALLERY_GET_DETAIL_FAILED: "GALLERY_GET_DETAIL_FAILED",
    GALLERY_STATUS_SUCCESS: "GALLERY_STATUS_SUCCESS",
    GALLERY_STATUS_FAILED: "GALLERY_STATUS_FAILED",
    GALLERY_ADD: "GALLERY_ADD",
    GALLERY_ADD_SUCCESS: "GALLERY_ADD_SUCCESS",
    GALLERY_EDIT: "GALLERY_EDIT",
    GALLERY_EDIT_SUCCESS: "GALLERY_EDIT_SUCCESS",
    GALLERY_DELETE: "GALLERY_DELETE",
    GALLERY_DELETE_SUCCESS: "GALLERY_DELETE_SUCCESS",
    GALLERY_DELETE_FAILED: "GALLERY_DELETE_FAILED",
    GALLERY_UPLOAD_IMAGE: "GALLERY_UPLOAD_IMAGE",
    GALLERY_UPLOAD_IMAGE_SUCCESS: "GALLERY_UPLOAD_IMAGE_SUCCESS",
    GALLERY_UPLOAD_IMAGE_FAILED: "GALLERY_UPLOAD_IMAGE_FAILED",
    GALLERY_UPLOAD_LOGO: "GALLERY_UPLOAD_LOGO",
    GALLERY_UPLOAD_LOGO_SUCCESS: "GALLERY_UPLOAD_LOGO_SUCCESS",
    GALLERY_UPLOAD_LOGO_FAILED: "GALLERY_UPLOAD_LOGO_FAILED",

    GALLERY_GET_LIST_GROUP: "ROOM_GET_LIST_GROUP",
    GALLERY_GET_LIST_GROUP_SUCCESS: "ROOM_GET_LIST_GROUP_SUCCESS",
    GALLERY_RESET_FORM_DATA: "ROOM_RESET_FORM_DATA",

    updateFilter(filter) {
        return {
            type: galleryActions.GALLERY_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: galleryActions.GALLERY_GET_LIST,
            filter: filter
        }
    },
    getById(params) {
        return {
            type: galleryActions.GALLERY_GET_DETAIL,
            params: params
        }
    },
    add(params) {
        return {
            type: galleryActions.GALLERY_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: galleryActions.GALLERY_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: galleryActions.GALLERY_DELETE,
            params: params
        }
    },
    uploadImage(params) {
        return {
            type: galleryActions.GALLERY_UPLOAD_IMAGE,
            params: params
        }
    },
    uploadLogo(params) {
        return {
            type: galleryActions.GALLERY_UPLOAD_LOGO,
            params: params
        }
    },
    getListGroup() {
        return {
            type: galleryActions.GALLERY_GET_LIST_GROUP
        }
    },
    resetFormData() {
        return {
            type: galleryActions.GALLERY_RESET_FORM_DATA
        }
    },
};
export default galleryActions;
