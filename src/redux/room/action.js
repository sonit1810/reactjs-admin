const roomActions = {
    ROOM_UPDATE_FILTER: "ROOM_UPDATE_FILTER",
    ROOM_GET_LIST: "ROOM_GET_LIST",
    ROOM_SEARCH_LIST: "ROOM_SEARCH_LIST",
    ROOM_GET_LIST_SUCCESS: "ROOM_GET_LIST_SUCCESS",
    ROOM_GET_LIST_FAILED: "ROOM_GET_LIST_FAILED",
    ROOM_GET_DETAIL: "ROOM_GET_DETAIL",
    ROOM_GET_DETAIL_SUCCESS: "ROOM_GET_DETAIL_SUCCESS",
    ROOM_STATUS_SUCCESS: "ROOM_STATUS_SUCCESS",
    ROOM_STATUS_FAILED: "ROOM_STATUS_FAILED",
    ROOM_ADD: "ROOM_ADD",
    ROOM_ADD_SUCCESS: "ROOM_ADD_SUCCESS",
    ROOM_EDIT: "ROOM_EDIT",
    ROOM_EDIT_SUCCESS: "ROOM_EDIT_SUCCESS",
    ROOM_DELETE: "ROOM_DELETE",
    ROOM_DELETE_SUCCESS: "ROOM_DELETE_SUCCESS",
    ROOM_GET_LIST_ROOM_TYPE: "ROOM_GET_LIST_ROOM_TYPE",
    ROOM_GET_LIST_ROOM_TYPE_SUCCESS: "ROOM_GET_LIST_ROOM_TYPE_SUCCESS",
    ROOM_UPLOAD_IMAGE: "ROOM_UPLOAD_IMAGE",
    ROOM_UPLOAD_IMAGE_SUCCESS: "ROOM_UPLOAD_IMAGE_SUCCESS",
    ROOM_UPLOAD_IMAGE_FAILED: "ROOM_UPLOAD_IMAGE_FAILED",
    ROOM_GET_LIST_GROUP: "ROOM_GET_LIST_GROUP",
    ROOM_GET_LIST_GROUP_SUCCESS: "ROOM_GET_LIST_GROUP_SUCCESS",
    ROOM_RESET_FORM_DATA: "ROOM_RESET_FORM_DATA",
    ROOM_GET_LIST_ROOM_FACILITY: "ROOM_GET_LIST_ROOM_FACILITY",
    ROOM_GET_LIST_ROOM_FACILITY_SUCCESS: "ROOM_GET_LIST_ROOM_FACILITY_SUCCESS",
    ROOM_ADD_IMAGE: "ROOM_ADD_IMAGE",
    ROOM_ADD_IMAGE_SUCCESS: "ROOM_ADD_IMAGE_SUCCESS",
    ROOM_ADD_IMAGE_FAILED: "ROOM_ADD_IMAGE_FAILED",
    ROOM_DELETE_IMAGE: "ROOM_DELETE_IMAGE",
    ROOM_DELETE_IMAGE_SUCCESS: "ROOM_DELETE_IMAGE_SUCCESS",
    ROOM_DELETE_IMAGE_FAILED: "ROOM_DELETE_IMAGE_FAILED",
    ROOM_SEARCH_FE: "ROOM_SEARCH_FE",

    updateFilter(filter) {
        return {
            type: roomActions.ROOM_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: roomActions.ROOM_GET_LIST,
            filter: filter
        }
    },
    getById(params) {
        return {
            type: roomActions.ROOM_GET_DETAIL,
            params: params
        }
    },
    add(params) {
        return {
            type: roomActions.ROOM_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: roomActions.ROOM_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: roomActions.ROOM_DELETE,
            params: params
        }
    },
    getListRoomType() {
        return {
            type: roomActions.ROOM_GET_LIST_ROOM_TYPE
        }
    },
    getListGroup() {
        return {
            type: roomActions.ROOM_GET_LIST_GROUP
        }
    },
    uploadImage(params) {
        return {
            type: roomActions.ROOM_UPLOAD_IMAGE,
            params: params
        }
    },
    getListRoomFacility() {
        return {
            type: roomActions.ROOM_GET_LIST_ROOM_FACILITY
        }
    },
    resetFormData() {
        return {
            type: roomActions.ROOM_RESET_FORM_DATA
        }
    },
    addImage(params) {
        return {
            type: roomActions.ROOM_ADD_IMAGE,
            params: params
        }
    },
    deleteImage(params) {
        return {
            type: roomActions.ROOM_DELETE_IMAGE,
            params: params
        }
    },
    getListFE(filter) {
        return {
            type: roomActions.ROOM_SEARCH_FE,
            filter: filter
        }
    },
};
export default roomActions;
