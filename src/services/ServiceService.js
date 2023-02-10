import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'services',
    SHOW: 'services/',
    ADD: 'services',
    EDIT: 'services/',
    DELETE: 'services/'
};
const ServiceService = {

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
};

export default ServiceService;
export {
    Urls
}
