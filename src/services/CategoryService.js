import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'categories',
    SHOW: 'categories/',
    ADD: 'categories',
    EDIT: 'categories/',
    DELETE: 'categories/'
};
const CategoryPageService  = {

    list(payload) {
        return new SuperFetch().get(Urls.LIST, payload);
    },

    show(id) {
        return new SuperFetch().getById(Urls.SHOW, id);
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
};

export default CategoryPageService;
export {
    Urls
}
