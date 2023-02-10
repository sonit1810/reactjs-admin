import { getCurrentLanguage } from '../../helpers/Ultis';
const actions = {
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    changeLanguage: language => {
        return (dispatch, getState) => {
            dispatch({
                type: actions.CHANGE_LANGUAGE,
                language: getCurrentLanguage(language)
            });
        };
    }
};
export default actions;
