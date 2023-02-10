const layoutActions = {

    LAYOUT_LEFT_MENU_SET_ITEM: "LAYOUT_LEFT_MENU_SET_ITEM",
    LAYOUT_LEFT_MENU_SET_ALL_ITEM_CLOSE: "LAYOUT_LEFT_MENU_SET_ALL_ITEM_CLOSE",
    LAYOUT_SET_IS_CALLING_API: "LAYOUT_SET_IS_CALLING_API",
    LAYOUT_SET_IS_CALLING_API_FINISH: "LAYOUT_SET_IS_CALLING_API_FINISH",

    setLeftMenuItem(item) {
        return {
            type: layoutActions.LAYOUT_LEFT_MENU_SET_ITEM,
            menuItem: item
        }
    },
    setAllLeftMenuItemCloseExceptCurrent(current) {
        return {
            type: layoutActions.LAYOUT_LEFT_MENU_SET_ALL_ITEM_CLOSE,
            current: current
        }
    },
    isCallingApi(calling) {
        return {
            type: layoutActions.LAYOUT_SET_IS_CALLING_API,
            calling: calling
        }
    }
};
export default layoutActions;