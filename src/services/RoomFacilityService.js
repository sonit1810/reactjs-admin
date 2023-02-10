import SuperFetch from './SuperFetch';

const Urls = {
    LIST : 'room-facilities',
    ADD : 'room-facilities',
    EDIT: 'room-facilities/',
    DELETE: 'room-facilities/',
    SHOW: 'room-facilities/',
};

const RoomFacilityService = {

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
    }
};

export default RoomFacilityService;
export {
    Urls
}
