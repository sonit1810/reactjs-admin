import axios from 'axios';
import siteConfig from '../configs/siteConfig';
import notification from "../helpers/Notification";
import MockDataProvider from "../mock_data/Provider";

class SuperFetch {

    constructor() {
        let service = axios.create({
            headers: {
                'Authorization': 'Bearer jwttoken',
                'Content-Type': 'application/json',
            },
            baseURL: siteConfig.apiRoot,
            timeout: siteConfig.apiTimeout,
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    handleSuccess(response) {
        return response;
    }

    handleError = (error) => {
        if (error.response !== undefined) {
            switch (error.response.status) {
                case 401:
                    notification.error(error.response.status + ': ' + error.response.statusText);
                    break;
                case 404:
                    notification.error(error.response.status + ': ' + error.response.statusText);
                    break;
                default:
                    notification.error(error.response.status + ': ' + error.response.statusText);
                    break;
            }
        } else {
            notification.error(error.message);
        }
        return Promise.reject(error);
    };

    redirectTo = (document, path) => {
        // document.location = path;
    };

    get(path, callback) {
        if (siteConfig.fakeData) {
            MockDataProvider.getData(path, callback);
            return;
        }

        return this.service.get(path).then(
            (response) => callback(response.data)
        );
    }

    patch(path, payload, callback) {
        if (siteConfig.fakeData) {
            MockDataProvider.getData(path, callback);
            return;
        }

        return this.service.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => callback(response.data));
    }

    post(path, payload, callback) {
        if (siteConfig.fakeData) {
            MockDataProvider.getData(path, callback);
            return;
        }

        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => callback(response.data));
    }
}

export default new SuperFetch();