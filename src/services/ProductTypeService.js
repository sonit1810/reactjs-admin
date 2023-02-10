import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'product-types',
    SHOW: 'product-types/{id}',
    ADD: 'product-types',
    EDIT: 'product-types/{id}',
    DELETE: 'product-types/{id}'
};
const ProductTypeService = {

    list(payload) {
        return new SuperFetch().get(Urls.LIST, payload);
    },

    show(payload) {
        return new SuperFetch().get(Urls.SHOW, payload);
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

export default ProductTypeService;
export {
    Urls
}
