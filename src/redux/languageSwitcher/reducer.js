import { getCurrentLanguage } from '../../helpers/Ultis';
import siteConfig from "../../configs/siteConfig";
import en from '../../languageProvider/locales/en_US';
import jp from '../../languageProvider/locales/ja-JP';
import vi from '../../languageProvider/locales/vi_VN';
import actions from './actions';

const language = getCurrentLanguage(siteConfig.language.default || 'vietnam');
let languageMessage = vi;
if (language.languageId === 'english') {
    languageMessage = en;
} else if (language.languageId === 'japan') {
    languageMessage = jp;
}

const initState = {
    language: language,
    languageMessages: languageMessage,
};

export default function(state = initState, action) {
    switch (action.type) {
        case actions.CHANGE_LANGUAGE:
            let languageMessage = vi;
            if (action.language.languageId === 'vietnam') {
                languageMessage = vi;
            } else if (language.languageId === 'english') {
                languageMessage = en;
            } else if (language.languageId === 'japan') {
                languageMessage = jp;
            }
            return {
                ...state,
                language: action.language,
                languageMessages: languageMessage
            };
        default:
            return state;
    }
}
