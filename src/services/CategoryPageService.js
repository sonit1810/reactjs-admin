import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'categories',
    SHOW: 'category-pages/category/{id}',
    ADD: 'category-pages',
    EDIT: 'category-pages/',
    DELETE: 'category-pages/',
    CATE_PAGE_PRODUCT: 'category-pages/{id}'
};
const CategoryService  = {

    list(payload) {
        return new SuperFetch().get(Urls.LIST, payload);
    },
    listCatePageProduct(payload) {
        let url = Urls.CATE_PAGE_PRODUCT.replace('{id}', payload.id)
        return new SuperFetch().get(url);
    },
    show(payload) {
        let url = Urls.SHOW.replace('{id}', payload.id)
        return new SuperFetch().get(url);
    },

    add(payload) {
        return new SuperFetch().post(Urls.ADD, payload);
    },

    edit(payload) {
        return new SuperFetch().put(Urls.EDIT, payload);
    },

    delete(payload) {
        return new SuperFetch().delete(Urls.DELETE, payload.id);
    },
};

export default CategoryService;
export {
    Urls
}
