import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'membergroups/list',
    SHOW: 'membergroups/show',
    ADD: 'membergroups/add',
    EDIT: 'membergroups/edit',
    DELETE: 'membergroups/delete'
};
const MemberGroupService = {

    list(payload) {
        return new SuperFetch().get(Urls.LIST, payload);
    },

    show(payload) {
        return new SuperFetch().get(Urls.SHOW, payload);
    },

    add(payload) {
        return new SuperFetch().get(Urls.ADD, payload);
    },

    edit(payload) {
        return new SuperFetch().get(Urls.EDIT, payload);
    },

    delete(payload) {
        return new SuperFetch().get(Urls.DELETE, payload);
    },
};

export default MemberGroupService;
export {
    Urls
}
