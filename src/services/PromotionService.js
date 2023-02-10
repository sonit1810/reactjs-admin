import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'promotions',
    SHOW: 'promotions/',
    ADD: 'promotions',
    EDIT: 'promotions/',
    DELETE: 'promotions/'
};
const PromotionService = {

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
    }

};

export default PromotionService;
export {
    Urls
}
