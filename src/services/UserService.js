import SuperFetch from './SuperFetch';

const Urls = {
    LOGIN : 'auth/login',
    LOGOUT : 'auth/logout',
    REFRESH_TOKEN : 'auth/fresh',
    GET_LOGGED_USER_INFO: 'auth/user',
    LIST : 'users',
    ADD : 'users',
    EDIT: 'users/',
    DELETE: 'users/',
    SHOW: 'users/',

};
const UserService = {

    login(payload) {
        return new SuperFetch().post(Urls.LOGIN, payload);
    },
    getLoggedUserInfo() {
        return new SuperFetch().get(Urls.GET_LOGGED_USER_INFO);
    },
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

export default UserService;
export {
    Urls
}
