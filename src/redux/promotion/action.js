const promotionActions = {
    PROMOTION_UPDATE_FILTER: "PROMOTION_UPDATE_FILTER",
    PROMOTION_GET_LIST: "PROMOTION_GET_LIST",
    PROMOTION_SEARCH_LIST: "PROMOTION_SEARCH_LIST",
    PROMOTION_GET_LIST_SUCCESS: "PROMOTION_GET_LIST_SUCCESS",
    PROMOTION_GET_LIST_FAILED: "PROMOTION_GET_LIST_FAILED",
    PROMOTION_GET_DETAIL: "PROMOTION_GET_DETAIL",
    PROMOTION_GET_DETAIL_SUCCESS: "PROMOTION_GET_DETAIL_SUCCESS",
    PROMOTION_STATUS_SUCCESS: "PROMOTION_STATUS_SUCCESS",
    PROMOTION_STATUS_FAILED: "PROMOTION_STATUS_FAILED",
    PROMOTION_ADD: "PROMOTION_ADD",
    PROMOTION_ADD_SUCCESS: "PROMOTION_ADD_SUCCESS",
    PROMOTION_EDIT: "PROMOTION_EDIT",
    PROMOTION_EDIT_SUCCESS: "PROMOTION_EDIT_SUCCESS",
    PROMOTION_DELETE: "PROMOTION_DELETE",
    PROMOTION_DELETE_SUCCESS: "PROMOTION_DELETE_SUCCESS",
    PROMOTION_GET_LIST_PROMOTION_TYPE: "PROMOTION_GET_LIST_PROMOTION_TYPE",
    PROMOTION_GET_LIST_PROMOTION_TYPE_SUCCESS: "PROMOTION_GET_LIST_PROMOTION_TYPE_SUCCESS",
    PROMOTION_UPLOAD_IMAGE: "PROMOTION_UPLOAD_IMAGE",
    PROMOTION_UPLOAD_IMAGE_SUCCESS: "PROMOTION_UPLOAD_IMAGE_SUCCESS",
    PROMOTION_UPLOAD_IMAGE_FAILED: "PROMOTION_UPLOAD_IMAGE_FAILED",
    PROMOTION_GET_LIST_GROUP: "PROMOTION_GET_LIST_GROUP",
    PROMOTION_GET_LIST_GROUP_SUCCESS: "PROMOTION_GET_LIST_GROUP_SUCCESS",
    PROMOTION_RESET_FORM_DATA: "PROMOTION_RESET_FORM_DATA",
    PROMOTION_GET_LIST_PROMOTION_VARIANT: "PROMOTION_GET_LIST_PROMOTION_VARIANT",
    PROMOTION_GET_LIST_PROMOTION_VARIANT_SUCCESS: "PROMOTION_GET_LIST_PROMOTION_VARIANT_SUCCESS",

    PROMOTION_GET_LIST_ROOM: "PROMOTION_GET_LIST_ROOM",
    PROMOTION_GET_LIST_ROOM_SUCCESS: "PROMOTION_GET_LIST_ROOM_SUCCESS",
    PROMOTION_GET_LIST_ROOM_FAILED: "PROMOTION_GET_LIST_ROOM_FAILED",

    updateFilter(filter) {
        return {
            type: promotionActions.PROMOTION_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: promotionActions.PROMOTION_GET_LIST,
            filter: filter
        }
    },
    getById(params) {
        return {
            type: promotionActions.PROMOTION_GET_DETAIL,
            params: params
        }
    },
    add(params) {
        return {
            type: promotionActions.PROMOTION_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: promotionActions.PROMOTION_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: promotionActions.PROMOTION_DELETE,
            params: params
        }
    },
    uploadImage(params) {
        return {
            type: promotionActions.PROMOTION_UPLOAD_IMAGE,
            params: params
        }
    },
    resetFormData() {
        return {
            type: promotionActions.PROMOTION_RESET_FORM_DATA
        }
    },
    getListRoom() {
        return {
            type: promotionActions.PROMOTION_GET_LIST_ROOM,
        }
    },
};
export default promotionActions;
