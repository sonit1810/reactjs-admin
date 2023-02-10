import { Map } from 'immutable';
import siteConfig from "../configs/siteConfig";
import systemConfig from "../configs/systemConfig";

export function clearToken() {
    localStorage.removeItem('data' + systemConfig.appId);
}

export function getToken() {
    try {
        const data = localStorage.getItem('data' + systemConfig.appId);
        return new Map({ data });
    } catch (err) {
        clearToken();
        return new Map();
    }
}

export function setToken(data) {
    localStorage.setItem('data' + systemConfig.appId, data);
}

export function getCurrentLanguageLocale() {
    // alert(navigator.language.split(/[-_]/)[0]);
    return navigator.language.split(/[-_]/)[0];  // language without region code
}

export function setCurrentLanguage(languageId) {
    return localStorage.setItem('id_language', languageId);
}

export function getCurrentLanguage(lang) {
    //default 1
    let selectedLanguage = siteConfig.language.options[0];
    siteConfig.language.options.forEach(language => {
        if (language.languageId === lang) {
            selectedLanguage = language;
            setCurrentLanguage(lang);
        }
    });
    return selectedLanguage;
}

export function getAuthorizeData() {
    const data = getToken().get('data');
    if (data) {
        const jsonData = JSON.parse(data);
        if (jsonData.tokenInfo === undefined) {
          return "NO TOKEN INFO";
        };
        return jsonData.tokenInfo.token_type + " " + jsonData.tokenInfo.access_token;
    } else {
        return 'no_data';
    }
}

export function getTokenInfo() {
    const data = getToken().get('data');
    if (data) {
        const cachedData = JSON.parse(data);
        return cachedData.tokenInfo;
    } else {
        return false;
    }
}

export function toVND(x) {
    return x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export function isSuper(roles) {
    if (roles === undefined) return false;
    return roles.indexOf('ROLE_SUPER_ADMIN') !== -1;
}

export function isAdmin(roles) {
    if (roles === undefined) return false;
    return roles.indexOf('ROLE_ADMIN') !== -1;
}
