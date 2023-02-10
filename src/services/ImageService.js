import SuperFetch from './SuperFetch';

const Urls = {
    LIST: 'images',
    SHOW: 'images/',
    ADD: 'images',
    EDIT: 'images/',
    DELETE: 'images/',
    UPLOAD: 'images',
    UPLOAD_FILE: 'upload',
    DELETE_FILE: 'upload/',
};
const ImageService = {

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
        if (payload === '') return true;
        return new SuperFetch().delete(Urls.DELETE_FILE, payload);
    },

    upload(payload) {
        return new SuperFetch().upload(Urls.UPLOAD_FILE, payload);
    },

    uploadImage(payload) {
        return new SuperFetch().upload(Urls.UPLOAD, payload);
    }
};

export default ImageService;
export {
    Urls
}
