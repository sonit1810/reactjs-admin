import SuperFetch from './SuperFetch';

const Urls = {
    LIST : 'room-types',
    ADD : 'room-types',
    EDIT: 'room-types/',
    DELETE: 'room-types/',
    SHOW: 'room-types/',
    UPDATE_SORT_LIST: 'room-types/update-sort-list',
};

const RoomTypeService = {

    list(payload) {
        return new SuperFetch().get(Urls.LIST, payload);
    },

    add(payload) {
        return new SuperFetch().post(Urls.ADD, payload);
    },
    edit(payload) {
        return new SuperFetch().put(Urls.EDIT , payload);
    },

    delete(payload) {
        return new SuperFetch().delete(Urls.DELETE, payload);
    },

    show(payload) {
        return new SuperFetch().getById(Urls.SHOW , payload);
    },
    updateSortList(payload) {
        return new SuperFetch().post(Urls.UPDATE_SORT_LIST , payload);
    },
};

export default RoomTypeService;
export {
    Urls
}
