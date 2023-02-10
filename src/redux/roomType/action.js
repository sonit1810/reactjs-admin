const roomTypeActions = {
    ROOM_TYPE_UPDATE_FILTER: "ROOM_TYPE_UPDATE_FILTER",
    ROOM_TYPE_GET_LIST: "ROOM_TYPE_GET_LIST",
    ROOM_TYPE_GET_LIST_SUCCESS: "ROOM_TYPE_GET_LIST_SUCCESS",
    ROOM_TYPE_GET_LIST_FAILED: "ROOM_TYPE_GET_LIST_FAILED",
    ROOM_TYPE_GET_DETAIL: "ROOM_TYPE_GET_DETAIL",
    ROOM_TYPE_GET_DETAIL_SUCCESS: "ROOM_TYPE_GET_DETAIL_SUCCESS",
    ROOM_TYPE_STATUS_SUCCESS: "ROOM_TYPE_STATUS_SUCCESS",
    ROOM_TYPE_STATUS_FAILED: "ROOM_TYPE_STATUS_FAILED",
    ROOM_TYPE_ADD: "ROOM_TYPE_ADD",
    ROOM_TYPE_ADD_SUCCESS: "ROOM_TYPE_ADD_SUCCESS",
    ROOM_TYPE_EDIT: "ROOM_TYPE_EDIT",
    ROOM_TYPE_EDIT_SUCCESS: "ROOM_TYPE_EDIT_SUCCESS",
    ROOM_TYPE_DELETE: "ROOM_TYPE_DELETE",
    ROOM_TYPE_DELETE_SUCCESS: "ROOM_TYPE_DELETE_SUCCESS",
    ROOM_TYPE_RESET_FORM_DATA: "ROOM_TYPE_RESET_FORM_DATA",
    ROOM_TYPE_UPDATE_SORT_LIST: "ROOM_TYPE_UPDATE_SORT_LIST",
    ROOM_TYPE_UPDATE_SORT_LIST_SUCCESS: "ROOM_TYPE_UPDATE_SORT_LIST_SUCCESS",
    ROOM_TYPE_UPDATE_SORT_LIST_FAILED: "ROOM_TYPE_UPDATE_SORT_LIST_FAILED",

    updateFilter(filter) {
        return {
            type: roomTypeActions.ROOM_TYPE_UPDATE_FILTER,
            filter: filter
        }
    },
    getList(filter) {
        return {
            type: roomTypeActions.ROOM_TYPE_GET_LIST,
            filter: filter
        }
    },
    add(params) {
        return {
            type: roomTypeActions.ROOM_TYPE_ADD,
            params: params
        }
    },
    edit(params) {
        return {
            type: roomTypeActions.ROOM_TYPE_EDIT,
            params: params
        }
    },
    delete(params) {
        return {
            type: roomTypeActions.ROOM_TYPE_DELETE,
            params: params
        }
    },
    getById(params) {
        return {
            type: roomTypeActions.ROOM_TYPE_GET_DETAIL,
            params: params
        }
    },
    resetFormData() {
        return {
            type: roomTypeActions.ROOM_TYPE_RESET_FORM_DATA
        }
    },
    updateSortList(items) {
        return {
            type: roomTypeActions.ROOM_TYPE_UPDATE_SORT_LIST,
            params: items
        }
    }
};
export default roomTypeActions;