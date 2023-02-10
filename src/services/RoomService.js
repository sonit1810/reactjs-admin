import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'rooms',
    SHOW: 'rooms/',
    ADD: 'rooms',
    EDIT: 'rooms/',
    DELETE: 'rooms/',
    LIST_FACILITY: 'room-facilities'
};
const RoomService = {

    list(payload) {
        return new SuperFetch().get(Urls.LIST, payload);
    },
    show(payload) {
        return new SuperFetch().getById(Urls.SHOW, payload);
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

    listVariant(payload) {
        return new SuperFetch().get(Urls.LIST_FACILITY, payload);
    }
};

export default RoomService;
export {
    Urls
}
