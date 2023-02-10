import roomActions from "./action";
import siteConfig from "../../configs/siteConfig";

const initState = {
    listData: {
        items: [],
        total: 0,
        actualPage: 1,
    },
    listDataBE: {
        items: [],
        total: 0,
        actualPage: 1,
    },
    filter: {
        page: 1,
        per_page: siteConfig.defaultItemPerPage,
        sort: 'desc',
        sort_by_column: 'id',
        s: '',
        room_type_id: 0,
        status: '',
        searchText: ''
    },
    keyword: {
        s: ''
    },
    listRoomType: [],
    listRoomFacility: [],
    formData: {
        id: '',
        code: '',
        name: {
            vi: '',
            en: '',
            jp: {
                kanji: '',
                romaji: ''
            },
            kr: '',
        },
        description: {
            vi: '',
            en: '',
            jp: {
                kanji: '',
                romaji: ''
            },
            kr: '',
        },
        price: '',
        images: {
            source: '',
            thumbnail: '',
        },
        images_origin: {
            source: '',
            thumbnail: '',
        },
        room_type_id: 0,
        facilities: [],
        galleries: [],
        price_text: {
            vi: '',
            en: '',
            jp: {
                kanji: '',
                romaji: ''
            },
            kr: '',
        },
        status: 0
    }
};

export default function roomReducer(state = initState, action) {

    switch (action.type) {
        case roomActions.ROOM_UPDATE_FILTER: {
            return {
                ...state,
                filter: action.filter,
            };
        }
        case roomActions.ROOM_SEARCH_LIST: {
            return {
                ...state,
                keyword: action.keyword,
            };
        }
        case roomActions.ROOM_GET_LIST_SUCCESS: {
            return {
                ...state,
                listData: action.state.data,
                listDataBE: {...action.state.data},
            };
        }
        case roomActions.ROOM_GET_LIST_FAILED: {
            return {
                ...state,
                listData: [],
                listDataBE: []
            };
        }
        case roomActions.ROOM_GET_LIST_ROOM_TYPE_SUCCESS: {
            return {
                ...state,
                listRoomType: action.state.data.items,
            };
        }
        case roomActions.ROOM_UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                imageData: action.state.data
            };
        }
        case roomActions.ROOM_GET_LIST_GROUP_SUCCESS: {
            return {
                ...state,
                listGroup: action.state.data.items,
            };
        }
        case roomActions.ROOM_GET_DETAIL_SUCCESS: {
            return {
                ...state,
                formData: action.state.data
            };
        }
        case roomActions.ROOM_GET_LIST_ROOM_FACILITY_SUCCESS: {
            return {
                ...state,
                listRoomFacility: action.state.data.items,
            };
        }
        case roomActions.ROOM_RESET_FORM_DATA: {
            return {
                ...state,
                formData: initState.formData
            };
        }
        case roomActions.ROOM_SEARCH_FE: {

            let items = [...state.listDataBE.items];

            if (action.filter.searchText !== '') {
                items = items.filter((row) => {
                    let fieldMatch = Object.keys(row).filter((field) => {
                        if (field === 'name' || field === 'description') {
                            const data = JSON.stringify(row[field]);
                            return data !== null && data.toLowerCase().indexOf(action.filter.searchText.toLowerCase()) !== -1;
                        } else if (field === 'price' || field === 'price_text') {
                            return row[field].toString().toLowerCase().indexOf(action.filter.searchText.toLowerCase()) !== -1;
                        } else {
                            return false;
                        }
                    });
                    return fieldMatch.length !== 0;
                });
            }

            console.log(items);

            state.listData.items = items;

            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
