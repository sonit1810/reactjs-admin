import layoutActions from "./action";

const initState = {
    isLeftMenuOpen : false,
    leftMenuItems: [],
    isCallingApi: false
};

export default function layoutReducer(state = initState, action) {

    switch (action.type) {
        case layoutActions.LAYOUT_LEFT_MENU_SET_ITEM: {
            let found = false;
            const newList = state.leftMenuItems.map((item) => {
                if (item.id === action.menuItem.id) {
                    item = action.menuItem;
                    found = true;
                }
                return item;
            });
            if (!found) {
                newList.push(action.menuItem);
            }

            return {
                ...state,
                leftMenuItems: newList
            };
        }
        case layoutActions.LAYOUT_LEFT_MENU_SET_ALL_ITEM_CLOSE: {
            const newList = state.leftMenuItems.map((item) => {
                if (item.id === action.current) {
                    item.isOpen = !item.isOpen;
                } else {
                    item.isOpen = false;
                }
                return item;
            });

            return {
                ...state,
                leftMenuItems: newList
            };
        }
        case layoutActions.LAYOUT_SET_IS_CALLING_API: {
            return {
                ...state,
                isCallingApi: action.calling
            };
        }
        default:
            return state;
    }
}
