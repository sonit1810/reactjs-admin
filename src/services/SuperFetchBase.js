import axios from 'axios';
import siteConfig from '../configs/siteConfig';
import notification from "../helpers/Notification";
import MockDataProvider from "../mock_data/Provider";
import {clearToken, getAuthorizeData, getTokenInfo} from '../helpers/Ultis';
import { store } from '../redux/store';
import layoutAction from '../redux/layout/action';
import {push} from "connected-react-router";
import * as PageUrls from "../configs/PagesUrl";
import { Urls } from "./UserService";

class SuperFetchBase {

    constructor(authorizeInfo) {
        let service = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizeInfo,
            },
            baseURL: siteConfig.apiRoot,
            timeout: siteConfig.apiTimeout,
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        service.interceptors.request.use(this.checkTokenExpired, this.handleError);
        this.service = service;
    }

    handleSuccess(response) {
        store.dispatch(layoutAction.isCallingApi(false));
        return response;
    }

    handleError = (error) => {
        store.dispatch(layoutAction.isCallingApi(false));
        if (error.response !== undefined) {
            switch (error.response.status) {
                case 401:
                    notification.error(error.response.status + ': ' + error.response.statusText);
                    clearToken();
                    window.location = PageUrls.PAGE_ROOT;
                    break;
                case 404:
                    notification.error(error.response.status + ': ' + error.response.statusText);
                    break;
                case 500:
                    notification.error(error.message);
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

    async checkTokenExpired(request) {
        if (request.url === Urls.LOGIN) {
            return request;
        }

        //get cached token info
        const tokenInfo = getTokenInfo();
        if (tokenInfo === false) {
            clearToken();
            window.location = PageUrls.PAGE_ROOT;
            return request;
        }

        // check if expired
        if (tokenInfo) {
            const expiredAt = tokenInfo.expires_at;
            if ((parseInt(expiredAt) * 1000 - Date.now()) <= 60 * 5 * 1000) {
                let service = axios.create({
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': tokenInfo.token_type + ' ' + tokenInfo.access_token
                    },
                    baseURL: siteConfig.apiRoot,
                    timeout: siteConfig.apiTimeout,
                });
                let res = await service.request({
                    method: 'GET',
                    url: Urls.REFRESH_TOKEN + `?grant_type=refresh_token&refresh_token=REFESH_TOKEN`,
                    responseType: 'json'
                });

                if (res.data.status && res.data.data.access_token !== undefined
                    && res.data.data.access_token !== '' && Object.keys(res.data.data.access_token).length > 0) {
                    const state = {
                        isLoggedIn: true,
                        tokenInfo: res.data.data,
                        message: res.data.message,
                    };

                    //set local
                    localStorage.setItem('data', JSON.stringify(state));

                    //override header of this request
                    request.headers.Authorization = state.tokenInfo.token_type + ' ' + state.tokenInfo.access_token;
                    return request;

                } else {
                    clearToken();
                    window.location = PageUrls.PAGE_ROOT;
                }
            } else {
                return request;
            }
        } else {
            return request;
        }
    }

    get(path, payload) {
        store.dispatch(layoutAction.isCallingApi(true));
        console.log('will call api ');
        if (payload !== undefined) {
            console.log(siteConfig.apiRoot + path + '?' + Object.keys(payload).map(key => key + '=' + payload[key]).join('&'));
        } else {
            console.log(siteConfig.apiRoot + path);
        }

        if (siteConfig.fakeData) {
            console.log('use mock data');
            return new Promise(resolve => {
                resolve(MockDataProvider.getData(path, payload));
            });
        }

        if (payload !== undefined) {
            path += '?' + Object.keys(payload).map(key => key + '=' + payload[key]).join('&');
        }

        return this.service.get(path).then((response) => {
            return new Promise(resolve => {
                resolve(response.data);
            });
        });
    }

    post(path, payload) {
        store.dispatch(layoutAction.isCallingApi(true));

        console.log('will call api ');
        console.log(siteConfig.apiRoot + path);

        if (siteConfig.fakeData) {
            console.log('use mock data');
            return new Promise(resolve => {
                resolve(MockDataProvider.getData(path, payload));
            });
        }

        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => {
            return new Promise(resolve => {
                resolve(response.data);
            });
        });
    }

    put(path, payload) {
        store.dispatch(layoutAction.isCallingApi(true));

        console.log(siteConfig.apiRoot + path + payload.id);

        return this.service.request({
            method: 'PUT',
            url: path + payload.id,
            responseType: 'json',
            data: payload
        }).then((response) => {
            return new Promise(resolve => {
                resolve(response.data);
            });
        });
    }

    getById(path, id) {
        store.dispatch(layoutAction.isCallingApi(true));

        if (siteConfig.fakeData) {
            console.log('use mock data');
            return new Promise(resolve => {
                resolve(MockDataProvider.getData(path, id));
            });
        }

        path += id;
        console.log('will call api');
        console.log(siteConfig.apiRoot + path);

        return this.service.get(path).then((response) => {
            return new Promise(resolve => {
                resolve(response.data);
            });
        });
    }

    delete(path, payload) {
        store.dispatch(layoutAction.isCallingApi(true));

        console.log(siteConfig.apiRoot + path + payload);

        return this.service.request({
            method: 'DELETE',
            url: path + payload,
            responseType: 'json',
            data: payload
        }).then((response) => {
            return new Promise(resolve => {
                resolve(response.data);
            });
        });
    }

    export(path, payload) {
        store.dispatch(layoutAction.isCallingApi(true));

        console.log('will call api ');
        console.log(siteConfig.apiRoot + path);
        console.log(payload);
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => {
            return new Promise(resolve => {
                resolve(response.data);
            });
        });
    }

    upload(path, payload) {
        notification.info('Uploading ...');
        store.dispatch(layoutAction.isCallingApi(true));

        console.log('will call api ');
        console.log(siteConfig.apiRoot + path);

        let formData = new FormData();
        formData.append('image', payload.image);

        if (payload.nothumb !== undefined) {
            path += '?nothumb=1';
        }

        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: formData
        }).then((response) => {
            return new Promise(resolve => {
                notification.info('Upload success!');
                resolve(response.data);
            });
        });
    }
}

export default SuperFetchBase;
