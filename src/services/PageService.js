import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'pages',
    SHOW: 'pages/',
    ADD: 'pages',
    EDIT: 'pages/',
    DELETE: 'pages/',
    UPLOAD: 'images'
};
const PageService = {

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
        return new SuperFetch().put(Urls.EDIT, payload);
    },

    delete(payload) {
        return new SuperFetch().delete(Urls.DELETE, payload);
    },

    upload(payload) {
        return new SuperFetch().upload(Urls.UPLOAD, payload);
    }
};

export default PageService;
export {
    Urls
}
