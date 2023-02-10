import SuperFetch from './SuperFetch';

const Urls = {
    LIST : 'roles',
    ADD : 'roles',
    EDIT: 'roles/',
    DELETE: 'roles/',
    SHOW: 'roles/',
};

const RoleService = {

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

export default RoleService;
export {
    Urls
}
